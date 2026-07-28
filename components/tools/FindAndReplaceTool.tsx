"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function FindAndReplaceTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const replacedOutput = useMemo(() => {
    if (!input || !findText) return input || "";

    // Escape special regex characters in find string so it searches literally
    let escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    if (wholeWord) {
      escapedFind = `\\b${escapedFind}\\b`;
    }

    const flags = matchCase ? "g" : "gi";
    
    try {
      const regex = new RegExp(escapedFind, flags);
      return input.replace(regex, replaceText);
    } catch (e) {
      // Fallback in case of regex error
      return input;
    }
  }, [input, findText, replaceText, matchCase, wholeWord]);

  return (
    <ToolContainer
      title="Find and Replace"
      description="Find and replace text with case sensitivity and whole word options."
      maxWidth="5xl"
    >
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <div>
          <label className="block text-sm font-medium mb-1">Find</label>
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Text to find..."
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Replace With</label>
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replacement text..."
            className="w-full rounded-md border border-black/20 dark:border-white/20 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Match Case
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Match Whole Word
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Text</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            rows={12}
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Replaced Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(replacedOutput)}
              disabled={!replacedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={replacedOutput} readOnly rows={12} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input && !findText && !replaceText}>
          Clear All
        </Button>
      </div>
    </ToolContainer>
  );
}
