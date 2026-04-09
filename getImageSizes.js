import fs from "fs";
import path from "path";
import imageSize from "image-size";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "public/assets");

const files = fs.readdirSync(folderPath);

const results = [];

for (const file of files) {
  const filePath = path.join(folderPath, file);

  try {
    // Read the file as a buffer first
    const buffer = fs.readFileSync(filePath);
    
    // 🔥 FIX: use .default if needed
    const sizeOf = imageSize.default || imageSize;

    const dimensions = sizeOf(buffer);

    results.push({
      src: `/assets/${file}`,
      alt: file.replace(/\.[^/.]+$/, ""),
      width: dimensions.width,
      height: dimensions.height,
    });
  } catch (err) {
    console.log(`❌ Error reading: ${file}`, err.message);
  }
}

console.log("\nexport const GALLERY_IMAGES = [");
results.forEach((img) => {
  console.log(
    `  { src: "${img.src}", alt: "${img.alt}", width: ${img.width}, height: ${img.height} },`
  );
});
console.log("];\n");