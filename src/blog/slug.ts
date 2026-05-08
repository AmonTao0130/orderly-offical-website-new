const DEFAULT_SLUG = "blog-draft";

export function slugifyTitle(title: string, fallback = DEFAULT_SLUG) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || fallback;
}

export function makeUniqueSlug(
  title: string,
  existingSlugs: Iterable<string>,
  options?: {
    fallback?: string;
    allowedSlug?: string;
  }
) {
  const baseSlug = slugifyTitle(title, options?.fallback);
  const allowedSlug = options?.allowedSlug;
  const usedSlugs = new Set(
    Array.from(existingSlugs)
      .map((slug) => slug.trim())
      .filter((slug) => slug && slug !== allowedSlug)
  );

  if (!usedSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let index = 2;
  let candidate = `${baseSlug}-${index}`;
  while (usedSlugs.has(candidate)) {
    index += 1;
    candidate = `${baseSlug}-${index}`;
  }

  return candidate;
}
