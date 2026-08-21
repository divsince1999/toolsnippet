"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford Base32

function generateUlid(timestampMs: number = Date.now()): string {
  let timeStr = "";
  let t = timestampMs;
  for (let i = 9; i >= 0; i--) {
    timeStr = ENCODING.charAt(t % 32) + timeStr;
    t = Math.floor(t / 32);
  }

  const randBytes = new Uint8Array(10);
  crypto.getRandomValues(randBytes);
  let randStr = "";
  for (let i = 0; i < 10; i++) {
    randStr += ENCODING.charAt(randBytes[i] % 32);
    randStr += ENCODING.charAt((randBytes[i] >> 5) % 32);
  }
  return (timeStr + randStr).slice(0, 26);
}

function decodeUlidTime(ulid: string): Date | null {
  const clean = ulid.trim().toUpperCase();
  if (clean.length < 10) return null;
  let time = 0;
  for (let i = 0; i < 10; i++) {
    const idx = ENCODING.indexOf(clean[i]);
    if (idx === -1) return null;
    time = time * 32 + idx;
  }
  return new Date(time);
}

export default function UlidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [lowercase, setLowercase] = useState(false);
  const [ulids, setUlids] = useState<string[]>(() => [generateUlid()]);
  const [inspectUlid, setInspectUlid] = useState("");
  const [decodedDate, setDecodedDate] = useState<Date | null>(null);

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let u = generateUlid();
      if (lowercase) u = u.toLowerCase();
      list.push(u);
    }
    setUlids(list);
  };

  const handleInspect = (val: string) => {
    setInspectUlid(val);
    setDecodedDate(decodeUlidTime(val));
  };

  const outputText = ulids.join("\n");

  return (
    <ToolContainer
      title="ULID Generator & Timestamp Decoder"
      description="Generate 128-bit lexicographically sortable Crockford Base32 ULIDs and decode embedded timestamps."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Count (1 - 50)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium pb-3">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="rounded text-primary"
              />
              <span>Lowercase Output</span>
            </label>
          </div>

          <div className="flex items-end">
            <Button onClick={handleGenerate} className="w-full">
              Generate ULID{count > 1 ? "s" : ""}
            </Button>
          </div>
        </div>

        <TextArea
          label="Generated ULID List"
          readOnly
          copyable
          value={outputText}
          rows={Math.min(10, Math.max(3, ulids.length))}
        />

        <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10 space-y-3">
          <h3 className="text-sm font-bold">ULID Timestamp Inspector</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={inspectUlid}
              onChange={(e) => handleInspect(e.target.value)}
              placeholder="Paste any ULID here to decode timestamp..."
              className="w-full font-mono rounded-lg border border-black/15 bg-transparent p-2.5 text-xs dark:border-white/20 outline-none"
            />
            {decodedDate && (
              <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                <span>📅 {decodedDate.toISOString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
