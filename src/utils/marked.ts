import { Renderer } from "marked";

export function cleanUrl(href: string) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
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
  href = cleanHref;
  let out = '<a target="_blank" href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += ">" + text + "</a>";
  console.log("link", out);
  return out;
}

export function getRenderer() {
  const renderer = new Renderer();
  renderer.link = link;
  return renderer;
}
