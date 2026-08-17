"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

// CRC32 IEEE 802.3 Lookup Table
const makeCrcTable = () => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
};

const CRC_TABLE = makeCrcTable();

function calculateCrc32(str: string): number {
  const enc = new TextEncoder();
  const bytes = enc.encode(str);
  let crc = 0 ^ (-1);
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

export default function Crc32ChecksumTool() {
  const { input, setInput, clearAll } = useTool();
  const [checksums, setChecksums] = useState<{
    hex: string;
    dec: number;
    signed: number;
    bin: string;
  } | null>(null);

  const computeCrc = () => {
    if (!input) {
      setChecksums(null);
      return;
    }
    const val = calculateCrc32(input);
    setChecksums({
      hex: val.toString(16).padStart(8, "0").toUpperCase(),
      dec: val,
      signed: val | 0,
      bin: val.toString(2).padStart(32, "0"),
    });
  };

  const handleClear = () => {
    clearAll();
    setChecksums(null);
  };

  return (
    <ToolContainer
      title="CRC32 Checksum Calculator"
      description="Compute standard 32-bit CRC32 checksums (IEEE 802.3) in Hexadecimal, Decimal, and Binary."
      maxWidth="4xl"
    >
      <div className="grid gap-6">
        <TextArea
          label="Input Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or paste code to calculate CRC-32 checksum..."
          rows={5}
        />

        <div className="flex gap-2">
          <Button onClick={computeCrc}>Calculate CRC32</Button>
          <Button variant="ghost" onClick={handleClear} disabled={!input && !checksums}>
            Clear
          </Button>
        </div>

        {checksums && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Hexadecimal (32-bit)
              </div>
              <div className="text-2xl font-mono font-bold text-primary">
                0x{checksums.hex}
              </div>
            </div>

            <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Unsigned Decimal
              </div>
              <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                {checksums.dec}
              </div>
            </div>

            <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Signed 32-bit Integer
              </div>
              <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                {checksums.signed}
              </div>
            </div>

            <div className="rounded-xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] overflow-hidden">
              <div className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Binary (32 Bits)
              </div>
              <div className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300 break-all">
                {checksums.bin}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
