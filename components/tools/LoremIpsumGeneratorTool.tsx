"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const LOREM_TEXT = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGeneratorTool() {
  const { output, setOutput, clearAll } = useTool();
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");

  const generateLorem = () => {
    let result = "";
    if (type === "words") {
      result = Array.from({ length: count }, () => 
        LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]
      ).join(" ");
    } else if (type === "sentences") {
      result = Array.from({ length: count }, () => {
        const len = 5 + Math.floor(Math.random() * 10);
        const sentence = Array.from({ length: len }, () => 
          LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]
        ).join(" ");
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
      }).join(" ");
    } else {
      result = Array.from({ length: count }, () => {
        const sentenceCount = 3 + Math.floor(Math.random() * 4);
        return Array.from({ length: sentenceCount }, () => {
          const len = 5 + Math.floor(Math.random() * 10);
          const sentence = Array.from({ length: len }, () => 
            LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]
          ).join(" ");
          return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
        }).join(" ");
      }).join("\n\n");
    }
    setOutput(result);
  };

  return (
    <ToolContainer
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and layouts."
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-32 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-40 rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateLorem}>Generate Lorem Ipsum</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Generated Text"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
      </div>
    </ToolContainer>
  );
}
