"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToTypescriptTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      const parsed = JSON.parse(input);
      const interfaces = generateInterfaces(parsed, "RootObject");
      setOutput(interfaces);
      setError("");
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const generateInterfaces = (obj: any, interfaceName: string): string => {
    let result = `export interface ${interfaceName} {\n`;
    const nested: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const type = typeof value;
      if (value === null) {
        result += `  ${key}: null;\n`;
      } else if (Array.isArray(value)) {
        const firstItem = value[0];
        const itemType = typeof firstItem;
        if (itemType === "object" && firstItem !== null) {
          const subName = key.charAt(0).toUpperCase() + key.slice(1) + "Item";
          result += `  ${key}: ${subName}[];\n`;
          nested.push(generateInterfaces(firstItem, subName));
        } else {
          result += `  ${key}: ${itemType}[];\n`;
        }
      } else if (type === "object") {
        const subName = key.charAt(0).toUpperCase() + key.slice(1);
        result += `  ${key}: ${subName};\n`;
        nested.push(generateInterfaces(value, subName));
      } else {
        result += `  ${key}: ${type};\n`;
      }
    }

    result += "}\n\n";
    return result + nested.join("");
  };

  return (
    <ToolContainer
      title="JSON to TypeScript"
      description="Convert JSON objects to clean TypeScript interfaces instantly."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"id": 1, "name": "User"}...'
          rows={10}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to TypeScript</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="TypeScript Interfaces"
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
