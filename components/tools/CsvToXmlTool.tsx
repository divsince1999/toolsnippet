"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CsvToXmlTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const lines = input.trim().split("\n");
    if (lines.length < 2) return;

    const headers = lines[0].split(",").map(h => h.trim().replace(/[^a-zA-Z0-9]/g, "_"));
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      xml += "  <row>\n";
      headers.forEach((header, j) => {
        xml += `    <${header}>${values[j]?.trim() || ""}</${header}>\n`;
      });
      xml += "  </row>\n";
    }
    xml += "</root>";
    setOutput(xml);
  };

  return (
    <ToolContainer title="CSV to XML Converter" description="Convert spreadsheet CSV data into structured XML format.">
      <div className="grid gap-6">
        <TextArea label="Input CSV" value={input} onChange={(e) => setInput(e.target.value)} placeholder="name,age\nJohn,30" rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to XML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="XML Output" readOnly copyable value={output} rows={12} />}
      </div>
    </ToolContainer>
  );
}
