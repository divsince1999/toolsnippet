"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";

export default function ReadmeGeneratorTool() {
  const [config, setConfig] = useState({
    name: "",
    description: "",
    installation: "npm install",
    usage: "npm run dev",
    features: "Feature 1\nFeature 2",
    license: "MIT"
  });

  const readme = `# ${config.name || "Project Name"}

${config.description || "A brief description of your project."}

## Features
${config.features.split('\n').map(f => `- ${f}`).join('\n')}

## Installation
\`\`\`bash
${config.installation}
\`\`\`

## Usage
\`\`\`bash
${config.usage}
\`\`\`

## License
Released under the ${config.license} license.`;

  return (
    <ToolContainer title="README Generator" description="Generate professional README.md files easily.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Project Name</label>
            <input type="text" value={config.name} onChange={e => setConfig({...config, name: e.target.value})} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea value={config.description} onChange={e => setConfig({...config, description: e.target.value})} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20 h-24" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Features (one per line)</label>
            <textarea value={config.features} onChange={e => setConfig({...config, features: e.target.value})} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20 h-24" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TextArea
            label="Markdown Preview"
            value={readme}
            readOnly
            rows={15}
            copyable
          />
        </div>
      </div>
    </ToolContainer>
  );
}
