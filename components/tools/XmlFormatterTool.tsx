"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function XmlFormatterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const formatXml = () => {
    try {
      if (!input) return;
      
      let formatted = "";
      let indent = 0;
      const tab = "  ";
      
      // Basic XML formatter
      const tokens = input.replace(/>\s*</g, "><").split(/(<[^>]+>)/g).filter(t => t.trim().length > 0);
      
      tokens.forEach(token => {
        if (token.startsWith("</")) {
          indent--;
          formatted += tab.repeat(Math.max(0, indent)) + token + "\n";
        } else if (token.startsWith("<") && !token.endsWith("/>") && !token.startsWith("<!") && !token.startsWith("<?")) {
          formatted += tab.repeat(Math.max(0, indent)) + token + "\n";
          indent++;
        } else {
          formatted += tab.repeat(Math.max(0, indent)) + token.trim() + "\n";
        }
      });

      setOutput(formatted.trim());
      setError("");
    } catch (err) {
      setError("Failed to format XML");
    }
  };

  return (
    <ToolContainer
      title="XML Formatter"
      description="Prettify messy XML strings with proper indentation."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input XML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<root><child>data</child></root>..."
          rows={10}
        />

        <div className="flex gap-2">
          <Button onClick={formatXml}>Format XML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Formatted XML"
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
