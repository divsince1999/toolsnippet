"use client";

import { useState, useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function WhitespaceRemoverTool() {
  const { input, setInput, clearAll, copyToClipboard, isCopied } = useTool();
  const [removeSpaces, setRemoveSpaces] = useState(true);
  const [removeTabs, setRemoveTabs] = useState(true);
  const [removeNewlines, setRemoveNewlines] = useState(false);

  const cleanedOutput = useMemo(() => {
    if (!input) return "";

    let result = input;
    
    if (removeSpaces) {
      result = result.replace(/ /g, "");
    }
    
    if (removeTabs) {
      result = result.replace(/\t/g, "");
    }
    
    if (removeNewlines) {
      result = result.replace(/\r?\n|\r/g, "");
    }

    return result;
  }, [input, removeSpaces, removeTabs, removeNewlines]);

  return (
    <ToolContainer
      title="Whitespace Remover"
      description="Remove all spaces, tabs, or newlines from text."
      maxWidth="5xl"
    >
      <div className="mb-4 flex flex-wrap gap-4 p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input
            type="checkbox"
            checked={removeSpaces}
            onChange={(e) => setRemoveSpaces(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Remove Spaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input
            type="checkbox"
            checked={removeTabs}
            onChange={(e) => setRemoveTabs(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Remove Tabs
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          <input
            type="checkbox"
            checked={removeNewlines}
            onChange={(e) => setRemoveNewlines(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          Remove Newlines
        </label>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => {
            setRemoveSpaces(true);
            setRemoveTabs(true);
            setRemoveNewlines(true);
          }}
          className="ml-auto"
        >
          Select All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Input Text</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text here..."
            rows={12}
          />
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium">
            <span>Cleaned Output</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(cleanedOutput)}
              disabled={!cleanedOutput}
            >
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </label>
          <TextArea value={cleanedOutput} readOnly rows={12} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" onClick={clearAll} disabled={!input}>
          Clear Input
        </Button>
      </div>
    </ToolContainer>
  );
}
