import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("=== ToolSnippet Registry Validation ===");

let hasErrors = false;

// 1. Modular Tools Validation (tools/ folder)
const toolsDir = path.join(rootDir, "tools");
if (!fs.existsSync(toolsDir)) {
  console.error("❌ tools/ directory does not exist!");
  process.exit(1);
}

const toolFolders = fs
  .readdirSync(toolsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
  .map((dirent) => dirent.name)
  .sort();

console.log(`📁 Modular tools directory: found ${toolFolders.length} tool folder(s)`);

const modularSlugs = [];
const categories = new Set();

for (const folder of toolFolders) {
  const folderPath = path.join(toolsDir, folder);
  const defPath = path.join(folderPath, "definition.ts");
  const compPath = path.join(folderPath, "component.tsx");
  const indexPath = path.join(folderPath, "index.ts");

  if (!fs.existsSync(defPath)) {
    console.error(`❌ [${folder}] Missing definition.ts`);
    hasErrors = true;
  }
  if (!fs.existsSync(compPath)) {
    console.error(`❌ [${folder}] Missing component.tsx`);
    hasErrors = true;
  }
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ [${folder}] Missing index.ts`);
    hasErrors = true;
  }

  if (fs.existsSync(defPath)) {
    const defContent = fs.readFileSync(defPath, "utf8");
    const slugMatch = defContent.match(/["']?slug["']?\s*:\s*["']([^"']+)["']/);
    const categoryMatch = defContent.match(/["']?category["']?\s*:\s*["']([^"']+)["']/);

    if (!slugMatch) {
      console.error(`❌ [${folder}] definition.ts does not declare a valid slug`);
      hasErrors = true;
    } else {
      modularSlugs.push(slugMatch[1]);
    }

    if (categoryMatch) {
      categories.add(categoryMatch[1]);
    }
  }
}

// Check duplicate slugs in modular directory
const duplicateModular = modularSlugs.filter((s, idx) => modularSlugs.indexOf(s) !== idx);
if (duplicateModular.length > 0) {
  console.error(`❌ Duplicate slugs in tools/ directory: ${duplicateModular.join(", ")}`);
  hasErrors = true;
}

// Check sync with lib/tools/registry.ts and lib/tools/manifest.json
const registryTsPath = path.join(rootDir, "lib", "tools", "registry.ts");
const manifestJsonPath = path.join(rootDir, "lib", "tools", "manifest.json");

if (!fs.existsSync(registryTsPath)) {
  console.error("❌ lib/tools/registry.ts missing");
  hasErrors = true;
} else {
  const registryContent = fs.readFileSync(registryTsPath, "utf8");
  for (const slug of modularSlugs) {
    if (!registryContent.includes(`"${slug}": dynamic`)) {
      console.error(`❌ Slug "${slug}" from tools/ is missing in lib/tools/registry.ts`);
      hasErrors = true;
    }
  }
}

if (!fs.existsSync(manifestJsonPath)) {
  console.error("❌ lib/tools/manifest.json missing");
  hasErrors = true;
} else {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestJsonPath, "utf8"));
    const manifestSlugs = manifest.map((m) => m.slug);
    for (const slug of modularSlugs) {
      if (!manifestSlugs.includes(slug)) {
        console.error(`❌ Slug "${slug}" from tools/ is missing in lib/tools/manifest.json`);
        hasErrors = true;
      }
    }
    console.log(`📋 Total tools verified: ${manifest.length}`);
    console.log(`   Categories: ${Array.from(categories).join(", ")}`);
  } catch {
    console.error("❌ lib/tools/manifest.json is invalid JSON");
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error("\n❌ Validation failed with errors.");
  process.exit(1);
}

console.log("✅ All registries are 100% synchronized and validated successfully!\n");
