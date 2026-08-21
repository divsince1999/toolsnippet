"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UserSnippetGenerator() {
  const [title, setTitle] = useState("React Arrow Component");
  const [prefix, setPrefix] = useState("rac");
  const [scope, setScope] = useState("typescriptreact,javascriptreact");
  const [code, setCode] = useState("interface ${1:Props} {\n  title: string;\n}\n\nexport const ${2:MyComponent} = ({ title }: ${1:Props}) => {\n  return (\n    <div>\n      <h1>{title}</h1>\n      ${0}\n    </div>\n  );\n};");
  const [copied, setCopied] = useState(false);

  const snippetJson = useMemo(() => {
    const lines = code.split("\n");
    const snippetObj: Record<string, { prefix: string; body: string[]; description: string; scope?: string }> = {
      [title.trim() || "User Snippet"]: {
        prefix: prefix.trim() || "snip",
        body: lines,
        description: title.trim() || "Custom User Snippet"
      }
    };

    if (scope.trim()) {
      snippetObj[title.trim() || "User Snippet"].scope = scope.trim();
    }

    return JSON.stringify(snippetObj, null, 2);
  }, [title, prefix, scope, code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="VS Code & Sublime User Snippet Generator"
      description="Convert raw code into VS Code, Cursor, and Sublime Text JSON code snippets with tabstops, prefix triggers, and placeholders."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Snippet Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Trigger Prefix:
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Language Scope:
            </label>
            <input
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="javascript,typescript"
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Code Body Template:
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Generated VS Code JSON Snippet:
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy Snippet"}
              </Button>
            </div>
            <textarea
              readOnly
              value={snippetJson}
              rows={12}
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
