"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UnixTimestampConverterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const timestamp = parseInt(input);
    if (isNaN(timestamp)) {
      setOutput("Invalid timestamp");
      return;
    }
    const date = new Date(timestamp * (input.length > 10 ? 1 : 1000));
    setOutput(date.toUTCString() + "\n" + date.toLocaleString());
  };

  return (
    <ToolContainer title="Unix Timestamp Converter" description="Convert Unix timestamps to readable dates.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Unix Timestamp</label>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" placeholder="1714312800" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Readable Date" readOnly copyable value={output} rows={3} />}
      </div>
    </ToolContainer>
  );
}
