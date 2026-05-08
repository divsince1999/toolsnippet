"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlTableGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hasHeader, setHasHeader] = useState(true);

  const handleGenerate = () => {
    let html = '<table border="1">\n';
    if (hasHeader) {
      html += "  <thead>\n    <tr>\n";
      for (let j = 0; j < cols; j++) {
        html += `      <th>Header ${j + 1}</th>\n`;
      }
      html += "    </tr>\n  </thead>\n";
    }
    html += "  <tbody>\n";
    for (let i = 0; i < rows; i++) {
      html += "    <tr>\n";
      for (let j = 0; j < cols; j++) {
        html += `      <td>Data ${i + 1}-${j + 1}</td>\n`;
      }
      html += "    </tr>\n";
    }
    html += "  </tbody>\n</table>";
    setOutput(html);
  };

  return (
    <ToolContainer
      title="HTML Table Generator"
      description="Quickly generate HTML table markup with custom rows and columns."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Rows</label>
            <input type="number" min="1" max="50" value={rows} onChange={e => setRows(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Columns</label>
            <input type="number" min="1" max="20" value={cols} onChange={e => setCols(parseInt(e.target.value) || 1)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="header" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
            <label htmlFor="header" className="text-sm">Include Header</label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Table</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && (
          <div className="grid gap-4">
            <div className="p-4 border border-black/10 rounded-lg overflow-auto bg-white dark:bg-black/20 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: output }} />
            <TextArea label="HTML Code" readOnly copyable value={output} rows={10} />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
