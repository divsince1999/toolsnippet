"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonFormatterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll, copyToClipboard, isCopied } = useTool();

  function formatJson() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  }

  function minifyJson() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  }

  return (
    <ToolContainer
      title="JSON Formatter"
      description="Format and validate JSON with instant error feedback."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste JSON here, e.g. {"name":"John"}'
          rows={10}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={formatJson}>Format JSON</Button>
          <Button variant="outline" onClick={minifyJson}>Minify JSON</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <div className="grid gap-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Output
            </label>
            <div className="relative">
              <pre className="overflow-x-auto rounded-lg border border-black/10 bg-black/[0.03] p-4 text-sm dark:border-white/10 dark:bg-white/[0.03]">
                {output}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-7 px-2 text-xs"
                onClick={() => copyToClipboard(output)}
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
