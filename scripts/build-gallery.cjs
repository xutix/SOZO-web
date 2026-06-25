const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const root = process.cwd();
const workspaceRoot = path.resolve(root, "..");
const assetsRoot = path.resolve(workspaceRoot, "assets");
const publicMedia = path.resolve(root, "public", "media");
const galleryDir = path.resolve(publicMedia, "gallery");
const dataFile = path.resolve(root, "src", "data", "gallery.js");

if (!galleryDir.startsWith(publicMedia)) {
  throw new Error("Refusing to write gallery outside public/media.");
}

fs.rmSync(galleryDir, { recursive: true, force: true });
fs.mkdirSync(galleryDir, { recursive: true });

const imageExts = new Set([".jpg", ".jpeg", ".png"]);
const videoExts = new Set([".mp4", ".webm", ".mov", ".m4v"]);

const categoryMap = {
  dock: { category: "SOZO Dock", use: "Dock 产品页 / 灯效与研发过程" },
  fpv: { category: "FPV 与无人机", use: "FPV 页面 / 结构、飞行与真实机体" },
  education: { category: "展会与教育", use: "服务案例 / 展会、课程与活动现场" },
  team: { category: "研发现场", use: "关于我们 / 研发过程与团队现场" },
  tools: { category: "工程工具", use: "产品方向 / 工作台、工具与桌面系统" },
  videos: { category: "站内视频", use: "首页或产品页动效预览" },
  public: { category: "站内视频", use: "首页或产品页动效预览" },
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function titleFromFile(file) {
  return path.basename(file, path.extname(file))
    .replace(/[（(].*?[)）]/g, "")
    .replace(/[，,]/g, " · ")
    .trim();
}

function categoryFromPath(file, isPublic) {
  if (isPublic) return categoryMap.public;
  const top = path.relative(assetsRoot, file).split(path.sep)[0];
  return categoryMap[top] || { category: "素材库", use: "备用素材 / 待人工筛选" };
}

function sizeLabel(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)}MB`
    : `${Math.max(1, Math.round(bytes / 1024))}KB`;
}

const resizeScript = path.join(os.tmpdir(), "sozo-gallery-resize.ps1");
fs.writeFileSync(
  resizeScript,
  `param([string]$Source,[string]$Dest)
Add-Type -AssemblyName System.Drawing
$maxW=1600
$maxH=1200
$quality=78L
$img=[System.Drawing.Image]::FromFile($Source)
try {
  try {
    $prop=$img.GetPropertyItem(274)
    $orientation=[BitConverter]::ToUInt16($prop.Value,0)
    switch ($orientation) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  } catch {}
  $ratio=[Math]::Min($maxW / $img.Width, $maxH / $img.Height)
  if ($ratio -gt 1) { $ratio=1 }
  $newW=[Math]::Max(1,[int]($img.Width*$ratio))
  $newH=[Math]::Max(1,[int]($img.Height*$ratio))
  $bmp=New-Object System.Drawing.Bitmap($newW,$newH)
  try {
    $g=[System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.PixelOffsetMode=[System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.Clear([System.Drawing.Color]::FromArgb(5,7,7))
      $g.DrawImage($img,0,0,$newW,$newH)
    } finally { $g.Dispose() }
    $codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $enc=New-Object System.Drawing.Imaging.EncoderParameters(1)
    $enc.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,$quality)
    $bmp.Save($Dest,$codec,$enc)
  } finally { $bmp.Dispose() }
  Write-Output "$($img.Width)x$($img.Height) -> $newW x $newH"
} finally { $img.Dispose() }
`,
  "utf8"
);

const sourceImages = walk(assetsRoot).filter((file) => imageExts.has(path.extname(file).toLowerCase()));
const sourceVideos = walk(assetsRoot).filter((file) => videoExts.has(path.extname(file).toLowerCase()));
const publicVideos = fs.existsSync(publicMedia)
  ? fs.readdirSync(publicMedia)
      .filter((name) => videoExts.has(path.extname(name).toLowerCase()))
      .map((name) => path.join(publicMedia, name))
  : [];

const items = [];
const skipped = [];
let imageIndex = 1;
let videoIndex = 1;

for (const file of sourceImages) {
  const top = path.relative(assetsRoot, file).split(path.sep)[0];
  if (top === "brand") {
    skipped.push({ file: toPosix(path.relative(workspaceRoot, file)), reason: "品牌图标不进入摄影图集" });
    continue;
  }

  const info = categoryFromPath(file, false);
  const id = `asset-${String(imageIndex).padStart(2, "0")}`;
  const destName = `${id}.jpg`;
  const dest = path.join(galleryDir, destName);

  let dimensionNote = "";
  try {
    dimensionNote = cp.execFileSync(
      "powershell",
      ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", resizeScript, "-Source", file, "-Dest", dest],
      { encoding: "utf8" }
    ).trim();
  } catch (error) {
    skipped.push({
      file: toPosix(path.relative(workspaceRoot, file)),
      reason: `图片压缩失败：${String(error.message).slice(0, 120)}`,
    });
    continue;
  }

  const originalBytes = fs.statSync(file).size;
  const optimizedBytes = fs.statSync(dest).size;
  items.push({
    id,
    type: "image",
    title: titleFromFile(file),
    category: info.category,
    use: info.use,
    src: `gallery/${destName}`,
    source: toPosix(path.relative(workspaceRoot, file)),
    originalSize: sizeLabel(originalBytes),
    webSize: sizeLabel(optimizedBytes),
    note: dimensionNote,
  });
  imageIndex += 1;
}

const allVideos = [
  ...sourceVideos.map((file) => ({ file, isPublic: false })),
  ...publicVideos.map((file) => ({ file, isPublic: true })),
];

for (const { file, isPublic } of allVideos) {
  const bytes = fs.statSync(file).size;
  const baseName = path.basename(file);

  if (bytes > 30 * 1024 * 1024) {
    skipped.push({
      file: isPublic ? `public/media/${baseName}` : toPosix(path.relative(workspaceRoot, file)),
      reason: `视频 ${sizeLabel(bytes)}，暂不进网页图集，建议后续转码压缩`,
    });
    continue;
  }

  const info = categoryFromPath(file, isPublic);
  const id = `video-${String(videoIndex).padStart(2, "0")}`;
  const destName = `${id}${path.extname(file).toLowerCase()}`;
  const dest = path.join(galleryDir, destName);
  fs.copyFileSync(file, dest);

  items.push({
    id,
    type: "video",
    title: titleFromFile(file),
    category: info.category,
    use: info.use,
    src: `gallery/${destName}`,
    source: isPublic ? `public/media/${baseName}` : toPosix(path.relative(workspaceRoot, file)),
    originalSize: sizeLabel(bytes),
    webSize: sizeLabel(fs.statSync(dest).size),
    note: "视频仅 metadata 预加载，避免自动占用带宽",
  });
  videoIndex += 1;
}

const categoryOrder = ["全部", ...Array.from(new Set(items.map((item) => item.category)))];
const totalSourceBytes = [...sourceImages, ...sourceVideos].reduce((sum, file) => sum + fs.statSync(file).size, 0);
const totalWebBytes = items.reduce((sum, item) => {
  const file = path.resolve(publicMedia, item.src);
  return fs.existsSync(file) ? sum + fs.statSync(file).size : sum;
}, 0);

fs.writeFileSync(
  dataFile,
  `export const galleryCategories = ${JSON.stringify(categoryOrder, null, 2)};\n\n` +
    `export const galleryStats = ${JSON.stringify(
      {
        generatedAt: new Date().toISOString().slice(0, 10),
        sourceCount: sourceImages.length + sourceVideos.length,
        publishedCount: items.length,
        sourceTotal: sizeLabel(totalSourceBytes),
        webTotal: sizeLabel(totalWebBytes),
        skipped,
      },
      null,
      2
    )};\n\n` +
    `export const galleryItems = ${JSON.stringify(items, null, 2)};\n`,
  "utf8"
);

console.log(`generated ${items.length} gallery items, skipped ${skipped.length}`);
console.log(`web total ${sizeLabel(totalWebBytes)} from source ${sizeLabel(totalSourceBytes)}`);
