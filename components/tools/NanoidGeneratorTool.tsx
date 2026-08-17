"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const DEFAULT_ALPHABET = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLFGQZ_bfghjklqvwyz"; // 64 URL-safe chars

function customNanoid(alphabet: string, size: number): string {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

export default function NanoidGeneratorTool() {
  const [size, setSize] = useState(21);
  const [count, setCount] = useState(5);
  const [alphabetPreset, setAlphabetPreset] = useState<"url-safe" | "numbers" | "hex" | "lowercase" | "custom">("url-safe");
  const [customAlphabet, setCustomAlphabet] = useState(DEFAULT_ALPHABET);
  const [ids, setIds] = useState<string[]>(() => [customNanoid(DEFAULT_ALPHABET, 21)]);

  const getAlphabet = () => {
    switch (alphabetPreset) {
      case "numbers": return "0123456789";
      case "hex": return "0123456789abcdef";
      case "lowercase": return "abcdefghijklmnopqrstuvwxyz0123456789";
      case "custom": return customAlphabet || DEFAULT_ALPHABET;
      default: return DEFAULT_ALPHABET;
    }
  };

  const handleGenerate = () => {
    const alpha = getAlphabet();
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(customNanoid(alpha, size));
    }
    setIds(list);
  };

  return (
    <ToolContainer
      title="Nano ID Generator"
      description="Generate cryptographically secure, URL-safe compact unique IDs with customizable length and alphabets."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>ID Length</span>
              <span className="font-mono">{size} chars</span>
            </div>
            <input
              type="range"
              min="5"
              max="64"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Batch Quantity
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-full rounded-lg border border-black/15 bg-white p-2 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Alphabet Preset
            </label>
            <select
              value={alphabetPreset}
              onChange={(e) => setAlphabetPreset(e.target.value as typeof alphabetPreset)}
              className="w-full rounded-lg border border-black/15 bg-white p-2 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="url-safe">Standard URL-Safe (A-Z, a-z, 0-9, _, -)</option>
              <option value="numbers">Numbers Only (0-9)</option>
              <option value="hex">Hexadecimal (0-9, a-f)</option>
              <option value="lowercase">Lowercase Alphanumeric</option>
              <option value="custom">Custom Alphabet</option>
            </select>
          </div>
        </div>

        {alphabetPreset === "custom" && (
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Custom Alphabet Characters
            </label>
            <input
              type="text"
              value={customAlphabet}
              onChange={(e) => setCustomAlphabet(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-transparent p-2 text-xs dark:border-white/20"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>Generate Nano IDs</Button>
        </div>

        <TextArea
          label="Generated Nano IDs"
          readOnly
          copyable
          value={ids.join("\n")}
          rows={Math.min(10, Math.max(3, ids.length))}
        />
      </div>
    </ToolContainer>
  );
}
