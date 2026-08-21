"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Sha512HashGeneratorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [uppercase, setUppercase] = useState(false);

  const generateSha512 = async () => {
    try {
      if (!input) {
        setOutput("");
        return;
      }

      const enc = new TextEncoder();
      const data = enc.encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-512", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      if (uppercase) hashHex = hashHex.toUpperCase();

      setOutput(hashHex);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to compute SHA-512 hash.");
    }
  };

  const handleToggleUppercase = (val: boolean) => {
    setUppercase(val);
    if (output) {
      setOutput(val ? output.toUpperCase() : output.toLowerCase());
    }
  };

  return (
    <ToolContainer
      title="SHA-512 Hash Generator"
      description="Compute secure 512-bit SHA-512 cryptographic checksums with client-side Web Crypto."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to generate SHA-512 hash..."
          rows={5}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => handleToggleUppercase(e.target.checked)}
              className="rounded text-primary"
            />
            <span>Uppercase HEX Output</span>
          </label>

          <div className="flex gap-2">
            <Button onClick={generateSha512}>Generate SHA-512 Hash</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label="SHA-512 Hash (128 Hex Characters)"
            readOnly
            copyable
            value={output}
            rows={3}
          />
        )}
      </div>
    </ToolContainer>
  );
}
