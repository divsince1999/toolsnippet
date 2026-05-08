"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";
import { useState } from "react";

export default function UuidV5GeneratorTool() {
  const { output, setOutput, copyToClipboard, isCopied } = useTool();
  const [namespace, setNamespace] = useState("6ba7b810-9dad-11d1-80b4-00c04fd430c8"); // Default DNS namespace
  const [name, setName] = useState("example.com");

  const generate = async () => {
    if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
      setOutput("UUID v5 generation requires a secure browser environment with crypto support.");
      return;
    }
    const msgUint8 = new TextEncoder().encode(namespace + name);
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // Set version 5 (0101) and variant (10xx)
    hashArray[6] = (hashArray[6] & 0x0f) | 0x50;
    hashArray[8] = (hashArray[8] & 0x3f) | 0x80;
    
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const uuid = `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
    setOutput(uuid);
  };

  return (
    <ToolContainer title="UUID v5 Generator" description="Generate deterministic name-based UUIDs using SHA-1.">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Namespace UUID</label>
            <input type="text" value={namespace} onChange={e => setNamespace(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20 font-mono" />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="rounded-lg border border-black/15 bg-transparent p-2 text-sm outline-none dark:border-white/20" />
          </div>
        </div>
        <Button onClick={generate}>Generate UUID v5</Button>
        {output && (
          <div className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Deterministic UUID v5</div>
            <div className="text-2xl font-mono font-bold break-all text-primary mb-4">{output}</div>
            <Button variant="secondary" onClick={() => copyToClipboard(output)}>{isCopied ? "Copied!" : "Copy"}</Button>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
