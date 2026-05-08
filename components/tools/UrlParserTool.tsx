"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UrlParserTool() {
  const { input, setInput, clearAll } = useTool();

  const parsedUrl = useMemo(() => {
    try {
      if (!input) return null;
      const url = new URL(input);
      const params: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      return {
        protocol: url.protocol,
        host: url.host,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params,
      };
    } catch (e) {
      return null;
    }
  }, [input]);

  return (
    <ToolContainer
      title="URL Parser"
      description="Break down complex URLs into their individual components and parameters."
    >
      <div className="grid gap-6">
        <TextArea
          label="Enter URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/path?name=john&age=30#section"
          rows={2}
        />

        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {parsedUrl ? (
          <div className="grid gap-4 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
            <div className="bg-black/[0.02] p-4 dark:bg-white/[0.02]">
              <h3 className="mb-4 text-sm font-semibold">URL Components</h3>
              <div className="grid gap-2 text-sm">
                <div className="grid grid-cols-[100px_1fr] border-b border-black/5 pb-2 dark:border-white/5">
                  <span className="text-gray-500">Protocol</span>
                  <span className="font-mono">{parsedUrl.protocol}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-black/5 pb-2 dark:border-white/5">
                  <span className="text-gray-500">Host</span>
                  <span className="font-mono">{parsedUrl.host}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-black/5 pb-2 dark:border-white/5">
                  <span className="text-gray-500">Pathname</span>
                  <span className="font-mono">{parsedUrl.pathname}</span>
                </div>
                {parsedUrl.hash && (
                  <div className="grid grid-cols-[100px_1fr] border-b border-black/5 pb-2 dark:border-white/5">
                    <span className="text-gray-500">Hash</span>
                    <span className="font-mono">{parsedUrl.hash}</span>
                  </div>
                )}
              </div>
            </div>

            {Object.keys(parsedUrl.params).length > 0 && (
              <div className="p-4">
                <h3 className="mb-4 text-sm font-semibold">Query Parameters</h3>
                <div className="grid gap-2 text-sm">
                  {Object.entries(parsedUrl.params).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[120px_1fr] gap-4 border-b border-black/5 pb-2 dark:border-white/5">
                      <span className="font-medium text-primary">{key}</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : input ? (
          <p className="text-sm text-red-500">Invalid URL</p>
        ) : null}
      </div>
    </ToolContainer>
  );
}
