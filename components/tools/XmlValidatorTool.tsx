"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function XmlValidatorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleValidate = () => {
    if (!input) return;
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");
      const errorNode = xmlDoc.querySelector("parsererror");
      if (errorNode) {
        setError(errorNode.textContent || "Invalid XML structure");
        setOutput("");
      } else {
        setOutput("✅ XML is valid and well-formed.");
        setError("");
      }
    } catch (err) {
      setError("Failed to parse XML");
      setOutput("");
    }
  };

  return (
    <ToolContainer title="XML Validator" description="Check if your XML data is valid and well-formed.">
      <div className="grid gap-6">
        <TextArea label="Input XML" value={input} onChange={(e) => setInput(e.target.value)} rows={12} />
        <div className="flex gap-2">
          <Button onClick={handleValidate}>Validate XML</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <p className="text-sm font-medium text-green-600 dark:text-green-400">{output}</p>}
        {error && <p className="text-sm font-medium text-red-600 dark:text-red-400">❌ {error}</p>}
      </div>
    </ToolContainer>
  );
}
