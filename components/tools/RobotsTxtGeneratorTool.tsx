"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RobotsTxtGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [sitemap, setSitemap] = useState("");
  const [allow, setAllow] = useState("/");
  const [disallow, setDisallow] = useState("/admin\n/private");

  const handleConvert = () => {
    let result = "User-agent: *\n";
    
    if (allow) {
      allow.split("\n").forEach(path => {
        if (path.trim()) result += `Allow: ${path.trim()}\n`;
      });
    }

    if (disallow) {
      disallow.split("\n").forEach(path => {
        if (path.trim()) result += `Disallow: ${path.trim()}\n`;
      });
    }

    if (sitemap) {
      result += `\nSitemap: ${sitemap.trim()}\n`;
    }

    setOutput(result.trim());
  };

  return (
    <ToolContainer
      title="Robots.txt Generator"
      description="Control how search engines crawl your site with a custom robots.txt."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea
            label="Allowed Paths"
            value={allow}
            onChange={(e) => setAllow(e.target.value)}
            placeholder="/"
            rows={4}
          />
          <TextArea
            label="Disallowed Paths"
            value={disallow}
            onChange={(e) => setDisallow(e.target.value)}
            placeholder="/admin"
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Sitemap URL (Optional)</label>
          <input
            type="text"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Robots.txt</Button>
          <Button variant="ghost" onClick={() => { setSitemap(""); setAllow("/"); setDisallow(""); clearAll(); }}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Generated Robots.txt"
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
