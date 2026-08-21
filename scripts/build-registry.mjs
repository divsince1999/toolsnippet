import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const toolsDir = path.join(rootDir, "tools");
const libToolsDir = path.join(rootDir, "lib", "tools");

// Ensure directories exist
if (!fs.existsSync(toolsDir)) {
  fs.mkdirSync(toolsDir, { recursive: true });
}
if (!fs.existsSync(libToolsDir)) {
  fs.mkdirSync(libToolsDir, { recursive: true });
}

// Helper to convert slug to a valid identifier for import alias
function slugToIdentifier(slug, index) {
  const clean = slug.replace(/[^a-zA-Z0-9]/g, "_");
  return `def_${index}_${clean}`;
}

// Helper to parse definition.ts content to extract manifest metadata
function extractDefinitionMetadata(content, slugFallback) {
  try {
    // Strip type imports and type annotations for JS execution
    let cleaned = content
      .replace(/import\s+type\s+[^;]+;/g, "")
      .replace(/import\s+[^;]+;/g, "")
      .replace(/export\s+const\s+definition\s*(:\s*ToolDefinition)?\s*=\s*/, "")
      .trim();

    if (cleaned.endsWith(";")) {
      cleaned = cleaned.slice(0, -1);
    }

    // Evaluate object literal
    const evalFn = new Function(`return (${cleaned});`);
    const def = evalFn();
    return {
      slug: def.slug || slugFallback,
      name: def.name || slugFallback,
      category: def.category || "General",
      shortDescription: def.shortDescription || "",
      tags: def.tags || [],
      icon: def.icon || "",
    };
  } catch {
    // Fallback to regex if dynamic evaluation fails
    const slugMatch = content.match(/["']?slug["']?\s*:\s*["'`]([^"'`]+)["'`]/);
    const nameMatch = content.match(/["']?name["']?\s*:\s*["'`]([^"'`]+)["'`]/);
    const categoryMatch = content.match(/["']?category["']?\s*:\s*["'`]([^"'`]+)["'`]/);
    const shortDescMatch = content.match(/["']?shortDescription["']?\s*:\s*["'`]([^"'`]+)["'`]/);
    const iconMatch = content.match(/["']?icon["']?\s*:\s*["'`]([^"'`]+)["'`]/);

    return {
      slug: slugMatch ? slugMatch[1] : slugFallback,
      name: nameMatch ? nameMatch[1] : slugFallback,
      category: categoryMatch ? categoryMatch[1] : "General",
      shortDescription: shortDescMatch ? shortDescMatch[1] : "",
      tags: [],
      icon: iconMatch ? iconMatch[1] : "",
    };
  }
}

export function buildRegistry() {
  console.log("🛠️  Scanning tools directory...");

  const toolFolders = fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."))
    .map((dirent) => dirent.name)
    .sort();

  const validTools = [];
  const manifest = [];

  for (let i = 0; i < toolFolders.length; i++) {
    const slug = toolFolders[i];
    const toolFolderPath = path.join(toolsDir, slug);
    const defPath = path.join(toolFolderPath, "definition.ts");
    const compPath = path.join(toolFolderPath, "component.tsx");

    if (!fs.existsSync(defPath)) {
      console.warn(`⚠️  Skipping ${slug}: definition.ts missing`);
      continue;
    }

    if (!fs.existsSync(compPath)) {
      console.warn(`⚠️  Skipping ${slug}: component.tsx missing`);
      continue;
    }

    const defContent = fs.readFileSync(defPath, "utf8");
    const metadata = extractDefinitionMetadata(defContent, slug);

    validTools.push({
      folderName: slug,
      slug: metadata.slug,
      varName: slugToIdentifier(metadata.slug, i),
      metadata,
    });

    manifest.push({
      slug: metadata.slug,
      name: metadata.name,
      category: metadata.category,
      shortDescription: metadata.shortDescription,
      ...(metadata.tags && metadata.tags.length > 0 ? { tags: metadata.tags } : {}),
      ...(metadata.icon ? { icon: metadata.icon } : {}),
    });
  }

  console.log(`📦 Found ${validTools.length} valid modular tool(s).`);

  // Generate lib/tools/registry.ts
  const importStatements = validTools
    .map((t) => `import { definition as ${t.varName} } from "@/tools/${t.folderName}/definition";`)
    .join("\n");

  const toolArrayElements = validTools.map((t) => `  ${t.varName},`).join("\n");

  const registryEntries = validTools
    .map(
      (t) =>
        `  "${t.slug}": dynamic(() => import("@/tools/${t.folderName}/component"), { loading: ToolSkeleton }),`
    )
    .join("\n");

  const registryContent = `// AUTO-GENERATED FILE by scripts/build-registry.mjs — DO NOT EDIT DIRECTLY
import dynamic from "next/dynamic";
import React from "react";
import type { ToolDefinition } from "@/lib/tools/types";
export { buildToolMetadata } from "./helpers";

const ToolSkeleton = () =>
  React.createElement(
    "div",
    { className: "mx-auto w-full max-w-6xl px-4 mt-6 min-h-[420px]" },
    React.createElement("div", {
      className:
        "h-full min-h-[420px] animate-pulse rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5",
    })
  );

${importStatements ? `${importStatements}\n` : ""}export const tools: ToolDefinition[] = [
${toolArrayElements}
];

export const ToolRegistry: Record<string, React.ComponentType> = {
${registryEntries}
};

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 3): ToolDefinition[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .slice(0, limit);
}
`;

  const registryFilePath = path.join(libToolsDir, "registry.ts");
  fs.writeFileSync(registryFilePath, registryContent, "utf8");
  console.log(`✅ Generated: lib/tools/registry.ts (${validTools.length} tools registered)`);

  // Generate lib/tools/manifest.json
  const manifestFilePath = path.join(libToolsDir, "manifest.json");
  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`✅ Generated: lib/tools/manifest.json (${manifest.length} manifest items)`);
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildRegistry();
}
