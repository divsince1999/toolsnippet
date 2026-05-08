"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToXmlTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' + jsonToXml(parsed, 1) + "</root>";
      setOutput(xml);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const jsonToXml = (obj: any, indent: number): string => {
    let xml = "";
    const spaces = "  ".repeat(indent);

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => {
            xml += `${spaces}<${key}>\n${jsonToXml(item, indent + 1)}${spaces}</${key}>\n`;
          });
        } else {
          xml += `${spaces}<${key}>\n${jsonToXml(value, indent + 1)}${spaces}</${key}>\n`;
        }
      } else {
        xml += `${spaces}<${key}>${value}</${key}>\n`;
      }
    }

    return xml;
  };

  return (
    <ToolContainer
      title="JSON to XML"
      description="Convert modern JSON objects to structured XML format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"id": 1, "name": "Item"}'
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to XML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="XML Output"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
