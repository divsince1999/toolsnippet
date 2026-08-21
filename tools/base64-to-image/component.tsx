"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Base64ToImageTool() {
  const { input, setInput, clearAll } = useTool();
  const [downloadName, setDownloadName] = useState("decoded-image");

  const imageInfo = useMemo(() => {
    if (!input.trim()) return null;

    let clean = input.trim();
    let mime = "image/png";

    if (clean.startsWith("data:image/")) {
      const match = clean.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      if (match) {
        mime = match[1];
      }
    } else {
      // Auto-prefix data uri if user pasted raw base64
      clean = `data:image/png;base64,${clean}`;
    }

    const extension = mime.split("/")[1]?.replace("+xml", "") || "png";

    return {
      src: clean,
      mime,
      extension,
      sizeBytes: Math.round((clean.length * 3) / 4),
    };
  }, [input]);

  const handleDownload = () => {
    if (!imageInfo) return;

    const link = document.createElement("a");
    link.href = imageInfo.src;
    link.download = `${downloadName || "image"}.${imageInfo.extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ToolContainer
      title="Base64 to Image Decoder & Downloader"
      description="Convert Base64 data strings into viewable and downloadable PNG, JPEG, SVG, or WEBP images."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Base64 String or Data URI"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==..."
          rows={6}
        />

        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!input}>
            Clear
          </Button>
        </div>

        {imageInfo && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center rounded-xl border border-black/10 p-6 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageInfo.src}
                alt="Decoded base64 preview"
                className="max-h-80 max-w-full rounded-lg object-contain shadow-sm"
              />
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-gray-500">
                <span>Format: {imageInfo.mime}</span>
                <span>Estimated Size: ~{(imageInfo.sizeBytes / 1024).toFixed(1)} KB</span>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4 rounded-xl border border-black/10 p-4 dark:border-white/10">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                  Filename
                </label>
                <input
                  type="text"
                  value={downloadName}
                  onChange={(e) => setDownloadName(e.target.value)}
                  placeholder="image-name"
                  className="w-full rounded-md border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
                />
              </div>

              <Button onClick={handleDownload}>
                Download Image (.{imageInfo.extension})
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
