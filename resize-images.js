const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 这里依然保留 Cline 帮您生成的 targetWidths 字典
const targetWidths = {
  // （请确保把之前 Cline 生成的字典原封不动地粘贴在这里）
  "public/assets/experience/alstom/gallery-1-tpu.webp": 2240,
  "public/assets/experience/alstom/gallery-2-indoor-img.webp": 2240,
  "public/assets/experience/alstom/reverse-1-broken-1.webp": 816,
  "public/assets/experience/alstom/reverse-4-final-1.webp": 816,
  "public/assets/experience/alstom/reverse-4-final-2.webp": 816,
  "public/assets/experience/alstom/workflow-5-dashboard.webp": 2240,
  "public/assets/experience/duke-nus/control-architecture.webp": 1216,
  "public/assets/experience/duke-nus/gear-rack-cad.webp": 778,
  "public/assets/experience/duke-nus/print-detail-1.webp": 778,
  "public/assets/experience/duke-nus/print-detail-2.webp": 778,
  "public/assets/experience/duke-nus/servo-fea.webp": 1606,
  "public/assets/experience/duke-nus/simulator-render.webp": 778,
  "public/assets/experience/duke-nus/sop-1.webp": 1192,
  "public/assets/experience/duke-nus/sop-2.webp": 1192,
  "public/assets/leadership/robot-association/ra-comm-lec1.webp": 1120,
  "public/assets/leadership/robot-association/ra-comm-lec2.webp": 1120,
  "public/assets/leadership/robot-association/ra-comm-team.webp": 1120,
  "public/assets/leadership/robot-association/ra-event-group.webp": 1120,
  "public/assets/leadership/robot-association/ra-event-test.webp": 1120,
  "public/assets/leadership/robotics-team/p1-founder-team.webp": 640,
  "public/assets/leadership/robotics-team/p1-lecture.webp": 640,
  "public/assets/leadership/robotics-team/p1-official-group.webp": 640,
  "public/assets/leadership/robotics-team/p1-prelim-team.webp": 2482,
  "public/assets/leadership/robotics-team/p1-robot-auto.webp": 640,
  "public/assets/leadership/robotics-team/p1-robot-manual.webp": 640,
  "public/assets/leadership/robotics-team/p2-un-gala-robot.webp": 640,
  "public/assets/leadership/robotics-team/p2-workshop.webp": 640,
  "public/assets/leadership/robotics-team/p3-award-ceremony.webp": 2500,
  "public/assets/leadership/robotics-team/p3-dev.webp": 640,
  "public/assets/leadership/robotics-team/p3-robotac-scene.webp": 640,
  "public/assets/leadership/robotics-team/p3-robotac-team.webp": 640,
  "public/assets/leadership/robotics-team/p3-tech-exchange.webp": 640,
  "public/assets/omni-wheel.webp": 912,
  "public/assets/project/lvad/real-deformation.webp": 744,
  "public/assets/project/omni-wheel/team-photo.webp": 2208,
  "public/assets/project/wrist/wrist-sim-kinematics.webp": 936,
  "public/assets/project/wrist/wrist-sim-workspace.webp": 936
};

async function processImages() {
  for (const [relativePath, targetWidth] of Object.entries(targetWidths)) {
    // 兼容不同操作系统的路径分隔符
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const fullPath = path.join(__dirname, normalizedPath);
    const tempPath = fullPath + '.tmp.webp';

    if (fs.existsSync(fullPath)) {
      try {
        // 【核心修复】：先将文件读入内存 Buffer，这样操作系统会立刻释放原文件的占用锁
        const inputBuffer = fs.readFileSync(fullPath);
        const metadata = await sharp(inputBuffer).metadata();
        const originalSize = fs.statSync(fullPath).size / 1024;

        if (metadata.width > targetWidth) {
          // 对内存中的 Buffer 进行处理
          await sharp(inputBuffer)
            .resize({ width: targetWidth, withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toFile(tempPath);

          const newSize = fs.statSync(tempPath).size / 1024;

          // 强制覆盖：原文件已无锁，顺利重命名
          fs.renameSync(tempPath, fullPath);

          console.log(`✅ [处理成功] ${relativePath}`);
          console.log(`   尺寸: ${metadata.width}px -> ${targetWidth}px | 体积: ${originalSize.toFixed(1)}KB -> ${newSize.toFixed(1)}KB`);
        } else {
          console.log(`⏩ [跳过] ${relativePath} (原宽 ${metadata.width}px 已小于目标)`);
          // 清理之前残留的失败 temp 文件
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      } catch (err) {
        console.error(`❌ [处理失败] ${relativePath}:`, err.message);
      }
    } else {
      console.warn(`⚠️ [未找到文件] ${relativePath} (请检查路径是否正确)`);
    }
  }
}

console.log('🚀 开始执行防锁死内存级压缩...');
processImages();