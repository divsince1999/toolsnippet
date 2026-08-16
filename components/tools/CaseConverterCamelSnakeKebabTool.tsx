"use client";

import { useMemo, useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CaseConverterCamelSnakeKebabTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const getWords = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/[-_./\\]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  const results = useMemo(() => {
    if (!input.trim()) return null;

    const lines = input.split("\n");

    const transformLines = (fn: (words: string[]) => string) => {
      return lines
        .map((line) => {
          const words = getWords(line);
          return words.length > 0 ? fn(words) : "";
        })
        .join("\n");
    };

    return {
      camelCase: transformLines((words) =>
        words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("")
      ),
      snake_case: transformLines((words) => words.map((w) => w.toLowerCase()).join("_")),
      kebabCase: transformLines((words) => words.map((w) => w.toLowerCase()).join("-")),
      pascalCase: transformLines((words) =>
        words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("")
      ),
      constantCase: transformLines((words) => words.map((w) => w.toUpperCase()).join("_")),
      dotCase: transformLines((words) => words.map((w) => w.toLowerCase()).join(".")),
      pathCase: transformLines((words) => words.map((w) => w.toLowerCase()).join("/")),
    };
  }, [input]);

  const handleCopy = (key: string, text: string) => {
    copyToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolContainer
      title="Code Variable Case Converter"
      description="Convert identifiers between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, and dot.case."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Identifier or Multi-line Code Names"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`userProfileSetting\nGET_USER_DETAILS\nmy-api-endpoint\nOrderSummaryReport`}
          rows={5}
        />

        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>

        {results && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { key: "camelCase", label: "camelCase", val: results.camelCase },
              { key: "snake_case", label: "snake_case", val: results.snake_case },
              { key: "kebabCase", label: "kebab-case", val: results.kebabCase },
              { key: "pascalCase", label: "PascalCase", val: results.pascalCase },
              { key: "constantCase", label: "CONSTANT_CASE", val: results.constantCase },
              { key: "dotCase", label: "dot.case", val: results.dotCase },
              { key: "pathCase", label: "path/case", val: results.pathCase },
            ].map((item) => (
              <div
                key={item.key}
                className="rounded-xl border border-black/10 p-4 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {item.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleCopy(item.key, item.val)}
                  >
                    {copiedKey === item.key && isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <pre className="font-mono text-sm overflow-x-auto whitespace-pre p-2 bg-white dark:bg-black/40 rounded border border-black/5 dark:border-white/5">
                  {item.val}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
