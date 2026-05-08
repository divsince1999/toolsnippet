"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Base64ToImageTool() {
  const { input, setInput, clearAll } = useTool();

  return (
    <ToolContainer
      title="Base64 to Image"
      description="Decode Base64 strings back into previewable and downloadable images."
    >
      <div className="grid gap-6">
        <TextArea
          label="Base64 Data URI"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="data:image/png;base64,..."
          rows={10}
        />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {input && input.startsWith("data:image") && (
          <div className="flex flex-col items-center gap-4 p-6 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl border border-black/10 dark:border-white/10">
            <img 
              src={input} 
              alt="Base64 Preview" 
              className="max-h-[400px] rounded-lg shadow-lg border border-white"
            />
            <a 
              href={input} 
              download="base64-image" 
              className="text-sm font-medium text-primary hover:underline"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
