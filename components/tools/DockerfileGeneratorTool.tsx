"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DockerfileGeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied } = useTool();

  const TEMPLATES: Record<string, string> = {
    Node: "FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
    Python: "FROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD [\"python\", \"app.py\"]",
    Go: "FROM golang:1.19-alpine\nWORKDIR /app\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN go build -o main .\nCMD [\"./main\"]",
  };

  const generate = (name: string) => {
    setOutput(TEMPLATES[name]);
  };

  return (
    <ToolContainer title="Dockerfile Generator" description="Generate optimized Dockerfiles for your apps.">
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-2">
          {Object.keys(TEMPLATES).map(name => (
            <Button key={name} variant="outline" size="sm" onClick={() => generate(name)}>{name}</Button>
          ))}
        </div>

        {output && (
          <div className="grid gap-4">
            <TextArea
              label="Generated Dockerfile"
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
