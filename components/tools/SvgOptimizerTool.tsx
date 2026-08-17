"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SvgOptimizerTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const optimizeSvg = () => {
    try {
      if (!input.trim()) return;

      let clean = input.trim();
      if (!clean.includes("<svg")) {
        throw new Error("Input must contain valid <svg> markup.");
      }

      // Remove XML header, doctype, comments
      clean = clean
        .replace(/<\?xml[\s\S]*?\?>/gi, "")
        .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

      // Remove Sketch, Figma, Inkscape, Illustrator metadata & namespaces
      clean = clean
        .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
        .replace(/<defs>[\s\S]*?<\/defs>/gi, (match) => (match.trim() === "<defs></defs>" ? "" : match))
        .replace(/\s*xmlns:sketch="[^"]*"/gi, "")
        .replace(/\s*xmlns:inkscape="[^"]*"/gi, "")
        .replace(/\s*xmlns:sodipodi="[^"]*"/gi, "")
        .replace(/\s*xmlns:serif="[^"]*"/gi, "")
        .replace(/\s*data-name="[^"]*"/gi, "")
        .replace(/\s*id="(?:Layer|svg|path)[^"]*"/gi, "");

      // Collapse whitespace between tags
      clean = clean
        .replace(/>\s+</g, "><")
        .replace(/\s{2,}/g, " ")
        .trim();

      setOutput(clean);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to optimize SVG.");
    }
  };

  const rawBytes = input ? new Blob([input]).size : 0;
  const optBytes = output ? new Blob([output]).size : 0;
  const savings = rawBytes > 0 && optBytes > 0 ? Math.round(((rawBytes - optBytes) / rawBytes) * 100) : 0;

  return (
    <ToolContainer
      title="SVG Code Minifier & Optimizer"
      description="Minify and clean SVG code by stripping XML headers, editor metadata, and redundant tags."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Raw SVG"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator -->\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />\n</svg>`}
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button onClick={optimizeSvg}>Minify & Optimize SVG</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>

          {output && (
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
              Original: <span className="font-bold">{rawBytes} B</span> → Minified:{" "}
              <span className="font-bold text-green-600 dark:text-green-400">{optBytes} B</span> ({savings}% saved)
            </div>
          )}
        </div>

        {output && (
          <div className="space-y-6">
            <TextArea
              label="Optimized SVG Output"
              readOnly
              copyable
              value={output}
              rows={6}
            />

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                SVG Render Preview
              </label>
              <div
                className="flex min-h-[140px] max-h-64 w-full items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02] [&_svg]:max-h-52 [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:w-auto"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
