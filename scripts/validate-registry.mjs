import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read components/tools/index.tsx to find registered slugs
const registryPath = path.join(rootDir, "components", "tools", "index.tsx");
const registryContent = fs.readFileSync(registryPath, "utf8");

const registrySlugs = [];
const registryRegex = /"([a-z0-9-]+)"\s*:\s*dynamic/g;
let match;
while ((match = registryRegex.exec(registryContent)) !== null) {
  registrySlugs.push(match[1]);
}

// 2. Read lib/tools.ts (or modular files) to find tool definitions
const toolsFilePath = path.join(rootDir, "lib", "tools.ts");
const toolsContent = fs.readFileSync(toolsFilePath, "utf8");

const definedSlugs = [];
const slugRegex = /slug:\s*"([a-z0-9-]+)"/g;
while ((match = slugRegex.exec(toolsContent)) !== null) {
  definedSlugs.push(match[1]);
}

// Check category distribution
const categoryRegex = /category:\s*"([^"]+)"/g;
const categories = new Set();
while ((match = categoryRegex.exec(toolsContent)) !== null) {
  categories.add(match[1]);
}

console.log("=== ToolSnippet Registry Validation ===");
console.log(`Total tools in metadata: ${definedSlugs.length}`);
console.log(`Total tools in ToolRegistry: ${registrySlugs.length}`);
console.log(`Categories found: ${Array.from(categories).join(", ")}`);

// Check for duplicates
const duplicateSlugs = definedSlugs.filter((slug, index) => definedSlugs.indexOf(slug) !== index);
if (duplicateSlugs.length > 0) {
  console.error(`❌ Duplicate slugs found in metadata: ${duplicateSlugs.join(", ")}`);
  process.exit(1);
}

// Check missing in ToolRegistry
const missingInRegistry = definedSlugs.filter(slug => !registrySlugs.includes(slug));
if (missingInRegistry.length > 0) {
  console.error(`❌ Tools defined in metadata but MISSING in ToolRegistry: ${missingInRegistry.join(", ")}`);
  process.exit(1);
}

// Check missing in metadata
const missingInMetadata = registrySlugs.filter(slug => !definedSlugs.includes(slug));
if (missingInMetadata.length > 0) {
  console.error(`❌ Tools in ToolRegistry but MISSING in metadata: ${missingInMetadata.join(", ")}`);
  process.exit(1);
}

// Check that physical component files exist
let missingFiles = 0;
for (const slug of registrySlugs) {
  // Find component import path in index.tsx
  const importRegex = new RegExp(`"${slug}"\\s*:\\s*dynamic\\(\\(\\)\\s*=>\\s*import\\(["']\\.\\/([^"']+)["']\\)`);
  const fileMatch = registryContent.match(importRegex);
  if (fileMatch) {
    const componentName = fileMatch[1];
    const compFilePath = path.join(rootDir, "components", "tools", `${componentName}.tsx`);
    if (!fs.existsSync(compFilePath)) {
      console.error(`❌ Component file missing for "${slug}": ${compFilePath}`);
      missingFiles++;
    }
  }
}

if (missingFiles > 0) {
  process.exit(1);
}

console.log("✅ All tools are 100% matched, registered, and validated successfully!");
