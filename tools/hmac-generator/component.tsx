"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HmacGeneratorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [secretKey, setSecretKey] = useState("");
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-512" | "SHA-384" | "SHA-1">("SHA-256");
  const [outputFormat, setOutputFormat] = useState<"hex" | "base64">("hex");
  const [uppercase, setUppercase] = useState(false);

  const generateHmac = async () => {
    try {
      if (!input) {
        throw new Error("Please enter a message to hash.");
      }
      if (!secretKey) {
        throw new Error("Please enter a secret key.");
      }

      const enc = new TextEncoder();
      const keyData = enc.encode(secretKey);
      const messageData = enc.encode(input);

      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: { name: algorithm } },
        false,
        ["sign"]
      );

      const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
      const hashArray = Array.from(new Uint8Array(signature));

      let result = "";
      if (outputFormat === "hex") {
        result = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        if (uppercase) result = result.toUpperCase();
      } else {
        const binStr = String.fromCharCode(...hashArray);
        result = btoa(binStr);
      }

      setOutput(result);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to calculate HMAC.");
    }
  };

  return (
    <ToolContainer
      title="HMAC Generator & Verifier"
      description="Generate Hash-based Message Authentication Codes (HMAC) with SHA-256, SHA-512, and secret keys."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter the payload or message to authenticate..."
          rows={4}
          error={error}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Secret Key
            </label>
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="e.g. your-secret-api-key"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as typeof algorithm)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="SHA-256">HMAC-SHA256</option>
              <option value="SHA-512">HMAC-SHA512</option>
              <option value="SHA-384">HMAC-SHA384</option>
              <option value="SHA-1">HMAC-SHA1</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Output Encoding
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="hex">Hexadecimal (lowercase)</option>
              <option value="base64">Base64</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {outputFormat === "hex" && (
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Uppercase HEX</span>
              </label>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={generateHmac}>Generate HMAC Code</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output && !secretKey}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <div className="space-y-2">
            <TextArea
              label="Generated HMAC Result"
              readOnly
              copyable
              value={output}
              rows={3}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
