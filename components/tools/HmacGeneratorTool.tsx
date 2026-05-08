"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HmacGeneratorTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();
  const [secret, setSecret] = useState("");
  const [algo, setAlgo] = useState("SHA-256");

  const handleConvert = async () => {
    if (!input || !secret) return;

    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const msgData = encoder.encode(input);

      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: algo },
        false,
        ["sign"]
      );

      const signature = await crypto.subtle.sign("HMAC", key, msgData);
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      
      setOutput(hashHex);
    } catch (err) {
      setOutput("Error generating HMAC signature");
    }
  };

  return (
    <ToolContainer
      title="HMAC Generator"
      description="Create keyed-hash message authentication codes for API security."
    >
      <div className="grid gap-6">
        <TextArea
          label="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message text..."
          rows={4}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Secret Key</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter your secret..."
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Algorithm</label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20"
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-512">SHA-512</option>
              <option value="SHA-1">SHA-1</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Generate HMAC</Button>
          <Button variant="ghost" onClick={() => { setSecret(""); clearAll(); }}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="HMAC Signature (Hex)"
            readOnly
            copyable
            value={output}
            rows={2}
          />
        )}
      </div>
    </ToolContainer>
  );
}
