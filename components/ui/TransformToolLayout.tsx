"use client";

import { ReactNode } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export type TransformAction = {
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  transform?: (input: string) => string;
  onClick?: () => void;
};

interface TransformToolLayoutProps {
  title: string;
  description?: string;
  inputLabel?: string;
  outputLabel?: string;
  placeholder?: string;
  actions?: TransformAction[];
  optionsSlot?: ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl";
  showStats?: boolean;
}

export default function TransformToolLayout({
  title,
  description,
  inputLabel = "Input",
  outputLabel = "Output",
  placeholder = "Paste or type here...",
  actions = [],
  optionsSlot,
  maxWidth = "6xl",
  showStats = true,
}: TransformToolLayoutProps) {
  const { input, setInput, output, setOutput, error, setError, clearAll, stats } = useTool();

  const handleAction = (action: TransformAction) => {
    if (action.onClick) {
      action.onClick();
      return;
    }

    if (action.transform) {
      try {
        const result = action.transform(input);
        setOutput(result);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred during transformation");
      }
    }
  };

  return (
    <ToolContainer title={title} description={description} maxWidth={maxWidth}>
      <div className="grid gap-6">
        <div>
          <TextArea
            label={inputLabel}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={8}
            error={error}
          />
          {showStats && input && (
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>Characters: {stats.characters}</span>
              <span>Words: {stats.words}</span>
              <span>Lines: {stats.lines}</span>
            </div>
          )}
        </div>

        {optionsSlot && (
          <div className="rounded-lg border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
            {optionsSlot}
          </div>
        )}

        {actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || (idx === 0 ? "primary" : "outline")}
                onClick={() => handleAction(action)}
                disabled={!input}
              >
                {action.label}
              </Button>
            ))}
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        )}

        {output && (
          <TextArea
            label={outputLabel}
            readOnly
            copyable
            value={output}
            rows={8}
          />
        )}
      </div>
    </ToolContainer>
  );
}
