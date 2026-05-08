"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MarkdownValidatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool<{
    valid: boolean;
    errors: string[];
  }>();

  const validate = () => {
    const errors: string[] = [];
    if (!input.includes("# ")) errors.push("Missing H1 title.");
    if (input.includes("<script")) errors.push("Dangerous script tags detected.");
    
    const links = input.match(/\[(.*?)\]\((.*?)\)/g);
    if (links) {
      links.forEach(link => {
        if (!link.includes("http")) errors.push(`Suspicious link: ${link}`);
      });
    }

    setOutput({
      valid: errors.length === 0,
      errors: errors
    });
  };

  return (
    <ToolContainer title="Markdown Validator" description="Check your Markdown for common syntax and formatting errors.">
      <TextArea
        label="Markdown Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="# Title\n\nContent here..."
        rows={12}
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={validate}>Validate Markdown</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <div className={`mt-6 p-6 rounded-xl border ${output.valid ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
          <div className="font-bold text-lg mb-2">{output.valid ? "✅ Perfect Markdown!" : "❌ Linting Issues Found"}</div>
          {output.errors.length > 0 && (
            <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
              {output.errors.map((err: string, i: number) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>
      )}
    </ToolContainer>
  );
}
