import { Renderer, marked } from "marked";

export function cleanUrl(href: string) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return href;
}

export function link(
  href: string,
  title: string | null | undefined,
  text: string
): string {
  const cleanHref = cleanUrl(href);
  if (cleanHref === null) {
    return text;
  }

  let out = `<a target="_blank" rel="noopener noreferrer" href="${cleanHref}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  out += `>${text}</a>`;
  return out;
}

export function getRenderer() {
  const renderer = new Renderer();
  renderer.link = function (...args: any[]) {
    const token = args[0];
    if (token && typeof token === "object" && "href" in token) {
      const text = this.parser.parseInline(token.tokens || []);
      return link(token.href, token.title, text);
    }

    return link(args[0], args[1], args[2]);
  };
  return renderer;
}

export function markdownToHtml(markdown: string) {
  return marked.parse(markdown, {
    async: false,
    renderer: getRenderer(),
  }) as string;
}
