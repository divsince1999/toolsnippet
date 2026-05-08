"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToXmlConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    try {
      const json = JSON.parse(input);
      const toXml = (obj: any, rootName: string = "root"): string => {
        let xml = `<${rootName}>`;
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            const cleanKey = key.replace(/[^a-zA-Z0-9]/g, "_");
            if (typeof val === "object" && val !== null) {
              xml += toXml(val, cleanKey);
            } else {
              xml += `<${cleanKey}>${val}</${cleanKey}>`;
            }
          }
        }
        xml += `</${rootName}>`;
        return xml;
      };
      setOutput(toXml(json));
    } catch (e) {
      setOutput("Invalid JSON input.");
    }
  };

  return (
    <ToolContainer title="JSON to XML Converter" description="Convert JSON objects to structured XML documents.">
      <TextArea
        label="JSON Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{ "name": "John", "age": 30 }'
        rows={10}
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={convert}>Convert to XML</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <TextArea
          label="XML Output"
          value={output}
          readOnly
          className="mt-6"
          copyable
          rows={10}
        />
      )}
    </ToolContainer>
  );
}
