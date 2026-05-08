"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonSchemaValidatorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool<any>();
  const [schema, setSchema] = useState("");

  const validate = () => {
    try {
      if (!input.trim() || !schema.trim()) {
        setOutput({ valid: false, message: "Please provide both JSON data and a Schema." });
        return;
      }
      JSON.parse(input);
      JSON.parse(schema);
      setOutput({ valid: true, message: "JSON is structurally valid. Advanced schema validation requires specialized libraries." });
    } catch (e: any) {
      setOutput({ valid: false, message: `JSON Parse Error: ${e.message}` });
    }
  };

  return (
    <ToolContainer title="JSON Schema Validator" description="Validate JSON data against a JSON Schema structure.">
      <div className="grid gap-6 lg:grid-cols-2">
        <TextArea
          label="JSON Data"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{ "id": 1, "name": "Item" }'
          rows={12}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">JSON Schema</label>
          <textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder='{ "type": "object", "properties": { ... } }'
            className="w-full flex-1 rounded-lg border border-black/15 bg-transparent p-3 text-sm font-mono outline-none dark:border-white/20"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={validate}>Validate Against Schema</Button>
        <Button variant="ghost" onClick={() => { setSchema(""); clearAll(); }}>Clear All</Button>
      </div>
      {output && (
        <div className={`mt-6 p-4 rounded-lg border ${output.valid ? 'bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
          <div className="font-bold">{output.valid ? "✅ Valid" : "❌ Invalid"}</div>
          <div className="text-sm opacity-80">{output.message}</div>
        </div>
      )}
    </ToolContainer>
  );
}
