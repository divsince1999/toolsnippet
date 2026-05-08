"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SitemapGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;

    const urls = input.split("\n").map(u => u.trim()).filter(u => u.length > 0);
    const date = new Date().toISOString().split("T")[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      xml += "  <url>\n";
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${date}</lastmod>\n`;
      xml += "    <changefreq>monthly</changefreq>\n";
      xml += "    <priority>0.8</priority>\n";
      xml += "  </url>\n";
    });

    xml += "</urlset>";
    setOutput(xml);
  };

  return (
    <ToolContainer
      title="Sitemap Generator"
      description="Create a valid XML sitemap from a list of website URLs."
    >
      <div className="grid gap-6">
        <TextArea
          label="URL List (one per line)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/\nhttps://example.com/about"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Sitemap</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="XML Sitemap"
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
      </div>
    </ToolContainer>
  );
}
