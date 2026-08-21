"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function jsonToXmlNode(val: unknown, tagName: string, indent = 2): string {
  const pad = " ".repeat(indent);

  if (val === null || val === undefined) {
    return `${pad}<${tagName}/>`;
  }

  if (typeof val === "boolean" || typeof val === "number" || typeof val === "string") {
    const escaped = String(val)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `${pad}<${tagName}>${escaped}</${tagName}>`;
  }

  if (Array.isArray(val)) {
    const itemTag = tagName.endsWith("s") && tagName.length > 1 ? tagName.slice(0, -1) : "item";
    const items = val.map((item) => jsonToXmlNode(item, itemTag, indent + 2)).join("\n");
    return `${pad}<${tagName}>\n${items}\n${pad}</${tagName}>`;
  }

  if (typeof val === "object") {
    const children = Object.entries(val as Record<string, unknown>)
      .map(([k, v]) => jsonToXmlNode(v, k, indent + 2))
      .join("\n");

    return `${pad}<${tagName}>\n${children}\n${pad}</${tagName}>`;
  }

  return "";
}

export default function JsonToXmlTool() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        catalog: {
          store: "TechHaven",
          products: [
            {
              id: "p1",
              name: "Wireless Headphones",
              price: 199.99,
              inStock: true,
            },
            {
              id: "p2",
              name: "Smart Watch V2",
              price: 249.5,
              inStock: false,
            },
          ],
        },
      },
      null,
      2
    )
  );
  const [rootTag, setRootTag] = useState("root");
  const [includeDeclaration, setIncludeDeclaration] = useState(true);

  const { xmlOutput, error } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { xmlOutput: "", error: "" };
      const parsed = JSON.parse(jsonInput);
      const decl = includeDeclaration ? `<?xml version="1.0" encoding="UTF-8"?>\n` : "";

      let xmlBody = "";
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) && Object.keys(parsed).length === 1) {
        const [singleRoot, rootVal] = Object.entries(parsed)[0];
        xmlBody = jsonToXmlNode(rootVal, singleRoot, 0);
      } else {
        xmlBody = jsonToXmlNode(parsed, rootTag || "root", 0);
      }

      return { xmlOutput: `${decl}${xmlBody}`, error: "" };
    } catch (err: unknown) {
      return { xmlOutput: "", error: err instanceof Error ? err.message : "Failed to convert JSON to XML" };
    }
  }, [jsonInput, rootTag, includeDeclaration]);

  return (
    <ToolContainer
      title="JSON to XML Converter"
      description="Convert structured JSON objects and arrays into clean, indented XML documents."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="JSON Input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={14}
            error={error}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Root Element Tag
              </label>
              <input
                type="text"
                value={rootTag}
                onChange={(e) => setRootTag(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={includeDeclaration}
                  onChange={(e) => setIncludeDeclaration(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Include XML Declaration</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated XML Output"
            readOnly
            copyable
            value={xmlOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
