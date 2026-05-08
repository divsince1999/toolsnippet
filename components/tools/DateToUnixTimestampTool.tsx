"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DateToUnixTimestampTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      setOutput("Invalid date");
      return;
    }
    setOutput(Math.floor(date.getTime() / 1000).toString());
  };

  return (
    <ToolContainer title="Date to Unix Timestamp" description="Convert human dates to Unix timestamps.">
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Date and Time</label>
          <input type="datetime-local" value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Unix Timestamp" readOnly copyable value={output} rows={1} />}
      </div>
    </ToolContainer>
  );
}
