"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

// Minimal pure JS Keccak / SHA-3 implementation (FIPS 202)
function keccak(message: string, bits: number): string {
  const enc = new TextEncoder();
  const msgBytes = enc.encode(message);

  const rate = 1600 - bits * 2;
  const rateBytes = rate / 8;
  const outputBytes = bits / 8;

  // Domain separation padding for SHA3: 0x06
  const padLen = rateBytes - (msgBytes.length % rateBytes);
  const padded = new Uint8Array(msgBytes.length + padLen);
  padded.set(msgBytes);

  if (padLen === 1) {
    padded[msgBytes.length] = 0x86;
  } else {
    padded[msgBytes.length] = 0x06;
    padded[padded.length - 1] = 0x80;
  }

  // 5x5 state of 64-bit words (low, high 32-bit pairs)
  const stateL = new Uint32Array(25);
  const stateH = new Uint32Array(25);

  const RC_L = [
    0x00000001, 0x00008082, 0x0000808a, 0x80008000, 0x0000808b, 0x80000001,
    0x80008081, 0x00008009, 0x0000008a, 0x00000088, 0x80008009, 0x8000000a,
    0x8000808b, 0x0000008b, 0x00008089, 0x00008003, 0x00008002, 0x00000080,
    0x0000800a, 0x8000000a, 0x80008081, 0x00008080, 0x80000001, 0x80008008,
  ];
  const RC_H = [
    0x00000000, 0x00000000, 0x80000000, 0x80000000, 0x00000000, 0x00000000,
    0x80000000, 0x80000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
    0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000,
    0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000,
  ];

  const ROTS = [
    0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3, 10, 43, 25, 39, 41, 45, 15, 21, 8,
    18, 2, 61, 56, 14,
  ];

  const PILN = [
    10, 7, 11, 17, 18, 3, 5, 16, 8, 21, 24, 4, 15, 23, 19, 13, 12, 2, 20, 14,
    22, 9, 6, 1,
  ];

  const absorbBlock = (block: Uint8Array) => {
    for (let i = 0; i < rateBytes / 8; i++) {
      const idx = i * 8;
      const lo =
        block[idx] |
        (block[idx + 1] << 8) |
        (block[idx + 2] << 16) |
        (block[idx + 3] << 24);
      const hi =
        block[idx + 4] |
        (block[idx + 5] << 8) |
        (block[idx + 6] << 16) |
        (block[idx + 7] << 24);
      stateL[i] ^= lo;
      stateH[i] ^= hi;
    }

    // 24 rounds of Keccak-f
    const C_L = new Uint32Array(5);
    const C_H = new Uint32Array(5);
    const D_L = new Uint32Array(5);
    const D_H = new Uint32Array(5);

    for (let round = 0; round < 24; round++) {
      // Theta
      for (let x = 0; x < 5; x++) {
        C_L[x] =
          stateL[x] ^
          stateL[x + 5] ^
          stateL[x + 10] ^
          stateL[x + 15] ^
          stateL[x + 20];
        C_H[x] =
          stateH[x] ^
          stateH[x + 5] ^
          stateH[x + 10] ^
          stateH[x + 15] ^
          stateH[x + 20];
      }
      for (let x = 0; x < 5; x++) {
        const x4L = C_L[(x + 4) % 5];
        const x4H = C_H[(x + 4) % 5];
        const x1L = C_L[(x + 1) % 5];
        const x1H = C_H[(x + 1) % 5];
        const rotL = (x1L << 1) | (x1H >>> 31);
        const rotH = (x1H << 1) | (x1L >>> 31);
        D_L[x] = x4L ^ rotL;
        D_H[x] = x4H ^ rotH;
      }
      for (let i = 0; i < 25; i++) {
        stateL[i] ^= D_L[i % 5];
        stateH[i] ^= D_H[i % 5];
      }

      // Rho and Pi
      let curL = stateL[1];
      let curH = stateH[1];
      for (let i = 0; i < 24; i++) {
        const r = ROTS[i + 1];
        const dest = PILN[i];
        let nL: number, nH: number;
        if (r < 32) {
          nL = (curL << r) | (curH >>> (32 - r));
          nH = (curH << r) | (curL >>> (32 - r));
        } else {
          const r2 = r - 32;
          nL = (curH << r2) | (curL >>> (32 - r2));
          nH = (curL << r2) | (curH >>> (32 - r2));
        }
        curL = stateL[dest];
        curH = stateH[dest];
        stateL[dest] = nL;
        stateH[dest] = nH;
      }

      // Chi
      for (let y = 0; y < 25; y += 5) {
        const t0L = stateL[y],
          t0H = stateH[y];
        const t1L = stateL[y + 1],
          t1H = stateH[y + 1];
        const t2L = stateL[y + 2],
          t2H = stateH[y + 2];
        const t3L = stateL[y + 3],
          t3H = stateH[y + 3];
        const t4L = stateL[y + 4],
          t4H = stateH[y + 4];

        stateL[y] ^= ~t1L & t2L;
        stateH[y] ^= ~t1H & t2H;
        stateL[y + 1] ^= ~t2L & t3L;
        stateH[y + 1] ^= ~t2H & t3H;
        stateL[y + 2] ^= ~t3L & t4L;
        stateH[y + 2] ^= ~t3H & t4H;
        stateL[y + 3] ^= ~t4L & t0L;
        stateH[y + 3] ^= ~t4H & t0H;
        stateL[y + 4] ^= ~t0L & t1L;
        stateH[y + 4] ^= ~t0H & t1H;
      }

      // Iota
      stateL[0] ^= RC_L[round];
      stateH[0] ^= RC_H[round];
    }
  };

  for (let offset = 0; offset < padded.length; offset += rateBytes) {
    absorbBlock(padded.subarray(offset, offset + rateBytes));
  }

  // Squeeze output bytes
  const out = new Uint8Array(outputBytes);
  for (let i = 0; i < outputBytes / 8; i++) {
    const lo = stateL[i];
    const hi = stateH[i];
    out[i * 8] = lo & 0xff;
    out[i * 8 + 1] = (lo >>> 8) & 0xff;
    out[i * 8 + 2] = (lo >>> 16) & 0xff;
    out[i * 8 + 3] = (lo >>> 24) & 0xff;
    out[i * 8 + 4] = hi & 0xff;
    out[i * 8 + 5] = (hi >>> 8) & 0xff;
    out[i * 8 + 6] = (hi >>> 16) & 0xff;
    out[i * 8 + 7] = (hi >>> 24) & 0xff;
  }

  return Array.from(out)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function Sha3HashGeneratorTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [variant, setVariant] = useState<256 | 512 | 384 | 224>(256);
  const [uppercase, setUppercase] = useState(false);

  const generateSha3 = () => {
    try {
      if (!input) {
        setOutput("");
        return;
      }
      let hash = keccak(input, variant);
      if (uppercase) hash = hash.toUpperCase();
      setOutput(hash);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to calculate SHA-3 hash.");
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
      title="SHA-3 (Keccak) Hash Generator"
      description="Generate FIPS 202 compliant SHA-3 (Keccak) cryptographic hashes (SHA3-256, SHA3-512, SHA3-384, SHA3-224)."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to calculate SHA-3 hash..."
          rows={5}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 mr-2">
                SHA-3 Variant:
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(Number(e.target.value) as typeof variant)}
                className="rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value={256}>SHA3-256 (256-bit)</option>
                <option value={512}>SHA3-512 (512-bit)</option>
                <option value={384}>SHA3-384 (384-bit)</option>
                <option value={224}>SHA3-224 (224-bit)</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => handleToggleUppercase(e.target.checked)}
                className="rounded text-primary"
              />
              <span>Uppercase HEX</span>
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateSha3}>Generate SHA-3 Hash</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label={`SHA3-${variant} Hash Output`}
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
