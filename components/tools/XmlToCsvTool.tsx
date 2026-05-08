"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function XmlToCsvTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");
      const rows = Array.from(xmlDoc.querySelectorAll("row, item, record"));
      
      if (rows.length === 0) {
        setError("No repeatable elements (row, item, record) found.");
        return;
      }

      const headers = Array.from(rows[0].children).map(c => c.nodeName);
      let csv = headers.join(",") + "\n";

      rows.forEach(row => {
        const values = headers.map(h => {
          const node = row.querySelector(h);
          return node ? `"${node.textContent}"` : '""';
        });
        csv += values.join(",") + "\n";
      });

      setOutput(csv.trim());
      setError("");
    } catch (err) {
      setError("Failed to parse XML for CSV conversion.");
    }
  };

  return (
    <ToolContainer title="XML to CSV Converter" description="Extract structured data from XML into flat CSV format.">
      <div className="grid gap-6">
        <TextArea label="Input XML" value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><row><name>John</name></row></root>" rows={10} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to CSV</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="CSV Output" readOnly copyable value={output} rows={10} />}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
