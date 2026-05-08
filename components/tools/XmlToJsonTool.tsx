"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function XmlToJsonTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");
      
      const errorNode = xmlDoc.querySelector("parsererror");
      if (errorNode) throw new Error("Invalid XML structure");

      const json = xmlToJson(xmlDoc.documentElement);
      setOutput(JSON.stringify(json, null, 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert XML");
    }
  };

  const xmlToJson = (node: Element): any => {
    const obj: any = {};

    if (node.hasAttributes()) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes.item(i);
        if (attr) obj[`@${attr.nodeName}`] = attr.nodeValue;
      }
    }

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const item = node.childNodes.item(i);
        if (item.nodeType === 1) { // Element
          const nodeName = item.nodeName;
          const child = xmlToJson(item as Element);
          
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(child);
          } else {
            obj[nodeName] = child;
          }
        } else if (item.nodeType === 3) { // Text
          const text = item.nodeValue?.trim();
          if (text) return text;
        }
      }
    }

    return Object.keys(obj).length === 0 ? "" : obj;
  };

  return (
    <ToolContainer
      title="XML to JSON"
      description="Convert complex XML data to modern JSON format instantly."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input XML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<root><item id='1'>Value</item></root>"
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="JSON Output"
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
