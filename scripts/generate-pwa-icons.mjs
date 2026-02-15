/**
 * Extract the Gold "T" logo from Triune_Assets.png and generate 192x192 and 512x512 PWA icons.
 * Run: node scripts/generate-pwa-icons.mjs
 */
import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcPath = join(root, "public", "assets", "Triune_Assets.png");
const outDir = join(root, "public", "icons");

if (!existsSync(srcPath)) {
  console.error("Triune_Assets.png not found at public/assets/Triune_Assets.png");
  process.exit(1);
}

const img = sharp(srcPath);
const meta = await img.metadata();
const { width = 0, height = 0 } = meta;

// Crop only the logo panel (rectangle + golden circle + triangle), exclude the man's face
// Center well into the right side so we get just the panel
const centerX = width * 0.85;
const centerY = height * 0.315;
const size = Math.round(Math.min(width, height) * 0.38);
const left = Math.max(0, Math.round(centerX - size / 2));
const top = Math.max(0, Math.round(centerY - size / 2));
// Keep crop within image bounds
const w = Math.min(size, width - left);
const h = Math.min(size, height - top);

const cropped = await img
  .extract({ left, top, width: w, height: h })
  .toBuffer();

await sharp(cropped)
  .resize(192, 192)
  .png()
  .toFile(join(outDir, "icon-192x192.png"));

await sharp(cropped)
  .resize(512, 512)
  .png()
  .toFile(join(outDir, "icon-512x512.png"));

console.log("Generated public/icons/icon-192x192.png and icon-512x512.png");
