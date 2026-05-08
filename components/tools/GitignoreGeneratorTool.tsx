"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function GitignoreGeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied } = useTool();

  const TEMPLATES: Record<string, string> = {
    Node: "node_modules/\n.env\n.DS_Store\ndist/\nnpm-debug.log*",
    Python: "__pycache__/\n*.py[cod]\n*$py.class\nvenv/\n.env",
    React: "node_modules/\nbuild/\n.env.local\n.DS_Store",
    NextJS: ".next/\nnode_modules/\n.env*\nout/\n.DS_Store",
    Java: "*.class\n*.log\n*.jar\n*.war\n*.ear\ntarget/",
  };

  const generate = (name: string) => {
    setOutput(TEMPLATES[name]);
  };

  return (
    <ToolContainer title=".gitignore Generator" description="Generate professional .gitignore files for your stack.">
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-2">
          {Object.keys(TEMPLATES).map(name => (
            <Button key={name} variant="outline" size="sm" onClick={() => generate(name)}>{name}</Button>
          ))}
        </div>

        {output && (
          <div className="grid gap-4">
            <TextArea
              label="Generated .gitignore"
              value={output}
              readOnly
              rows={10}
              copyable
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
