import fs from "node:fs";
import path from "node:path";
import type {
  Article,
  Categorg,
  Pagination,
  PublicationState,
  ResponstList,
  TFile,
} from "./legacy-strapi-types";
import { PublicationStateEnum } from "./legacy-strapi-types";

const CONTENT_ROOT = path.resolve(process.cwd(), "src", "content", "blog");
const EXPORT_ROOT = path.join(CONTENT_ROOT, "legacy-strapi-export");
const MARKDOWN_POSTS_ROOT = path.join(CONTENT_ROOT, "posts");
const BLOG_CONFIG_FILE = path.join(CONTENT_ROOT, "config", "blog.config.json");
const PUBLIC_ROOT = path.resolve(process.cwd(), "public");
const ENTITIES_FILE = path.join(EXPORT_ROOT, "entities_00001.jsonl");
const LINKS_FILE = path.join(EXPORT_ROOT, "links_00001.jsonl");
const STRAPI_MEDIA_URL_RE =
  /https:\/\/[^)\s"']*media\.strapiapp\.com\/([^)\s"']+)/g;
const LEGACY_UPLOADS_URL_RE =
  /(^|[\s"'(=])\/uploads\/(?!blog(?:\/|$))([^)\s"']+)/g;
const LEGACY_UPLOADS_MEDIA_BASE_URL = "https://oss.orderly.network/static/blog";
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const PUBLICATION_STATES: PublicationState[] = ["live", "preview"];

type BlogConfig = {
  defaultAuthor: string;
  defaultPublicationState: PublicationState;
  mediaBasePath: string;
  descriptionMaxLength: number;
  categories: Array<{
    slug: string;
    name: string;
    order: number;
    description?: string;
  }>;
  authors: Array<{
    name: string;
    email?: string;
  }>;
};

type MarkdownFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  publicationState?: PublicationState;
  author?: string;
  cover: string;
  pin?: boolean;
};

type ExportEntity<T = any> = {
  type: string;
  id: number;
  data: T;
};

type ExportLink = {
  kind: string;
  relation: string;
  left?: {
    type?: string;
    field?: string;
    ref?: number | string;
  };
  right?: {
    type?: string;
    field?: string;
    ref?: number | string;
    pos?: number;
  };
};

type LocalData = {
  articles: Article[];
  categories: Categorg[];
  files: TFile[];
};

let localData: LocalData | null = null;

function readJson<T>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog config file not found: ${filePath}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function readJsonl<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Strapi export file not found: ${filePath}`);
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}

function loadBlogConfig() {
  return readJson<BlogConfig>(BLOG_CONFIG_FILE);
}

function stripQuotes(value: string) {
  return value.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatterValue(value: string): any {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (trimmed === "null") {
    return null;
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(trimmed);
}

function parseFrontmatter(markdown: string, filePath: string) {
  const match = markdown.match(FRONTMATTER_RE);

  if (!match) {
    throw new Error(`Markdown blog post is missing frontmatter: ${filePath}`);
  }

  const data: Record<string, any> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf(":");
    if (index === -1) {
      throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1);
    data[key] = parseFrontmatterValue(value);
  }

  return {
    frontmatter: data as MarkdownFrontmatter,
    body: markdown.slice(match[0].length),
  };
}

function rewriteMediaUrls<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replace(STRAPI_MEDIA_URL_RE, `${LEGACY_UPLOADS_MEDIA_BASE_URL}/$1`)
      .replace(
        LEGACY_UPLOADS_URL_RE,
        `$1${LEGACY_UPLOADS_MEDIA_BASE_URL}/$2`
      ) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => rewriteMediaUrls(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rewriteMediaUrls(item)])
    ) as T;
  }

  return value;
}

function isPublished(article: Article) {
  return (
    article.attributes.publicationState === "live" ||
    (!article.attributes.publicationState && !!article.attributes.publishedAt)
  );
}

function assertRequiredFrontmatter(
  frontmatter: MarkdownFrontmatter,
  filePath: string
) {
  const required: Array<keyof MarkdownFrontmatter> = [
    "slug",
    "title",
    "description",
    "date",
    "category",
    "cover",
  ];

  for (const field of required) {
    if (!frontmatter[field]) {
      throw new Error(`Missing required frontmatter "${field}" in ${filePath}`);
    }
  }
}

function validateMarkdownPostPath(
  frontmatter: MarkdownFrontmatter,
  filePath: string
) {
  const slug = frontmatter.slug;
  const fileName = path.basename(filePath, ".md");
  const folderName = path.basename(path.dirname(filePath));

  if (fileName !== slug) {
    throw new Error(
      `Markdown blog slug mismatch in ${filePath}: frontmatter.slug "${slug}" must match file name "${fileName}"`
    );
  }

  if (folderName !== slug) {
    throw new Error(
      `Markdown blog folder mismatch in ${filePath}: frontmatter.slug "${slug}" must match folder name "${folderName}"`
    );
  }
}

function validateMarkdownFrontmatter(
  frontmatter: MarkdownFrontmatter,
  config: BlogConfig,
  filePath: string
) {
  assertRequiredFrontmatter(frontmatter, filePath);
  validateMarkdownPostPath(frontmatter, filePath);

  const publicationState =
    frontmatter.publicationState || config.defaultPublicationState;
  if (!PUBLICATION_STATES.includes(publicationState)) {
    throw new Error(
      `Invalid blog publicationState "${publicationState}" in ${filePath}. Allowed values: ${PUBLICATION_STATES.join(", ")}`
    );
  }

  if (!config.categories.some((category) => category.slug === frontmatter.category)) {
    throw new Error(
      `Invalid blog category "${frontmatter.category}" in ${filePath}. Add it to src/content/blog/config/blog.config.json first.`
    );
  }

  const author = frontmatter.author || config.defaultAuthor;
  if (!config.authors.some((item) => item.name === author)) {
    throw new Error(
      `Invalid blog author "${author}" in ${filePath}. Add it to src/content/blog/config/blog.config.json first.`
    );
  }

  if (frontmatter.description.length > config.descriptionMaxLength) {
    throw new Error(
      `Blog description in ${filePath} is ${frontmatter.description.length} characters; max is ${config.descriptionMaxLength}.`
    );
  }
}

function splitAssetSuffix(value: string) {
  const match = value.match(/^([^?#]+)([?#].*)?$/);
  return {
    assetPath: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

function isExternalOrRootPath(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

function getMimeType(ext: string) {
  const normalized = ext.toLowerCase();
  const mimeMap: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".pdf": "application/pdf",
  };

  return mimeMap[normalized] || "application/octet-stream";
}

function copyMarkdownAsset(
  postDir: string,
  slug: string,
  assetValue: string,
  config: BlogConfig
) {
  if (isExternalOrRootPath(assetValue)) {
    return assetValue;
  }

  const { assetPath, suffix } = splitAssetSuffix(assetValue);
  const normalizedRelativePath = path
    .normalize(assetPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^\.([/\\])/, "");
  const sourcePath = path.resolve(postDir, normalizedRelativePath);

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    throw new Error(`Markdown blog asset not found: ${sourcePath}`);
  }

  const outputRelativePath = path
    .join(config.mediaBasePath, slug, normalizedRelativePath)
    .split(path.sep)
    .join("/");
  const destinationPath = path.join(PUBLIC_ROOT, outputRelativePath);

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);

  return `${outputRelativePath}${suffix}`;
}

function rewriteMarkdownBodyAssetUrls(
  body: string,
  postDir: string,
  slug: string,
  config: BlogConfig
) {
  return body
    .replace(/(!?\[[^\]]*]\()([^)\s]+)(\))/g, (match, start, url, end) => {
      if (isExternalOrRootPath(url)) {
        return match;
      }

      return `${start}${copyMarkdownAsset(postDir, slug, url, config)}${end}`;
    })
    .replace(
      /\b(src|href)=["']([^"']+)["']/g,
      (match, attr, url) => {
        if (isExternalOrRootPath(url)) {
          return match;
        }

        return `${attr}="${copyMarkdownAsset(postDir, slug, url, config)}"`;
      }
    );
}

function toMarkdownMedia(
  filePath: string,
  publicUrl: string,
  alt?: string
) {
  const ext = path.extname(filePath);
  const stat = fs.statSync(filePath);

  return {
    data: {
      id: publicUrl,
      attributes: {
        name: path.basename(filePath),
        url: publicUrl,
        alternativeText: alt || "",
        caption: "",
        formats: {},
        ext,
        mime: getMimeType(ext),
        size: Math.round((stat.size / 1024) * 100) / 100,
      },
    },
  };
}

function makeCategoryData(
  categorySlug: string,
  config: BlogConfig,
  fallback?: ExportEntity
) {
  const configCategory = config.categories.find((item) => item.slug === categorySlug);
  const order = configCategory?.order || 999;
  const now = new Date().toISOString();

  return {
    id: order,
    attributes: {
      name: configCategory?.name || fallback?.data?.name || categorySlug,
      slug: categorySlug,
      description:
        configCategory?.description || fallback?.data?.description || "",
      createdAt: fallback?.data?.createdAt || now,
      updatedAt: fallback?.data?.updatedAt || now,
    },
  };
}

function makeAuthorData(authorName: string, config: BlogConfig) {
  const authorIndex = config.authors.findIndex((item) => item.name === authorName);
  const author = config.authors[authorIndex] || { name: authorName };

  return {
    id: 900000 + Math.max(authorIndex, 0),
    attributes: {
      name: author.name,
      email: author.email || "",
    },
  };
}

function getTimestamp(article: Article) {
  const { attributes } = article;
  const displayTime =
    attributes.postedTime ||
    attributes.publishedAt ||
    attributes.updatedAt ||
    attributes.createdAt;

  return displayTime ? new Date(displayTime).getTime() : 0;
}

function sortArticles(articles: Article[]) {
  return [...articles].sort((a, b) => getTimestamp(b) - getTimestamp(a));
}

function findMarkdownPostFiles() {
  if (!fs.existsSync(MARKDOWN_POSTS_ROOT)) {
    return [];
  }

  return fs
    .readdirSync(MARKDOWN_POSTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const postDir = path.join(MARKDOWN_POSTS_ROOT, entry.name);
      return fs
        .readdirSync(postDir, { withFileTypes: true })
        .filter((file) => file.isFile() && file.name.endsWith(".md"))
        .map((file) => path.join(postDir, file.name));
    });
}

function loadMarkdownArticles(config: BlogConfig) {
  const articles = findMarkdownPostFiles().map((filePath, index) => {
    const postDir = path.dirname(filePath);
    const markdown = fs.readFileSync(filePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(markdown, filePath);

    validateMarkdownFrontmatter(frontmatter, config, filePath);

    const publicationState =
      frontmatter.publicationState || config.defaultPublicationState;
    const authorName = frontmatter.author || config.defaultAuthor;
    const date = new Date(frontmatter.date);

    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid blog date "${frontmatter.date}" in ${filePath}`);
    }

    const slug = frontmatter.slug;
    const coverUrl = copyMarkdownAsset(postDir, slug, frontmatter.cover, config);
    const coverPath = path.resolve(postDir, splitAssetSuffix(frontmatter.cover).assetPath);
    const rewrittenBody = rewriteMarkdownBodyAssetUrls(body, postDir, slug, config);
    const now = new Date().toISOString();
    const dateIso = date.toISOString();

    return {
      id: 1000000 + index,
      attributes: {
        documentId: `markdown:${slug}`,
        title: frontmatter.title,
        description: frontmatter.description,
        slug,
        postedTime: dateIso,
        pin: frontmatter.pin || null,
        createdAt: dateIso,
        updatedAt: now,
        publishedAt: publicationState === "live" ? dateIso : null,
        locale: null,
        publicationState,
        blocks: [
          {
            __component: "shared.rich-text",
            id: 1000000 + index,
            body: rewrittenBody,
          },
        ],
        cover: toMarkdownMedia(coverPath, coverUrl, frontmatter.title),
        category: {
          data: makeCategoryData(frontmatter.category, config),
        },
        author: {
          data: makeAuthorData(authorName, config),
        },
      },
    } as unknown as Article;
  });

  const seenSlugs = new Set<string>();
  for (const article of articles) {
    const slug = article.attributes.slug;
    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate Markdown blog slug: ${slug}`);
    }
    seenSlugs.add(slug);
  }

  return articles;
}

function choosePublishedArticle(
  current: ExportEntity | undefined,
  next: ExportEntity
) {
  if (!current) {
    return next;
  }

  const currentTime = new Date(
    current.data.updatedAt || current.data.publishedAt || 0
  ).getTime();
  const nextTime = new Date(next.data.updatedAt || next.data.publishedAt || 0)
    .getTime();

  if (nextTime !== currentTime) {
    return nextTime > currentTime ? next : current;
  }

  return next.id > current.id ? next : current;
}

function toMediaData(file?: ExportEntity) {
  if (!file) {
    return { data: null };
  }

  return {
    data: {
      id: file.id,
      attributes: rewriteMediaUrls(file.data),
    },
  };
}

function loadLocalData(): LocalData {
  if (localData) {
    return localData;
  }

  const config = loadBlogConfig();
  const entities = readJsonl<ExportEntity>(ENTITIES_FILE);
  const links = readJsonl<ExportLink>(LINKS_FILE);

  const files = new Map<number, ExportEntity>();
  const authors = new Map<number, ExportEntity>();
  const categories = new Map<number, ExportEntity>();
  const publishedArticlesByDocument = new Map<string, ExportEntity>();

  for (const entity of entities) {
    if (entity.type === "plugin::upload.file") {
      files.set(entity.id, entity);
      continue;
    }

    if (entity.type === "api::author.author") {
      authors.set(entity.id, entity);
      continue;
    }

    if (entity.type === "api::category.category") {
      categories.set(entity.id, entity);
      continue;
    }

    if (
      entity.type === "api::article.article" &&
      entity.data?.documentId &&
      entity.data?.slug &&
      entity.data?.publishedAt
    ) {
      const documentId = entity.data.documentId;
      publishedArticlesByDocument.set(
        documentId,
        choosePublishedArticle(publishedArticlesByDocument.get(documentId), entity)
      );
    }
  }

  const articleCover = new Map<number, number>();
  const articleCategory = new Map<number, number>();
  const articleAuthor = new Map<number, number>();
  const mediaBlockFile = new Map<number, number>();

  for (const link of links) {
    if (
      link.left?.type === "api::article.article" &&
      link.left.field === "category" &&
      link.right?.type === "api::category.category"
    ) {
      articleCategory.set(Number(link.left.ref), Number(link.right.ref));
      continue;
    }

    if (
      link.left?.type === "api::article.article" &&
      link.left.field === "author" &&
      link.right?.type === "api::author.author"
    ) {
      articleAuthor.set(Number(link.left.ref), Number(link.right.ref));
      continue;
    }

    if (
      link.left?.type === "plugin::upload.file" &&
      link.right?.type === "api::article.article" &&
      link.right.field === "cover"
    ) {
      articleCover.set(Number(link.right.ref), Number(link.left.ref));
      continue;
    }

    if (
      link.left?.type === "plugin::upload.file" &&
      link.right?.type === "shared.media" &&
      link.right.field === "file"
    ) {
      mediaBlockFile.set(Number(link.right.ref), Number(link.left.ref));
    }
  }

  const legacyArticles = sortArticles(
    [...publishedArticlesByDocument.values()].map((entity) => {
      const rawAttributes = rewriteMediaUrls(entity.data);
      const categoryId = articleCategory.get(entity.id);
      const authorId = articleAuthor.get(entity.id);
      const coverId = articleCover.get(entity.id);
      const categoryEntity = categoryId ? categories.get(categoryId) : undefined;
      const categorySlug = categoryEntity?.data?.slug;

      const blocks = (rawAttributes.blocks || []).map((block: any) => {
        if (block.__component !== "shared.media") {
          return block;
        }

        const fileId = mediaBlockFile.get(block.id);
        return {
          ...block,
          file: toMediaData(fileId ? files.get(fileId) : undefined),
        };
      });

      return {
        id: entity.id,
        attributes: {
          ...rawAttributes,
          publicationState: "live",
          blocks,
          cover: toMediaData(coverId ? files.get(coverId) : undefined),
          category: {
            data: categorySlug
              ? makeCategoryData(categorySlug, config, categoryEntity)
              : null,
          },
          author: {
            data: authorId
              ? {
                  id: authorId,
                  attributes: rewriteMediaUrls(authors.get(authorId)?.data),
                }
              : null,
          },
        },
      } as Article;
    })
  );

  const articlesBySlug = new Map<string, Article>();
  for (const article of legacyArticles) {
    articlesBySlug.set(article.attributes.slug, article);
  }

  for (const article of loadMarkdownArticles(config)) {
    const slug = article.attributes.slug;
    if (articlesBySlug.has(slug)) {
      throw new Error(`Markdown blog slug conflicts with legacy export: ${slug}`);
    }

    articlesBySlug.set(slug, article);
  }

  const articles = sortArticles([...articlesBySlug.values()]);
  const categoryFallbackBySlug = new Map<string, ExportEntity>();
  for (const category of categories.values()) {
    if (category.data?.slug) {
      categoryFallbackBySlug.set(category.data.slug, category);
    }
  }

  const categorySlugs = [
    ...new Set(
      articles
        .filter(isPublished)
        .map((article) => article.attributes.category?.data?.attributes?.slug)
        .filter(Boolean)
    ),
  ] as string[];

  localData = {
    articles,
    categories: categorySlugs
      .map((slug) => makeCategoryData(slug, config, categoryFallbackBySlug.get(slug)))
      .sort((a, b) => {
        const aOrder =
          config.categories.find((category) => category.slug === a.attributes.slug)
            ?.order || 999;
        const bOrder =
          config.categories.find((category) => category.slug === b.attributes.slug)
            ?.order || 999;
        return aOrder - bOrder;
      }) as Categorg[],
    files: [...files.values()].map((file) => ({
      id: file.id,
      ...rewriteMediaUrls(file.data),
    })) as TFile[],
  };

  return localData;
}

function matchesFilters(article: Article, filters?: Record<string, any>) {
  if (!filters) {
    return true;
  }

  if (filters.pin?.$eq !== undefined && article.attributes.pin !== filters.pin.$eq) {
    return false;
  }

  return true;
}

export function getDisplayTime(article: Article) {
  const { attributes } = article || {};
  const { createdAt, publishedAt, postedTime } = attributes || {};
  const displayTime = postedTime || publishedAt || createdAt;
  return new Date(displayTime);
}

export function getArticleCoverImage(article?: Article) {
  const attributes = article?.attributes?.cover?.data?.attributes;
  return (
    attributes?.formats?.small?.url ||
    attributes?.formats?.medium?.url ||
    attributes?.formats?.thumbnail?.url ||
    attributes?.url
  );
}

function getLocalCategories() {
  return loadLocalData().categories;
}

export function getLocalUploadFiles() {
  return loadLocalData().files;
}

function canReadArticle(article: Article, publicationState?: PublicationState) {
  return publicationState === "preview" || isPublished(article);
}

export function getLocalArticleBySlug(
  slug: string,
  publicationState?: PublicationState
) {
  return loadLocalData().articles.find(
    (article) =>
      article.attributes.slug === slug && canReadArticle(article, publicationState)
  );
}

export function getLocalArticles(options?: {
  pagination?: Pagination;
  category?: string;
  filters?: Record<string, any>;
  publicationState?: PublicationState;
}): ResponstList<Article[]> {
  const page = Math.max(options?.pagination?.page || 1, 1);
  const pageSize = Math.max(options?.pagination?.pageSize || 100, 1);

  const articles = loadLocalData().articles.filter((article) => {
    const categorySlug = article.attributes.category?.data?.attributes?.slug;
    return (
      canReadArticle(article, options?.publicationState) &&
      (!options?.category || categorySlug === options.category) &&
      matchesFilters(article, options?.filters)
    );
  });

  const total = articles.length;
  const pageCount = Math.max(Math.ceil(total / pageSize), 1);
  const start = (page - 1) * pageSize;
  const data = articles.slice(start, start + pageSize);

  return {
    data,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
}

export type GetArticlesOptions = {
  isDetail?: boolean;
  pagination?: Pagination;
  publicationState?: PublicationState;
  category?: string;
  filters?: Record<string, any>;
};

export async function getCategories() {
  return getLocalCategories();
}

export async function getArticles(options?: GetArticlesOptions) {
  return getLocalArticles({
    pagination: options?.pagination,
    publicationState: options?.publicationState || PublicationStateEnum.LIVE,
    category: options?.category,
    filters: options?.filters,
  });
}

export async function getPinArticles(
  publicationState = PublicationStateEnum.LIVE
) {
  const res = await getArticles({
    pagination: {
      page: 1,
      pageSize: 20,
    },
    publicationState,
    filters: {
      pin: {
        $eq: true,
      },
    },
  });

  return res?.data || [];
}

export async function getAllPageArticles(options?: GetArticlesOptions) {
  const res = await getArticles({
    ...options,
    publicationState: options?.publicationState || PublicationStateEnum.LIVE,
  });

  return (res?.data || []).filter((article) => !!article.attributes.slug);
}

export function getAllPageArticleDetails(options?: GetArticlesOptions) {
  return getAllPageArticles({
    isDetail: true,
    ...options,
  });
}
