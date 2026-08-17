"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function encodeBase58(bytes: Uint8Array): string {
  const digits = [0];
  for (let i = 0; i < bytes.length; i++) {
    for (let j = 0; j < digits.length; j++) {
      digits[j] <<= 8;
    }
    digits[0] += bytes[i];
    let carry = 0;
    for (let j = 0; j < digits.length; j++) {
      digits[j] += carry;
      carry = (digits[j] / 58) | 0;
      digits[j] %= 58;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  let str = "";
  // Leading zeros converted to '1's
  for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
    str += "1";
  }
  for (let i = digits.length - 1; i >= 0; i--) {
    str += BASE58_ALPHABET[digits[i]];
  }
  return str;
}

function decodeBase58(str: string): Uint8Array {
  if (!str.length) return new Uint8Array(0);
  const bytes = [0];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const val = BASE58_ALPHABET.indexOf(char);
    if (val === -1) throw new Error(`Invalid Base58 character: "${char}"`);

    for (let j = 0; j < bytes.length; j++) {
      bytes[j] *= 58;
    }
    bytes[0] += val;
    let carry = 0;
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }
    while (carry) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (let i = 0; i < str.length && str[i] === "1"; i++) {
    bytes.push(0);
  }

  return new Uint8Array(bytes.reverse());
}

export default function Base58ConverterTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (mode === "encode") {
        const enc = new TextEncoder();
        const bytes = enc.encode(input);
        setOutput(encodeBase58(bytes));
      } else {
        const bytes = decodeBase58(input.trim());
        const dec = new TextDecoder();
        setOutput(dec.decode(bytes));
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed.");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolContainer
      title="Base58 Encoder & Decoder"
      description="Encode and decode text strings using Bitcoin, IPFS, and Solana Base58 format."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode("encode");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "encode"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Encode to Base58
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("decode");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "decode"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Decode from Base58
          </button>
        </div>

        <TextArea
          label={mode === "encode" ? "Plain Text to Encode" : "Base58 String to Decode"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Enter plain text to convert into Base58..."
              : "Paste Base58 string (e.g. StV1DL6CwTryKyV)..."
          }
          rows={5}
          error={error}
        />

        <div className="flex gap-2">
          <Button onClick={handleConvert}>
            {mode === "encode" ? "Encode to Base58" : "Decode to Text"}
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label={mode === "encode" ? "Base58 Output" : "Decoded Plain Text"}
            readOnly
            copyable
            value={output}
            rows={4}
          />
        )}
      </div>
    </ToolContainer>
  );
}
