"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SqlToTypescriptTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const convert = () => {
    // Simple regex to extract table name and columns from CREATE TABLE
    const tableNameMatch = input.match(/CREATE TABLE (\w+)/i);
    const tableName = tableNameMatch ? tableNameMatch[1] : "ITable";
    
    const columns = input.match(/(\w+)\s+(INT|VARCHAR|TEXT|BOOLEAN|TIMESTAMP|DATE|DATETIME|FLOAT|DOUBLE)/gi);
    
    if (!columns) {
      setOutput("Could not parse SQL. Please use CREATE TABLE syntax.");
      return;
    }

    let ts = `interface ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} {\n`;
    columns.forEach(col => {
      const parts = col.split(/\s+/);
      const name = parts[0];
      const type = parts[1].toUpperCase();
      
      let tsType = "any";
      if (["INT", "FLOAT", "DOUBLE"].includes(type)) tsType = "number";
      else if (["VARCHAR", "TEXT", "TIMESTAMP", "DATE", "DATETIME"].includes(type)) tsType = "string";
      else if (type === "BOOLEAN") tsType = "boolean";
      
      ts += `  ${name}: ${tsType};\n`;
    });
    ts += "}";
    setOutput(ts);
  };

  return (
    <ToolContainer title="SQL to TypeScript" description="Convert SQL CREATE TABLE statements to TypeScript interfaces.">
      <TextArea
        label="SQL Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="CREATE TABLE users (id INT, name VARCHAR(255), active BOOLEAN)"
        rows={10}
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={convert}>Convert to TS</Button>
        <Button variant="ghost" onClick={clearAll}>Clear</Button>
      </div>
      {output && (
        <TextArea
          label="TypeScript Interface"
          value={output}
          readOnly
          className="mt-6"
          copyable
          rows={10}
        />
      )}
    </ToolContainer>
  );
}
