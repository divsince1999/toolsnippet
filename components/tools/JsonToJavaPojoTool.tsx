"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToJavaPojoTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    try {
      const json = JSON.parse(input);
      let java = "public class Root {\n";
      for (const key in json) {
        const val = json[key];
        let type = "Object";
        if (typeof val === "string") type = "String";
        else if (typeof val === "number") type = Number.isInteger(val) ? "int" : "double";
        else if (typeof val === "boolean") type = "boolean";
        
        java += `    private ${type} ${key};\n`;
      }
      java += "\n    // Getters and Setters...\n}";
      setOutput(java);
    } catch (e) {
      setOutput("Invalid JSON.");
    }
  };

  return (
    <ToolContainer title="JSON to Java POJO" description="Generate Java class definitions from JSON data.">
      <TextArea label="JSON Input" value={input} onChange={e => setInput(e.target.value)} rows={10} />
      <Button onClick={convert} className="mt-4">Convert to Java</Button>
      {output && <TextArea label="Java Class" value={output} readOnly className="mt-6" copyable rows={10} />}
    </ToolContainer>
  );
}
