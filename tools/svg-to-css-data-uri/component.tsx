"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SvgToCssDataUriTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const convertSvg = () => {
    try {
      if (!input.trim()) return;

      let clean = input.trim();
      if (!clean.includes("<svg")) {
        throw new Error("Input must contain valid <svg> code.");
      }

      // Add xmlns if missing
      if (!clean.includes("xmlns=")) {
        clean = clean.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Robust URL encoding for SVG data URIs
      const uriContent = encodeURIComponent(clean)
        .replace(/%20/g, " ")
        .replace(/%3D/g, "=")
        .replace(/%3A/g, ":")
        .replace(/%2F/g, "/")
        .replace(/%22/g, "'");

      const css = `background-image: url("data:image/svg+xml,${uriContent}");`;
      setOutput(css);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to convert SVG to Data URI.");
    }
  };

  const dataUri = output ? output.replace(/^background-image:\s*/, "").replace(/;$/, "") : "";

  return (
    <ToolContainer
      title="SVG to CSS Data URI Generator"
      description="Convert SVG code into optimized, URL-encoded CSS background-image Data URIs."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input SVG Code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />\n</svg>`}
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={convertSvg}>Generate CSS Data URI</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-6">
            <TextArea
              label="CSS Background Code"
              readOnly
              copyable
              value={output}
              rows={4}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                  Single Centered Preview
                </label>
                <div
                  className="h-40 w-full rounded-xl border border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.04]"
                  style={{
                    backgroundImage: dataUri,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
                  Repeating Pattern Preview
                </label>
                <div
                  className="h-40 w-full rounded-xl border border-black/10 bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.04]"
                  style={{
                    backgroundImage: dataUri,
                    backgroundRepeat: "repeat",
                    backgroundSize: "64px 64px",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
