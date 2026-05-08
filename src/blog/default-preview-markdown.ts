export const DEFAULT_BLOG_DRAFT_MARKDOWN = `---
slug: "blog-editor-guide"
title: "Blog Editor Guide"
description: "Write, preview, validate, and package a local blog draft."
date: 2026-05-04
category: "Announcements"
author: "Orderly Network"
cover: "./thumbnail.jpg"
publicationState: "live"
pin: false
---

The blog editor lets you write a Markdown post, update frontmatter from a metadata form, preview the production-style article, manage local assets, and download a ready-to-share ZIP package. Use this starter draft as a checklist when preparing a new post.

## 1. Start with frontmatter

Every draft begins with a frontmatter block between the two \`---\` lines. The editor reads these fields to build the blog list card, detail page, preview metadata, and download package:

- \`slug\` becomes the article URL segment. It must use lowercase letters, numbers, and hyphens only, and it should be unique across historical blog posts.
- \`title\` is the main headline shown in the preview.
- \`description\` appears in cards, previews, and share metadata. Keep it concise; the metadata panel tracks the current length against the configured limit.
- \`date\` should use the \`YYYY-MM-DD\` format.
- \`category\` groups the post under the right blog tab. Choose one of the configured category slugs, such as \`Announcements\`, \`Product\`, \`Educational\`, \`Research\`, \`Thought-Leadership\`, \`Ecosytem-Spotlight\`, or \`Updates\`.
- \`author\` appears near the article metadata.
- \`cover\` points to the cover image and is required before downloading. This example uses \`./thumbnail.jpg\`, which points to an image file next to the Markdown file.
- \`publicationState\` can be \`live\` or \`preview\`.
- \`pin\` should be \`true\` or \`false\`.

The Metadata panel updates these fields directly. When you change the title, the editor can generate a matching slug automatically. If you edit the slug by hand, that manual slug is preserved until you regenerate it.

## 2. Write the article body

After the frontmatter, write normal Markdown. The preview supports headings, paragraphs, lists, links, quotes, inline code, code blocks, Markdown images, and HTML image tags. Links open in a new tab in the preview.

Use short sections to keep the article scannable:

1. Introduce the problem or announcement.
2. Explain the important context.
3. Show concrete steps, examples, or screenshots.
4. End with a clear next action for readers.

The preview refreshes shortly after each edit, and your draft is saved locally in the browser so you can return to it later.

## 3. Work with local folders

Click **Choose folder** to load a local blog folder. The editor finds \`.md\` files in that folder, reads the selected Markdown file, and uses that file's directory as the base path for relative assets. If the folder contains more than one Markdown file, choose the one you want from the file selector in the toolbar.

Relative paths are resolved from the selected Markdown file's folder:

\`\`\`md
![Orderly blog preview cover](./thumbnail.jpg)
\`\`\`

External URLs, root paths, and anchors are left as-is.

## 4. Manage assets

Use the Assets panel to upload supporting files without reloading the whole folder. Image assets show thumbnails, every asset shows whether it is used, and **Copy path** gives you the Markdown-ready relative path to paste into the body.

Use **Upload cover** in the Metadata panel when you only need a cover image. After uploading an image, click its thumbnail to set the \`cover\` field.

If a referenced local asset cannot be found, the toolbar shows a warning. Missing local assets also block ZIP download so the package does not silently ship without required files.

## 5. Preview and layout

Use **Split** when you want the editor and preview side by side. Use **Stack** when you want a single-column workflow. On narrow screens, the editor automatically uses the stacked layout.

The preview keeps the last valid article visible when the current draft has a parse error, while the toolbar shows the error that needs attention. This makes it easier to fix frontmatter without losing visual context.

> Tip: keep the preview open while polishing titles, descriptions, and images. Small metadata changes often have a big impact on how the post feels.

## 6. Download the draft

When the article is ready, click **Download ZIP**. Before creating the package, the editor checks that:

- Required frontmatter is present: \`slug\`, \`title\`, \`description\`, \`date\`, and \`category\`.
- \`date\` is valid.
- \`slug\` is URL-safe and is not a duplicate of an existing historical post unless you are editing that preserved historical slug.
- \`cover\` is present.
- Referenced local assets are available.

The editor uses the Markdown filename for the package name. If \`slug\` is available, this example downloads as \`blog-editor-guide.zip\` and contains \`blog-editor-guide.md\` plus the referenced assets. Asset paths are normalized before packaging so \`/thumbnail.jpg\` becomes \`./thumbnail.jpg\` in the downloaded Markdown.

You can keep editing the downloaded Markdown file locally, upload a folder with related assets, and return to the editor whenever you need another production-style preview.
`;
