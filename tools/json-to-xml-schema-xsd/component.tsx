"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

function inferXsdType(val: unknown): string {
  if (typeof val === "boolean") return "xs:boolean";
  if (typeof val === "number") return Number.isInteger(val) ? "xs:integer" : "xs:decimal";
  return "xs:string";
}

function generateXsdElements(obj: Record<string, unknown>, indent = "    "): string {
  const lines: string[] = [];

  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) {
      lines.push(`${indent}<xs:element name="${key}" type="xs:string" minOccurs="0" />`);
    } else if (Array.isArray(val)) {
      if (val.length > 0 && typeof val[0] === "object" && val[0] !== null) {
        lines.push(`${indent}<xs:element name="${key}" minOccurs="0" maxOccurs="unbounded">`);
        lines.push(`${indent}  <xs:complexType>`);
        lines.push(`${indent}    <xs:sequence>`);
        lines.push(generateXsdElements(val[0] as Record<string, unknown>, indent + "      "));
        lines.push(`${indent}    </xs:sequence>`);
        lines.push(`${indent}  </xs:complexType>`);
        lines.push(`${indent}</xs:element>`);
      } else {
        const itemType = val.length > 0 ? inferXsdType(val[0]) : "xs:string";
        lines.push(`${indent}<xs:element name="${key}" type="${itemType}" minOccurs="0" maxOccurs="unbounded" />`);
      }
    } else if (typeof val === "object" && val !== null) {
      lines.push(`${indent}<xs:element name="${key}">`);
      lines.push(`${indent}  <xs:complexType>`);
      lines.push(`${indent}    <xs:sequence>`);
      lines.push(generateXsdElements(val as Record<string, unknown>, indent + "      "));
      lines.push(`${indent}    </xs:sequence>`);
      lines.push(`${indent}  </xs:complexType>`);
      lines.push(`${indent}</xs:element>`);
    } else {
      lines.push(`${indent}<xs:element name="${key}" type="${inferXsdType(val)}" />`);
    }
  }

  return lines.join("\n");
}

export default function JsonToXmlSchemaXsd() {
  const [jsonText, setJsonText] = useState(`{\n  "customerId": 1024,\n  "name": "Jane Doe",\n  "active": true,\n  "balance": 450.75,\n  "address": {\n    "city": "San Francisco",\n    "zip": "94107"\n  },\n  "orders": [\n    { "orderId": 501, "item": "Keyboard", "price": 89.99 }\n  ]\n}`);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);

  const xsdOutput = useMemo(() => {
    if (!jsonText.trim()) return { output: "", error: "" };

    try {
      const parsed = JSON.parse(jsonText);
      const inner = generateXsdElements(parsed, "        ");
      const r = rootName.trim() || "Root";

      const xsd = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">
  <xs:element name="${r}">
    <xs:complexType>
      <xs:sequence>
${inner}
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

      return { output: xsd, error: "" };
    } catch (err: unknown) {
      return { output: "", error: err instanceof Error ? err.message : "Invalid JSON input" };
    }
  }, [jsonText, rootName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(xsdOutput.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="JSON to XML Schema (XSD) Generator"
      description="Generate standard W3C XML Schema Definition (XSD) documents from JSON objects and XML data."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Root Element Name:
            </label>
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3 py-2 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Input JSON Payload:
            </label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Generated W3C XML Schema (XSD):
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!xsdOutput.output}>
                {copied ? "Copied!" : "Copy XSD"}
              </Button>
            </div>
            {xsdOutput.error ? (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400 font-mono">
                {xsdOutput.error}
              </div>
            ) : (
              <textarea
                readOnly
                value={xsdOutput.output}
                rows={12}
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
