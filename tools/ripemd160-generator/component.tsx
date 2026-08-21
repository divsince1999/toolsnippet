"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

// Pure JS RIPEMD-160 implementation
function ripemd160(message: string): string {
  const enc = new TextEncoder();
  const msgBytes = enc.encode(message);

  const zl = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  ];
  const zr = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  ];
  const sl = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  ];
  const sr = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  ];

  const rol = (x: number, n: number) => (x << n) | (x >>> (32 - n));

  const f = (j: number, x: number, y: number, z: number) => {
    if (j < 16) return x ^ y ^ z;
    if (j < 32) return (x & y) | (~x & z);
    if (j < 48) return (x | ~y) ^ z;
    if (j < 64) return (x & z) | (y & ~z);
    return x ^ (y | ~z);
  };

  const kl = (j: number) => {
    if (j < 16) return 0x00000000;
    if (j < 32) return 0x5a827999;
    if (j < 48) return 0x6ed9eba1;
    if (j < 64) return 0x8f1bbcdc;
    return 0xa953fd4e;
  };

  const kr = (j: number) => {
    if (j < 16) return 0x50a28be6;
    if (j < 32) return 0x5c4dd124;
    if (j < 48) return 0x6d703ef3;
    if (j < 64) return 0x7a6d76e9;
    return 0x00000000;
  };

  // Padding
  const bitLen = msgBytes.length * 8;
  const padLen = (msgBytes.length % 64 < 56) ? (56 - (msgBytes.length % 64)) : (120 - (msgBytes.length % 64));
  const totalLen = msgBytes.length + padLen + 8;
  const padded = new Uint8Array(totalLen);
  padded.set(msgBytes);
  padded[msgBytes.length] = 0x80;

  // Length in 64-bit little endian
  padded[totalLen - 8] = bitLen & 0xff;
  padded[totalLen - 7] = (bitLen >>> 8) & 0xff;
  padded[totalLen - 6] = (bitLen >>> 16) & 0xff;
  padded[totalLen - 5] = (bitLen >>> 24) & 0xff;

  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476, h4 = 0xc3d2e1f0;

  for (let offset = 0; offset < totalLen; offset += 64) {
    const x = new Uint32Array(16);
    for (let i = 0; i < 16; i++) {
      const idx = offset + i * 4;
      x[i] = padded[idx] | (padded[idx + 1] << 8) | (padded[idx + 2] << 16) | (padded[idx + 3] << 24);
    }

    let al = h0, bl = h1, cl = h2, dl = h3, el = h4;
    let ar = h0, br = h1, cr = h2, dr = h3, er = h4;

    for (let j = 0; j < 80; j++) {
      let t = (al + f(j, bl, cl, dl) + x[zl[j]] + kl(j)) | 0;
      t = (rol(t, sl[j]) + el) | 0;
      al = el; el = dl; dl = rol(cl, 10); cl = bl; bl = t;

      t = (ar + f(79 - j, br, cr, dr) + x[zr[j]] + kr(j)) | 0;
      t = (rol(t, sr[j]) + er) | 0;
      ar = er; er = dr; dr = rol(cr, 10); cr = br; br = t;
    }

    const t = (h1 + cl + dr) | 0;
    h1 = (h2 + dl + er) | 0;
    h2 = (h3 + el + ar) | 0;
    h3 = (h4 + al + br) | 0;
    h4 = (h0 + bl + cr) | 0;
    h0 = t;
  }

  const out = new Uint8Array(20);
  const words = [h0, h1, h2, h3, h4];
  for (let i = 0; i < 5; i++) {
    out[i * 4] = words[i] & 0xff;
    out[i * 4 + 1] = (words[i] >>> 8) & 0xff;
    out[i * 4 + 2] = (words[i] >>> 16) & 0xff;
    out[i * 4 + 3] = (words[i] >>> 24) & 0xff;
  }

  return Array.from(out).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Ripemd160GeneratorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [uppercase, setUppercase] = useState(false);

  const generateRipemd160 = () => {
    try {
      if (!input) {
        setOutput("");
        return;
      }
      let hash = ripemd160(input);
      if (uppercase) hash = hash.toUpperCase();
      setOutput(hash);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to calculate RIPEMD-160 hash.");
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
      title="RIPEMD-160 Hash Generator"
      description="Compute 160-bit (40 hex characters) RIPEMD-160 cryptographic hashes used in Bitcoin address generation and PGP."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to generate RIPEMD-160 hash..."
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
            <Button onClick={generateRipemd160}>Generate RIPEMD-160 Hash</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label="RIPEMD-160 Hash (40 Hex Characters)"
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
