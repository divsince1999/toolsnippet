"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PasswordGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });

  const generate = () => {
    try {
      const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous } = options;
      
      let charset = "";
      
      if (includeUppercase) {
        charset += excludeSimilar ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      
      if (includeLowercase) {
        charset += excludeSimilar ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
      }
      
      if (includeNumbers) {
        charset += excludeSimilar ? "23456789" : "0123456789";
      }
      
      if (includeSymbols) {
        charset += excludeAmbiguous ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "!@#$%^&*()_+-=[]{}|;:,.<>?`~";
      }
      
      if (charset === "") {
        setOutput("Error: Please select at least one character type");
        return;
      }
      
      let result = "";
      for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Generation failed"}`);
    }
  };

  const updateOption = (key: keyof typeof options, value: string | number | boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ToolContainer title="Password Generator" description="Generate secure passwords with customizable options.">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Password Length</label>
            <input
              type="number"
              min="4"
              max="128"
              value={options.length}
              onChange={(e) => updateOption("length", parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeUppercase}
                onChange={(e) => updateOption("includeUppercase", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Uppercase letters</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeLowercase}
                onChange={(e) => updateOption("includeLowercase", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Lowercase letters</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeNumbers}
                onChange={(e) => updateOption("includeNumbers", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Numbers</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.includeSymbols}
                onChange={(e) => updateOption("includeSymbols", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Symbols</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) => updateOption("excludeSimilar", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Exclude similar (0, O, l, 1)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) => updateOption("excludeAmbiguous", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Exclude ambiguous ({} [] () , ; :)</span>
            </label>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={generate}>Generate</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!output}>Clear</Button>
        </div>
        {output && <TextArea label="Generated Password" readOnly copyable value={output} rows={3} />}
      </div>
    </ToolContainer>
  );
}
