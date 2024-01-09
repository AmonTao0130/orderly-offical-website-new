import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 替换为实际的 dist 目录路径
const distPath = path.join(__dirname, "../dist");
console.log("distPath", distPath);

const sourceFileName = "sitemap-index.xml";
const targetFileName = "sitemap.xml";

const sourceFilePath = path.join(distPath, sourceFileName);
const targetFilePath = path.join(distPath, targetFileName);
console.log(sourceFilePath);

// 检查文件是否存在
if (fs.existsSync(sourceFilePath)) {
  // 重命名文件
  fs.renameSync(sourceFilePath, targetFilePath);
  console.log(`${sourceFileName} 已重命名为 ${targetFileName}`);
} else {
  console.log(`${sourceFileName} 不存在于 ${distPath} 目录中`);
}
