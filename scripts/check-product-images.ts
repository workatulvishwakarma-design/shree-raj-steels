import fs from "fs";
import path from "path";
import { SUB_PRODUCTS } from "../src/data/sub-products";

const PUBLIC_DIR = path.join(__dirname, "../public");

console.log("==================================================");
console.log(" Shree Raj Steels - Product Image Audit Script");
console.log("==================================================");

let totalSubProducts = SUB_PRODUCTS.length;
let missingImagesCount = 0;
let duplicateImagesCount = 0;

const imageToProducts: Record<string, string[]> = {};

// Helper to check file existence
function checkImageFile(imagePath: string, subProductName: string, fieldName: string): boolean {
  if (!imagePath) {
    console.error(`❌ [${subProductName}] Missing path for field: ${fieldName}`);
    return false;
  }

  if (!imagePath.startsWith("/")) {
    console.error(`❌ [${subProductName}] Path '${imagePath}' for ${fieldName} does not start with '/'`);
    return false;
  }

  const absolutePath = path.join(PUBLIC_DIR, imagePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ [${subProductName}] File not found: ${imagePath} (Field: ${fieldName})`);
    return false;
  }

  return true;
}

SUB_PRODUCTS.forEach((sp) => {
  console.log(`Checking [${sp.name}] (${sp.slug})...`);
  
  // Check image files
  const heroOk = checkImageFile(sp.heroImage, sp.name, "heroImage");
  const imgOk = checkImageFile(sp.image || "", sp.name, "image");
  const thumbOk = checkImageFile(sp.thumbnail || "", sp.name, "thumbnail");

  if (!heroOk || !imgOk || !thumbOk) {
    missingImagesCount++;
  }

  // Check duplicates
  if (sp.image) {
    if (!imageToProducts[sp.image]) {
      imageToProducts[sp.image] = [];
    }
    imageToProducts[sp.image].push(sp.name);
  }
});

console.log("\n==================================================");
console.log(" Checking for Duplicate Images across sub-products");
console.log("==================================================");

Object.entries(imageToProducts).forEach(([imagePath, products]) => {
  if (products.length > 1) {
    console.warn(`⚠️ Duplicate image path: ${imagePath}`);
    console.warn(`   Used by: ${products.join(", ")}`);
    duplicateImagesCount++;
  }
});

console.log("\n==================================================");
console.log(" Summary");
console.log("==================================================");
console.log(`Total Sub-Products Checked: ${totalSubProducts}`);
console.log(`Sub-Products with Missing Images: ${missingImagesCount}`);
console.log(`Duplicate Image Paths Detected: ${duplicateImagesCount}`);
console.log("==================================================");

if (missingImagesCount > 0 || duplicateImagesCount > 0) {
  process.exit(1);
} else {
  console.log("✅ All product images are valid and unique!");
  process.exit(0);
}
