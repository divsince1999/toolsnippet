"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UrlSlugGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const slug = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setOutput(slug);
  };

  return (
    <ToolContainer title="URL Slug Generator" description="Convert titles into SEO-friendly URL slugs.">
      <div className="grid gap-6">
        <TextArea label="Title Input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a title..." rows={2} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate Slug</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="URL Slug" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
