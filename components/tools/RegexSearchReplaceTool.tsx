"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function RegexSearchReplaceTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [search, setSearch] = useState("");
  const [replace, setReplace] = useState("");
  const [flags, setFlags] = useState("g");

  const handleApply = () => {
    if (!input || !search) return;
    try {
      const regex = new RegExp(search, flags);
      const result = input.replace(regex, replace);
      setOutput(result);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Regex pattern");
    }
  };

  return (
    <ToolContainer title="Regex Search & Replace" description="Transform text using powerful regular expression patterns.">
      <div className="grid gap-6">
        <TextArea label="Source Text" value={input} onChange={(e) => setInput(e.target.value)} rows={8} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Search Pattern (Regex)</label>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="\d+" className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Replacement String</label>
            <input value={replace} onChange={e => setReplace(e.target.value)} placeholder="NUMBER" className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Flags</label>
            <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gim" className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApply}>Apply Replace</Button>
          <Button variant="ghost" onClick={() => { setSearch(""); setReplace(""); clearAll(); }}>Clear</Button>
        </div>
        {output && <TextArea label="Result" readOnly copyable value={output} rows={8} />}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
