import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

turndown.remove(["script", "style", "noscript"]);

const cache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_MAX_SIZE = 500;

function acceptsMarkdown(req) {
  const accept = req.headers.accept || "";
  return accept.split(",").some((part) => {
    const type = part.split(";")[0].trim().toLowerCase();
    return type === "text/markdown";
  });
}

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

function cleanMarkdown(md) {
  let out = md;

  out = out.replace(/\[([^\]]*\n[^\]]*)\]\([^)]*\)/g, (match, inner) => {
    const text = inner.replace(/\s+/g, " ").trim();
    if (!text) return "";
    return "[" + text + match.slice(match.indexOf("]("));
  });

  out = out.replace(/\[\s*\]\([^)]*\)/g, "");

  out = out.replace(/\n{3,}/g, "\n\n");

  out = dedupLineBlocks(out);

  out = out.trim() + "\n";

  return out;
}

function dedupLineBlocks(text) {
  const lines = text.split("\n");
  const seen = new Set();
  const result = [];
  let currentBlock = [];
  let inBlock = false;

  for (const line of lines) {
    if (line.trim() === "") {
      if (inBlock && currentBlock.length > 0) {
        const blockKey = currentBlock.join("\n");
        if (!seen.has(blockKey)) {
          seen.add(blockKey);
          result.push(...currentBlock);
        }
        currentBlock = [];
      }
      inBlock = false;
      result.push(line);
      continue;
    }

    inBlock = true;
    currentBlock.push(line);
  }

  if (currentBlock.length > 0) {
    const blockKey = currentBlock.join("\n");
    if (!seen.has(blockKey)) {
      seen.add(blockKey);
      result.push(...currentBlock);
    }
  }

  return result.join("\n");
}

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry;
}

function setCache(key, markdown, tokens) {
  if (cache.size >= CACHE_MAX_SIZE) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { markdown, tokens, ts: Date.now() });
}

export default function markdownMiddleware() {
  return (req, res, next) => {
    if (!acceptsMarkdown(req)) return next();

    const cacheKey = req.originalUrl || req.url;
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("x-markdown-tokens", String(cached.tokens));
      res.setHeader("X-Markdown-Cache", "HIT");
      res.send(cached.markdown);
      return;
    }

    const originalEnd = res.end.bind(res);
    const chunks = [];

    res.write = function (chunk) {
      if (chunk) {
        chunks.push(
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        );
      }
      return true;
    };

    res.end = function (chunk) {
      if (chunk) {
        chunks.push(
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        );
      }

      const html = Buffer.concat(chunks).toString("utf-8");
      const raw = turndown.turndown(html);
      const markdown = cleanMarkdown(raw);
      const tokens = estimateTokens(markdown);

      setCache(cacheKey, markdown, tokens);

      res.removeHeader("Content-Type");
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Encoding");
      res.removeHeader("ETag");
      res.removeHeader("Last-Modified");

      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("x-markdown-tokens", String(tokens));
      res.setHeader("X-Markdown-Cache", "MISS");

      originalEnd.call(res, markdown);
    };

    next();
  };
}
