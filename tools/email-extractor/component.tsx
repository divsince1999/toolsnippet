"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function EmailExtractorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [outputFormat, setOutputFormat] = useState<"newline" | "comma" | "json">("newline");
  const [sortAlphabetical, setSortAlphabetical] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [count, setCount] = useState(0);

  const extractEmails = () => {
    if (!input.trim()) return;

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = input.match(emailRegex) || [];

    let processed = matches.map((email) => (lowercase ? email.toLowerCase() : email));
    processed = Array.from(new Set(processed));

    if (sortAlphabetical) {
      processed.sort((a, b) => a.localeCompare(b));
    }

    setCount(processed.length);

    if (outputFormat === "comma") {
      setOutput(processed.join(", "));
    } else if (outputFormat === "json") {
      setOutput(JSON.stringify(processed, null, 2));
    } else {
      setOutput(processed.join("\n"));
    }
  };

  return (
    <ToolContainer
      title="Email Extractor from Text"
      description="Scan and extract all valid unique email addresses from unstructured text, documents, or logs."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text or Data"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text containing emails, e.g. contact support@example.com or reach out to john.doe@company.org..."
          rows={8}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Format:</label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as "newline" | "comma" | "json")}
                className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              >
                <option value="newline">One per line</option>
                <option value="comma">Comma-separated</option>
                <option value="json">JSON Array</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={sortAlphabetical}
                onChange={(e) => setSortAlphabetical(e.target.checked)}
                className="rounded border-gray-300 text-primary"
              />
              <span>Sort A-Z</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded border-gray-300 text-primary"
              />
              <span>Lowercase</span>
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={extractEmails}>Extract Emails</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Found {count} Unique {count === 1 ? "Email" : "Emails"}
            </div>
            <TextArea
              label="Extracted Emails"
              readOnly
              copyable
              value={output}
              rows={8}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
