"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const PRESETS: Record<string, { title: string; rules: string[] }> = {
  node: {
    title: "Node.js & JS",
    rules: ["node_modules/", "npm-debug.log*", "yarn-debug.log*", "yarn-error.log*", "pnpm-debug.log*", ".pnpm-store/", ".next/", "dist/", "build/", ".cache/"]
  },
  python: {
    title: "Python",
    rules: ["__pycache__/", "*.py[cod]", "*$py.class", "*.so", ".Python", "env/", "venv/", "ENV/", ".env/", "*.egg-info/", ".pytest_cache/"]
  },
  env: {
    title: "Environment Secrets",
    rules: [".env", ".env.local", ".env.development.local", ".env.test.local", ".env.production.local", "*.pem", "*.key", "secrets.yaml"]
  },
  os: {
    title: "Operating Systems (macOS / Windows)",
    rules: [".DS_Store", ".DS_Store?", "._*", ".Spotlight-V100", ".Trashes", "Thumbs.db", "ehthumbs.db", "Desktop.ini"]
  },
  ide: {
    title: "IDEs (VS Code & JetBrains)",
    rules: [".vscode/*", "!.vscode/settings.json", "!.vscode/tasks.json", "!.vscode/extensions.json", ".idea/", "*.iml", "*.iws", "*.suo", "*.ntvs*"]
  },
  rust: {
    title: "Rust & Go",
    rules: ["/target", "**/*.rs.bk", "Cargo.lock", "bin/", "pkg/", "*.exe"]
  }
};

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>(["node", "env", "os", "ide"]);
  const [customRules, setCustomRules] = useState("");
  const [copied, setCopied] = useState(false);

  const gitignoreContent = useMemo(() => {
    const header = "# Generated with ToolSnippet (.gitignore Generator)\n# https://www.toolsnippet.com/tools/gitignore-generator\n\n";
    const sections: string[] = [];

    for (const key of selected) {
      const p = PRESETS[key];
      if (p) {
        sections.push(`# === ${p.title} ===\n${p.rules.join("\n")}`);
      }
    }

    if (customRules.trim()) {
      sections.push(`# === Custom Rules ===\n${customRules.trim()}`);
    }

    return header + sections.join("\n\n");
  }, [selected, customRules]);

  const togglePreset = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gitignoreContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title=".gitignore Generator & Rule Builder"
      description="Generate comprehensive, custom .gitignore files combining operating systems, IDEs, programming languages, and frameworks."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Select Preset Profiles:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PRESETS).map(([key, item]) => {
              const active = selected.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => togglePreset(key)}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? "border-primary-solid bg-primary-solid/10 text-primary-solid"
                      : "border-black/10 bg-black/[0.02] text-gray-600 hover:border-black/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-gray-300"
                  }`}
                >
                  {active ? "✓ " : "+ "}
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Custom Ignore Rules (Optional):
          </label>
          <textarea
            value={customRules}
            onChange={(e) => setCustomRules(e.target.value)}
            placeholder="uploads/&#10;temp_*.log"
            rows={2}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated .gitignore File:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy .gitignore"}
            </Button>
          </div>
          <pre className="max-h-80 overflow-y-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs text-gray-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100">
            {gitignoreContent}
          </pre>
        </div>
      </div>
    </ToolContainer>
  );
}
