const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, 'public', 'assets');
const SIZE_LIMIT_KB = 300; // 体积报警线
const WIDTH_LIMIT = 1500;  // 宽度报警线

let report = "### 图片尺寸与体积异常报告\n\n| 文件路径 | 物理尺寸 | 文件大小 (KB) | 触发报警 |\n| --- | --- | --- | --- |\n";

async function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (fullPath.match(/\.(webp|png|jpe?g)$/i)) {
      try {
        const metadata = await sharp(fullPath).metadata();
        const sizeKB = stat.size / 1024;
        
        let triggers = [];
        if (sizeKB > SIZE_LIMIT_KB) triggers.push(`体积>${SIZE_LIMIT_KB}KB`);
        if (metadata.width > WIDTH_LIMIT) triggers.push(`宽度>${WIDTH_LIMIT}px`);

        if (triggers.length > 0) {
          const relativePath = path.relative(__dirname, fullPath).replace(/\\/g, '/');
          report += `| ${relativePath} | ${metadata.width}x${metadata.height} | ${sizeKB.toFixed(1)} | ${triggers.join(', ')} |\n`;
        }
      } catch (err) {
        console.error(`无法读取 ${file}: ${err.message}`);
      }
    }
  }
}

console.log('开始扫描图片...');
scanDirectory(ASSETS_DIR).then(() => {
  fs.writeFileSync('image-report.md', report);
  console.log('扫描完成！结果已导出至项目根目录的 image-report.md');
});