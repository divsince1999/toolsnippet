"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonToCsharpTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    try {
      const json = JSON.parse(input);
      let cs = "public class Root {\n";
      for (const key in json) {
        const val = json[key];
        let type = "object";
        if (typeof val === "string") type = "string";
        else if (typeof val === "number") type = Number.isInteger(val) ? "int" : "double";
        else if (typeof val === "boolean") type = "bool";
        
        cs += `    public ${type} ${key} { get; set; }\n`;
      }
      cs += "}";
      setOutput(cs);
    } catch (e) {
      setOutput("Invalid JSON.");
    }
  };

  return (
    <ToolContainer title="JSON to C# Class" description="Generate C# class definitions from JSON data.">
      <TextArea label="JSON Input" value={input} onChange={e => setInput(e.target.value)} rows={10} />
      <Button onClick={convert} className="mt-4">Convert to C#</Button>
      {output && <TextArea label="C# Class" value={output} readOnly className="mt-6" copyable rows={10} />}
    </ToolContainer>
  );
}
