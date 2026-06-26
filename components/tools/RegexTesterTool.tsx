"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";
import { useTool } from "@/hooks/useTool";

export default function RegexTesterTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [pattern, setPattern] = useState("");
  const [options, setOptions] = useState({
    flags: "g",
    caseSensitive: false,
    multiline: false,
    dotAll: false,
  });

  const test = () => {
    try {
      const { flags, caseSensitive, multiline, dotAll } = options;
      
      // Build flags string
      let regexFlags = flags;
      if (!caseSensitive && !flags.includes('i')) regexFlags += 'i';
      if (multiline && !flags.includes('m')) regexFlags += 'm';
      if (dotAll && !flags.includes('s')) regexFlags += 's';
      
      // Create regex
      const regex = new RegExp(pattern, regexFlags);
      
      // Test the regex
      const matches = input.match(regex);
      
      let result = `Pattern: ${pattern}\n`;
      result += `Flags: ${regexFlags}\n\n`;
      
      if (matches) {
        result += `Matches found: ${matches.length}\n\n`;
        matches.forEach((match, index) => {
          result += `Match ${index + 1}: "${match}"\n`;
        });
        
        // Show match details with groups
        if (matches.length > 0) {
          result += "\nMatch details:\n";
          let matchIndex = 0;
          let match;
          while ((match = regex.exec(input)) !== null) {
            result += `Match ${matchIndex + 1}:\n`;
            result += `  Full match: "${match[0]}"\n`;
            result += `  Position: ${match.index}\n`;
            
            if (match.length > 1) {
              result += `  Groups:\n`;
              for (let i = 1; i < match.length; i++) {
                result += `    Group ${i}: "${match[i]}"\n`;
              }
            }
            result += "\n";
            matchIndex++;
          }
        }
      } else {
        result += "No matches found\n";
      }
      
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : "Regex test failed"}`);
    }
  };

  const updateOption = (key: keyof typeof options, value: string | boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ToolContainer title="Regex Tester" description="Test regular expressions against text input.">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Regular Expression</label>
            <textarea
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter your regex pattern..."
              className="w-full h-24 p-3 border rounded-lg font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.caseSensitive}
                onChange={(e) => updateOption("caseSensitive", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Case sensitive</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.multiline}
                onChange={(e) => updateOption("multiline", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Multiline</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={options.dotAll}
                onChange={(e) => updateOption("dotAll", e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium">Dot matches all</span>
            </label>
          </div>
        </div>

        <TextArea 
          label="Test Text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter text to test against the regex..." 
          rows={5} 
        />
        <div className="flex gap-2">
          <Button onClick={test}>Test</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Test Results" readOnly copyable value={output} rows={8} />}
      </div>
    </ToolContainer>
  );
}
