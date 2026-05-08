"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function TextDiffCheckerTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const { output, setOutput } = useTool<any[]>();

  const computeDiff = () => {
    if (!text1.trim() && !text2.trim()) {
      setOutput(null);
      return;
    }
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const diff: any[] = [];
    
    const maxLines = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];
      
      if (line1 === line2) {
        diff.push({ type: "unchanged", value: line1 });
      } else {
        if (line1 !== undefined) diff.push({ type: "removed", value: line1 });
        if (line2 !== undefined) diff.push({ type: "added", value: line2 });
      }
    }
    setOutput(diff);
  };

  return (
    <ToolContainer title="Text Diff Checker" description="Compare two texts and see line-by-line differences.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Original Text</label>
          <TextArea 
            value={text1} 
            onChange={(e) => setText1(e.target.value)} 
            placeholder="Paste original text here..."
            rows={10}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Changed Text</label>
          <TextArea 
            value={text2} 
            onChange={(e) => setText2(e.target.value)} 
            placeholder="Paste changed text here..."
            rows={10}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Button onClick={computeDiff}>Compare Text</Button>
        <Button variant="ghost" onClick={() => { setText1(""); setText2(""); setOutput(null); }}>Clear</Button>
      </div>

      {output && (
        <div className="mt-8 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden font-mono text-sm bg-gray-50 dark:bg-black/20">
          <div className="bg-black/5 dark:bg-white/5 p-3 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
            <span className="font-bold">Difference Result</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Removed</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" /> Added</span>
            </div>
          </div>
          <div className="p-4 space-y-1 max-h-[500px] overflow-auto">
            {output.map((line: any, idx: number) => (
              <div 
                key={idx} 
                className={`p-1 px-2 rounded ${
                  line.type === "added" ? "bg-green-500/20 text-green-700 dark:text-green-400" :
                  line.type === "removed" ? "bg-red-500/20 text-red-700 dark:text-red-400" :
                  "opacity-50"
                }`}
              >
                <span className="inline-block w-4 mr-2 opacity-50">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                {line.value || " "}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolContainer>
  );
}
