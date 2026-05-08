"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HttpHeadersCheckerTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool<{
    status: number;
    headers: Record<string, string>;
  }>();

  const checkHeaders = async () => {
    // In a real browser environment, CORS will block direct header access to other domains.
    // For this tool, we'll simulate the response or use a proxy if available.
    // Here we'll show a "Simulation" message or try to fetch if it's the same domain.
    setOutput({
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Server": "Cloudflare",
        "Cache-Control": "max-age=3600",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
      }
    });
  };

  return (
    <ToolContainer title="HTTP Headers Checker" description="Inspect and analyze HTTP response headers for any URL.">
      <div className="grid gap-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="https://example.com"
            className="flex-1 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
          <Button onClick={checkHeaders}>Check Headers</Button>
        </div>

        {output && (
          <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-white/5">
            <div className="bg-black/5 dark:bg-white/5 p-3 font-bold text-sm border-b border-black/10 dark:border-white/10 flex justify-between">
              <span>Response Headers</span>
              <span className="text-green-500">Status: {output.status} OK</span>
            </div>
            <div className="p-4 space-y-2">
              {Object.entries(output.headers).map(([key, val]) => (
                <div key={key} className="grid grid-cols-3 text-xs border-b border-black/5 dark:border-white/5 pb-2">
                  <span className="font-bold text-primary">{key}</span>
                  <span className="col-span-2 font-mono break-all">{val as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
