"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function xmlNodeToJson(node: Node): unknown {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    return text || null;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    const obj: Record<string, unknown> = {};

    if (element.attributes.length > 0) {
      const attrs: Record<string, string> = {};
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        attrs[attr.name] = attr.value;
      }
      obj["@attributes"] = attrs;
    }

    const childMap: Record<string, unknown[]> = {};
    let hasElementChildren = false;

    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        hasElementChildren = true;
        const tag = (child as Element).tagName;
        const childJson = xmlNodeToJson(child);
        if (!childMap[tag]) childMap[tag] = [];
        childMap[tag].push(childJson);
      }
    });

    if (hasElementChildren) {
      Object.entries(childMap).forEach(([tag, list]) => {
        obj[tag] = list.length === 1 ? list[0] : list;
      });
      return obj;
    } else {
      const textContent = element.textContent?.trim();
      if (Object.keys(obj).length === 0) {
        if (textContent === "true") return true;
        if (textContent === "false") return false;
        if (textContent && !isNaN(Number(textContent))) return Number(textContent);
        return textContent || "";
      } else {
        if (textContent) obj["#text"] = textContent;
        return obj;
      }
    }
  }

  return null;
}

export default function XmlToJsonTool() {
  const [xmlInput, setXmlInput] = useState(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<library name="City Central">\n` +
    `  <book id="bk101" category="programming">\n` +
    `    <title>Learning TypeScript 5</title>\n` +
    `    <author>Josh Goldberg</author>\n` +
    `    <price>49.99</price>\n` +
    `    <inStock>true</inStock>\n` +
    `  </book>\n` +
    `  <book id="bk102" category="architecture">\n` +
    `    <title>Designing Data-Intensive Applications</title>\n` +
    `    <author>Martin Kleppmann</author>\n` +
    `    <price>59.90</price>\n` +
    `    <inStock>true</inStock>\n` +
    `  </book>\n` +
    `</library>`
  );

  const { jsonOutput, error } = useMemo(() => {
    try {
      if (!xmlInput.trim()) return { jsonOutput: "", error: "" };
      if (typeof window === "undefined") return { jsonOutput: "", error: "" };

      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlInput, "text/xml");

      const parserError = doc.querySelector("parsererror");
      if (parserError) {
        throw new Error(parserError.textContent || "XML Parsing Error");
      }

      const root = doc.documentElement;
      const result: Record<string, unknown> = {
        [root.tagName]: xmlNodeToJson(root),
      };

      return { jsonOutput: JSON.stringify(result, null, 2), error: "" };
    } catch (err: unknown) {
      return { jsonOutput: "", error: err instanceof Error ? err.message : "Failed to convert XML to JSON" };
    }
  }, [xmlInput]);

  return (
    <ToolContainer
      title="XML to JSON Converter"
      description="Parse XML documents and elements into clean, structured JSON objects with attribute preservation."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="XML Document Input"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            rows={15}
            error={error}
          />
        </div>

        <div className="space-y-4">
          <TextArea
            label="Converted JSON Output"
            readOnly
            copyable
            value={jsonOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
