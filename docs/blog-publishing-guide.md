# Blog 文章发布操作指南

这份文档用于说明如何准备一篇 Blog 文章，并通过 Blog Editor 生成可交付给开发的 ZIP 内容包。适用对象包括市场、PM、设计师，以及其他参与 Blog 内容发布的人。

当前发布协作方式是：内容负责人完成文章、图片、预览检查和 ZIP 打包；开发团队负责把 ZIP 内容合入代码仓库并发布上线。

## 1. 发布流程总览

完整流程如下：

1. 准备文章标题、正文、摘要、封面图和正文图片。
2. 打开 Blog Editor：`/blog/editor`。
3. 新建草稿，或选择已有本地草稿文件夹继续编辑。
4. 在 Metadata 面板填写文章信息。
5. 在编辑区编写 Markdown 正文，并插入图片。
6. 在预览区检查文章展示效果。
7. 点击 `Download ZIP` 下载内容包。
8. 将 ZIP 文件和发布说明交付给开发团队。
9. 开发团队合入并部署后，文章出现在正式 Blog 页面。

## 2. 发布前准备

开始编辑前，请准备好这些材料：

- 文章标题。
- 文章正文，建议先整理成 Markdown 或纯文本。
- SEO/社交分享摘要，最多 80 个字符。
- 发布日期，格式为 `YYYY-MM-DD`，例如 `2026-05-05`。
- 封面图，建议使用清晰的横向图片。
- 正文中需要使用的图片或附件。
- 文章分类。
- 作者信息。

当前可选分类如下：

- `Announcements`
- `Product`
- `Educational`
- `Research`
- `Thought-Leadership`
- `Ecosytem-Spotlight`
- `Updates`

当前可选作者如下：

- `Orderly Network`
- `Guest Post`

## 3. 创建或继续编辑草稿

打开 `/blog/editor` 后，可以选择新建草稿或继续编辑已有草稿。

新建文章时：

1. 点击顶部工具栏的 `New draft`。
2. 如果页面提示确认，确认后会清空当前草稿并载入默认模板。
3. 从 Metadata 面板开始填写文章信息。

继续编辑已有文章时：

1. 点击顶部工具栏的 `Choose folder`。
2. 选择包含 Markdown 文件和相关图片的本地文件夹。
3. 如果文件夹里有多个 `.md` 文件，在顶部文件选择框里选择要编辑的文章。

编辑器会自动保存当前草稿到浏览器本地存储。即使刷新页面，通常也可以继续看到上一次编辑的内容。

## 4. 填写文章信息

文章信息在 Metadata 面板中填写，它会同步更新 Markdown 顶部的 frontmatter。发布前请确认以下字段都正确。

| 字段 | 说明 | 要求 |
| --- | --- | --- |
| `title` | 文章标题 | 必填 |
| `slug` | URL 中的文章路径 | 必填，只能使用小写字母、数字和连字符 |
| `description` | SEO/社交分享摘要 | 必填，最多 80 个字符 |
| `date` | 发布时间 | 必填，格式为 `YYYY-MM-DD` |
| `category` | 文章分类 | 必填，从现有分类中选择 |
| `author` | 作者 | 当前可选 `Orderly Network` 或 `Guest Post` |
| `cover` | 封面图路径 | 必填，必须对应一个存在的图片 |
| `publicationState` | 发布状态 | 正式发布用 `live`，内部预备稿用 `preview` |
| `pin` | 是否置顶 | 通常为 `false` |

`slug` 会决定文章 URL 和下载包名称。建议使用英文小写单词，并用连字符连接，例如：

```md
orderly-launches-new-product-update
```

修改标题后，编辑器可以自动生成 slug。如果你手动修改了 slug，编辑器会保留你的手动设置。点击 slug 输入框旁边的重新生成按钮，可以根据标题重新生成 slug。

## 5. 编写正文和插入图片

正文使用 Markdown 编写。常用格式包括：

```md
## 二级标题

这是正文段落。

- 列表项
- 列表项

[链接文字](https://orderly.network)

![图片说明](./image-name.jpg)
```

插入正文图片时，推荐使用 Assets 面板：

1. 点击 Assets 面板里的 `Upload assets`。
2. 选择正文中要使用的图片或附件。
3. 在 Assets 列表中找到对应文件。
4. 点击 `Copy path`。
5. 将复制到的路径粘贴到 Markdown 图片语法中。

示例：

```md
![Orderly campaign banner](./campaign-banner.jpg)
```

设置封面图时，推荐使用 Metadata 面板：

1. 点击 Metadata 面板中 Cover 区域的 `Upload cover`。
2. 上传封面图。
3. 点击上传后出现的图片缩略图。
4. 确认 `cover` 字段已更新为对应图片路径。

## 6. 预览与自检

编辑器右侧或下方会显示文章预览。可以使用顶部工具栏切换布局：

- `Split`：编辑区和预览区左右并排，适合桌面宽屏。
- `Stack`：编辑区和预览区上下排列，适合窄屏或单列编辑。

发布前请重点检查：

- 标题是否正确。
- 摘要是否清晰且没有超过 80 个字符。
- 分类和作者是否正确。
- 封面图是否正常显示。
- 正文图片是否正常显示。
- 所有链接是否正确。
- 段落、标题、列表和引用的排版是否自然。
- 是否有错别字、重复段落或未完成内容。
- `publicationState` 是否符合预期：正式发布使用 `live`，暂不公开使用 `preview`。
- `pin` 是否符合预期：不需要置顶时保持 `false`。

如果顶部工具栏显示错误或警告，请先修复再下载 ZIP。常见问题包括：

- 缺少必填字段。
- 日期格式不正确。
- slug 格式不合法。
- slug 与历史文章重复。
- cover 未填写。
- 引用的本地图片或附件不存在。

## 7. 下载 ZIP 并交付开发

确认预览无误后，点击顶部工具栏的 `Download ZIP`。

下载前，编辑器会检查文章是否满足发布要求。如果检查失败，页面会显示需要修复的问题。修复后再次点击 `Download ZIP`。

ZIP 文件名通常会和 slug 对应。例如 slug 是：

```md
orderly-launches-new-product-update
```

下载文件通常会是：

```txt
orderly-launches-new-product-update.zip
```

交付给开发团队时，请同时提供这些信息：

- ZIP 内容包。
- 期望发布时间。
- 是否立即发布。
- 是否需要置顶。
- 是否还有待确认内容。
- 如有特殊说明，例如图片替换、链接检查、SEO 文案确认，也请一起备注。

开发团队收到 ZIP 后，会将内容解压并放入代码仓库的 Blog 内容目录。最终结构应类似：

```txt
src/content/blog/posts/{slug}/{slug}.md
```

文件夹名、Markdown 文件名和 frontmatter 里的 `slug` 必须一致。开发团队合入并部署后，`publicationState: live` 的文章会出现在正式 Blog 列表和详情页。

## 8. 常见问题

### 为什么 Download ZIP 失败？

通常是文章还没有通过发布前校验。请查看顶部工具栏的错误提示，并按提示修复。最常见的问题是缺少封面图、slug 不合法、图片路径找不到，或者必填字段为空。

### slug 应该怎么写？

slug 只能使用小写字母、数字和连字符。不要使用空格、大写字母、中文、下划线或特殊符号。

推荐：

```md
orderly-network-product-update
```

不推荐：

```md
Orderly Network Product Update
orderly_network_product_update
orderly-network-product-update!
```

### publicationState 应该选 live 还是 preview？

如果文章准备正式发布，选择 `live`。如果文章只是交给开发或内部人员预览，暂时不希望出现在正式 Blog 列表中，选择 `preview`。

### pin 应该设为 true 吗？

只有需要在 Blog 页面置顶或重点展示的文章才设为 `true`。普通文章保持 `false`。

### 图片路径应该怎么填？

优先通过 Assets 面板上传图片并点击 `Copy path`，再把复制出的路径粘贴到正文或 cover 字段。不要手动猜测图片路径。

### 可以直接把 ZIP 发给开发吗？

可以。请确保下载 ZIP 前预览已经检查完毕，并在交付时附上发布时间、是否立即发布、是否置顶和其他备注。

## 9. 交付检查清单

交付开发前，请确认：

- [ ] 标题已经确认。
- [ ] slug 已确认，且只包含小写字母、数字和连字符。
- [ ] description 不超过 80 个字符。
- [ ] date 使用 `YYYY-MM-DD` 格式。
- [ ] category 已选择正确分类。
- [ ] author 已选择正确作者。
- [ ] cover 已设置并能正常预览。
- [ ] 正文图片都能正常预览。
- [ ] 链接已检查。
- [ ] publicationState 已设置为预期状态。
- [ ] pin 已设置为预期状态。
- [ ] 点击 `Download ZIP` 成功下载内容包。
- [ ] ZIP 已随发布时间、发布状态和备注一起交付开发。
