"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UrlExtractorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [filterDomain, setFilterDomain] = useState("");
  const [onlyUnique, setOnlyUnique] = useState(true);
  const [count, setCount] = useState(0);

  const extractUrls = () => {
    if (!input.trim()) return;

    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
    const matches = input.match(urlRegex) || [];

    let urls = matches.map((u) => u.replace(/[.,;:)\]}>]+$/, ""));

    if (onlyUnique) {
      urls = Array.from(new Set(urls));
    }

    if (filterDomain.trim()) {
      const domainSearch = filterDomain.toLowerCase().trim();
      urls = urls.filter((u) => u.toLowerCase().includes(domainSearch));
    }

    setCount(urls.length);
    setOutput(urls.join("\n"));
  };

  return (
    <ToolContainer
      title="URL & Link Extractor"
      description="Extract and filter all HTTP/HTTPS web links and URLs from text, articles, or source code."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text or HTML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Check out https://toolsnippet.com/tools/json-formatter and https://github.com/trending for developer tools...`}
          rows={8}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500">Filter Domain:</label>
              <input
                type="text"
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                placeholder="e.g. github.com"
                className="w-36 rounded-md border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={onlyUnique}
                onChange={(e) => setOnlyUnique(e.target.checked)}
                className="rounded border-gray-300 text-primary"
              />
              <span>Deduplicate URLs</span>
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={extractUrls}>Extract URLs</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Found {count} {count === 1 ? "Link" : "Links"}
            </div>
            <TextArea
              label="Extracted URLs"
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
