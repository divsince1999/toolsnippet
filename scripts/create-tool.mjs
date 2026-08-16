import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node scripts/create-tool.mjs <slug> \"<Tool Name>\" [Category] [\"Short Description\"]");
  console.log("Example: node scripts/create-tool.mjs slug-generator \"Slug Generator\" Text \"Generate clean URL slugs.\"");
  process.exit(1);
}

const slug = args[0].toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
const name = args[1].trim();
const category = args[2] ? args[2].trim() : "Text";
const shortDescription = args[3] ? args[3].trim() : `Free online ${name} tool. Fast, private, and runs directly in your browser.`;

// Convert slug to PascalCase
const pascalName = slug
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");

const componentName = `${pascalName}Tool`;
const componentFileName = `${componentName}.tsx`;
const componentFilePath = path.join(rootDir, "components", "tools", componentFileName);

// 1. Check if slug already exists
const toolsFilePath = path.join(rootDir, "lib", "tools.ts");
let toolsContent = fs.readFileSync(toolsFilePath, "utf8");

if (toolsContent.includes(`slug: "${slug}"`)) {
  console.error(`❌ Error: Tool with slug "${slug}" already exists in lib/tools.ts!`);
  process.exit(1);
}

// 2. Create Component File
const componentTemplate = `"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ${componentName}() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleProcess = () => {
    try {
      if (!input.trim()) return;
      // TODO: Implement transformation logic for ${name}
      setOutput(input);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Processing failed");
    }
  };

  return (
    <ToolContainer
      title="${name}"
      description="${shortDescription}"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or enter content here..."
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleProcess}>Process</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="Output"
            readOnly
            copyable
            value={output}
            rows={8}
          />
        )}
      </div>
    </ToolContainer>
  );
}
`;

fs.writeFileSync(componentFilePath, componentTemplate, "utf8");
console.log(`✅ Created component file: components/tools/${componentFileName}`);

// 3. Register in components/tools/index.tsx
const registryPath = path.join(rootDir, "components", "tools", "index.tsx");
let registryContent = fs.readFileSync(registryPath, "utf8");

const registryEntry = `  "${slug}": dynamic(() => import("./${componentName}"), { loading: ToolSkeleton }),\n};`;
registryContent = registryContent.replace(/\s*\};\s*$/, `\n${registryEntry}\n`);
fs.writeFileSync(registryPath, registryContent, "utf8");
console.log(`✅ Registered in components/tools/index.tsx`);

// 4. Add metadata to lib/tools.ts
const toolMetadataStub = `  {
    slug: "${slug}",
    name: "${name}",
    category: "${category}",
    shortDescription: "${shortDescription}",
    heroTitle: "Free Online ${name}",
    heroDescription: "${shortDescription}",
    about: "${name} allows developers and writers to quickly process, transform, and clean data in real-time with zero latency.",
    howToUse: [
      "Enter or paste your text into the input area.",
      "Click Process to execute the transformation.",
      "Copy your formatted output with one click.",
    ],
    whyUse: [
      "100% client-side: zero data leaves your browser.",
      "Fast, private, and responsive performance.",
      "Free to use with no account or installation required.",
    ],
    faqs: [
      {
        question: "Is my data safe when using ${name}?",
        answer: "Yes, all processing is performed entirely in your browser memory. Nothing is transmitted over the network.",
      },
      {
        question: "Can I process large inputs?",
        answer: "Yes, ${name} handles inputs of any typical text size directly on your device.",
      },
    ],
    features: [
      "Instant client-side processing",
      "One-click copy to clipboard",
      "Clean, modern responsive UI",
      "No account or sign-up required",
    ],
    tips: [
      "Verify input formatting before processing",
      "Use the Copy button to quickly export your result",
    ],
  },
];`;

toolsContent = toolsContent.replace(/\s*\];\s*\n\s*export function getToolBySlug/, `\n${toolMetadataStub}\n\nexport function getToolBySlug`);
fs.writeFileSync(toolsFilePath, toolsContent, "utf8");
console.log(`✅ Added metadata to lib/tools.ts`);

// 5. Run validator
console.log("\nRunning registry verification...");
try {
  execSync("node scripts/validate-registry.mjs", { stdio: "inherit" });
  console.log(`\n🎉 Successfully scaffolded "${name}" (/tools/${slug})!`);
} catch {
  console.error("❌ Registry validation failed after scaffolding.");
}
