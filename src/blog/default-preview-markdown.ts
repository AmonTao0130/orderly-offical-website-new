export const DEFAULT_BLOG_DRAFT_MARKDOWN = `---
slug: "how-to-preview-a-blog-draft"
title: "How to Preview a Blog Draft"
description: "A local Markdown guide for writing, previewing, and downloading blog drafts."
date: 2026-05-04
category: "Announcements"
publicationState: "preview"
author: "Orderly Network"
cover: "./thumbnail.jpg"
pin: false
---

The blog editor lets you write a complete Markdown article and see the production-style preview update as you type. Use this starter draft as a checklist when preparing a new post.

## 1. Start with frontmatter

Every draft begins with a frontmatter block between the two \`---\` lines. These fields control how the article appears in the blog list and detail page:

- \`slug\` becomes the article URL segment and should be short, lowercase, and unique.
- \`title\` is the main headline shown in the preview.
- \`description\` appears in cards, previews, and share metadata.
- \`date\` should use the \`YYYY-MM-DD\` format.
- \`category\` groups the post under the right blog tab.
- \`author\` appears near the article metadata.
- \`cover\` points to the cover image. This example uses \`./thumbnail.jpg\`, which points to an image file next to the Markdown file.

## 2. Write the article body

After the frontmatter, write normal Markdown. The preview supports headings, paragraphs, lists, links, quotes, inline code, code blocks, and images.

Use short sections to keep the article scannable:

1. Introduce the problem or announcement.
2. Explain the important context.
3. Show concrete steps, examples, or screenshots.
4. End with a clear next action for readers.

## 3. Add images

When previewing a local folder, relative image paths can point to files next to your Markdown file:

\`\`\`md
![Orderly blog preview cover](./thumbnail.jpg)
\`\`\`

Choose the folder in the editor toolbar so the preview can resolve those local image files.

## 4. Preview while editing

The article preview refreshes automatically whenever you change the Markdown. If a frontmatter field is missing or an asset cannot be found, the toolbar shows an error or warning so you can fix the draft before publishing.

> Tip: keep the preview open while polishing titles, descriptions, and images. Small metadata changes often have a big impact on how the post feels.

## 5. Use code examples

Code blocks are useful for tutorials, release notes, and integration guides:

\`\`\`ts
const draftStatus = "preview";
const coverImage = "./thumbnail.jpg";

console.log(\`Rendering \${draftStatus} draft with \${coverImage}\`);
\`\`\`

## 6. Download the draft

When the article is ready, click **Download ZIP**. The editor uses the \`slug\` field for the package name, so this example downloads as \`how-to-preview-a-blog-draft.zip\`.

You can keep editing the downloaded Markdown file locally, upload a folder with related assets, and return to the editor whenever you need another production-style preview.
`;
