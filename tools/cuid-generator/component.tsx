"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

const CUID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function createCuid2(length = 24): string {
  const firstLetter = "c"; // CUIDs traditionally start with 'c'
  const time = Date.now().toString(36);
  const randBytes = new Uint8Array(length);
  crypto.getRandomValues(randBytes);
  let rand = "";
  for (let i = 0; i < randBytes.length; i++) {
    rand += CUID_ALPHABET[randBytes[i] % CUID_ALPHABET.length];
  }
  return (firstLetter + time + rand).slice(0, length);
}

function createKsuid(): string {
  // KSUID: 4-byte timestamp (big endian) + 16-byte random payload encoded in Base62
  const timestamp = Math.floor(Date.now() / 1000) - 1400000000; // Custom epoch
  const timeBytes = new Uint8Array(4);
  timeBytes[0] = (timestamp >> 24) & 0xff;
  timeBytes[1] = (timestamp >> 16) & 0xff;
  timeBytes[2] = (timestamp >> 8) & 0xff;
  timeBytes[3] = timestamp & 0xff;

  const randBytes = new Uint8Array(16);
  crypto.getRandomValues(randBytes);

  const payload = new Uint8Array(20);
  payload.set(timeBytes);
  payload.set(randBytes, 4);

  const B62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < 27; i++) {
    str += B62[payload[i % 20] % 62];
  }
  return str;
}

export default function CuidGeneratorTool() {
  const [type, setType] = useState<"cuid2" | "ksuid">("cuid2");
  const [count, setCount] = useState(5);
  const [length, setLength] = useState(24);
  const [ids, setIds] = useState<string[]>(() => [createCuid2(24)]);

  const handleGenerate = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(type === "cuid2" ? createCuid2(length) : createKsuid());
    }
    setIds(list);
  };

  return (
    <ToolContainer
      title="CUID2 & KSUID Generator"
      description="Generate collision-resistant, horizontal-scaling database primary key identifiers (CUID2 & KSUID)."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Identifier Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="cuid2">CUID2 (Collision Resistant 24-char)</option>
              <option value="ksuid">KSUID (Segment K-Sortable 27-char)</option>
            </select>
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

          {type === "cuid2" && (
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Length</span>
                <span className="font-mono">{length}</span>
              </div>
              <input
                type="range"
                min="10"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerate}>
            Generate {type.toUpperCase()}s
          </Button>
        </div>

        <TextArea
          label={`Generated ${type.toUpperCase()} List`}
          readOnly
          copyable
          value={ids.join("\n")}
          rows={Math.min(10, Math.max(3, ids.length))}
        />
      </div>
    </ToolContainer>
  );
}
