"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PrefixSuffixAdderTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const handleApply = () => {
    if (!input) return;
    const lines = input.split("\n");
    const result = lines.map(line => `${prefix}${line}${suffix}`).join("\n");
    setOutput(result);
  };

  return (
    <ToolContainer title="Prefix/Suffix Adder" description="Batch add text to the beginning or end of each line in a list.">
      <div className="grid gap-6">
        <TextArea label="Input List" value={input} onChange={(e) => setInput(e.target.value)} placeholder="item1\nitem2" rows={8} />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Prefix</label>
            <input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="https://" className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Suffix</label>
            <input value={suffix} onChange={e => setSuffix(e.target.value)} placeholder=".com" className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApply}>Apply to All Lines</Button>
          <Button variant="ghost" onClick={() => { setPrefix(""); setSuffix(""); clearAll(); }}>Clear</Button>
        </div>
        {output && <TextArea label="Result" readOnly copyable value={output} rows={10} />}
      </div>
    </ToolContainer>
  );
}
