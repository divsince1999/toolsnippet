"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SvgToJsxTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [componentName, setComponentName] = useState("Icon");
  const [useTypescript, setUseTypescript] = useState(true);

  const convertSvgToJsx = () => {
    try {
      if (!input.trim()) return;

      let clean = input.trim();

      // Remove XML declaration and comments
      clean = clean
        .replace(/<\?xml[\s\S]*?\?>/gi, "")
        .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

      // Replace class with className
      clean = clean.replace(/\bclass=/g, "className=");

      // Attribute transformations map
      const attrMap: Record<string, string> = {
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-linejoin": "strokeLinejoin",
        "stroke-miterlimit": "strokeMiterlimit",
        "stroke-dasharray": "strokeDasharray",
        "stroke-dashoffset": "strokeDashoffset",
        "stroke-opacity": "strokeOpacity",
        "fill-rule": "fillRule",
        "fill-opacity": "fillOpacity",
        "clip-rule": "clipRule",
        "clip-path": "clipPath",
        "stop-color": "stopColor",
        "stop-opacity": "stopOpacity",
        "font-family": "fontFamily",
        "font-size": "fontSize",
        "font-weight": "fontWeight",
        "text-anchor": "textAnchor",
        "xmlns:xlink": "xmlnsXlink",
        "xlink:href": "xlinkHref",
      };

      for (const [kebab, camel] of Object.entries(attrMap)) {
        const regex = new RegExp(`\\b${kebab}=`, "g");
        clean = clean.replace(regex, `${camel}=`);
      }

      // Format as React Component
      const name = componentName.trim() || "Icon";
      let code = "";

      if (useTypescript) {
        code = `import { SVGProps } from "react";\n\n`;
        code += `export default function ${name}(props: SVGProps<SVGSVGElement>) {\n`;
        code += `  return (\n`;
        code += `    ${clean.replace(/\n/g, "\n    ")}\n`;
        code += `  );\n`;
        code += `}\n`;
      } else {
        code = `export default function ${name}(props) {\n`;
        code += `  return (\n`;
        code += `    ${clean.replace(/\n/g, "\n    ")}\n`;
        code += `  );\n`;
        code += `}\n`;
      }

      setOutput(code);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to convert SVG to JSX.");
    }
  };

  return (
    <ToolContainer
      title="SVG to React JSX Converter"
      description="Convert SVG code into clean React and React Native JSX components with camelCase attributes."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Raw SVG"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <circle cx="12" cy="12" r="10"/>\n  <polyline points="12 6 12 12 14 14"/>\n</svg>`}
          rows={8}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div>
              <label className="text-xs font-medium text-gray-500 mr-2">Component Name:</label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                placeholder="IconName"
                className="w-32 rounded border border-black/15 bg-transparent px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
              />
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={useTypescript}
                onChange={(e) => setUseTypescript(e.target.checked)}
                className="rounded border-gray-300 text-primary"
              />
              <span>TypeScript (SVGProps)</span>
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertSvgToJsx}>Convert to JSX Component</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label="Generated React Component"
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
