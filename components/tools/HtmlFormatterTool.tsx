"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtmlFormatterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const formatHtml = () => {
    try {
      if (!input) return;
      
      let formatted = "";
      let indent = 0;
      const tab = "  ";
      
      // Basic HTML formatter using regex
      const tokens = input.split(/(<[^>]+>)/g).filter(t => t.trim().length > 0);
      
      tokens.forEach(token => {
        if (token.startsWith("</")) {
          indent--;
          formatted += tab.repeat(Math.max(0, indent)) + token + "\n";
        } else if (token.startsWith("<") && !token.endsWith("/>") && !token.startsWith("<!") && !token.startsWith("<?")) {
          // Check if it's a void element
          const isVoid = /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i.test(token);
          formatted += tab.repeat(Math.max(0, indent)) + token + "\n";
          if (!isVoid) indent++;
        } else {
          formatted += tab.repeat(Math.max(0, indent)) + token.trim() + "\n";
        }
      });

      setOutput(formatted.trim());
      setError("");
    } catch (err) {
      setError("Failed to format HTML");
    }
  };

  return (
    <ToolContainer
      title="HTML Formatter"
      description="Beautify your HTML code with proper indentation and structure."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input HTML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<div><p>Hello World</p></div>..."
          rows={10}
        />

        <div className="flex gap-2">
          <Button onClick={formatHtml}>Format HTML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Formatted HTML"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
