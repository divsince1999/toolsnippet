"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function Base64ToPdfConverterTool() {
  const { input, setInput, clearAll } = useTool();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const convert = () => {
    try {
      const base64 = input.replace(/^data:application\/pdf;base64,/, "");
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (e) {
      alert("Invalid Base64 string.");
    }
  };

  return (
    <ToolContainer title="Base64 to PDF Converter" description="Decode Base64 strings back into PDF files.">
      <div className="grid gap-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Base64 PDF string here..."
          className="w-full h-48 rounded-lg border border-black/15 bg-transparent p-3 text-sm font-mono outline-none dark:border-white/20"
        />
        <div className="flex gap-2">
          <Button onClick={convert}>Convert to PDF</Button>
          <Button variant="ghost" onClick={() => { setPdfUrl(null); clearAll(); }}>Clear</Button>
        </div>
        
        {pdfUrl && (
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
            <div className="text-4xl">📄</div>
            <div className="font-bold">PDF Ready</div>
            <div className="flex gap-2">
              <Button as="a" href={pdfUrl} target="_blank">Preview PDF</Button>
              <Button as="a" href={pdfUrl} download="restored.pdf" variant="secondary">Download PDF</Button>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
