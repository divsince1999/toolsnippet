"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HashComparatorTool() {
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(true);

  const cleanA = ignoreCase ? hashA.trim().toLowerCase() : hashA.trim();
  const cleanB = ignoreCase ? hashB.trim().toLowerCase() : hashB.trim();

  const hasInputs = cleanA.length > 0 && cleanB.length > 0;
  const isMatch = hasInputs && cleanA === cleanB;

  const handleClear = () => {
    setHashA("");
    setHashB("");
  };

  return (
    <ToolContainer
      title="Hash & Checksum Comparator"
      description="Compare two cryptographic hashes or file checksums with instant character-by-character integrity verification."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextArea
            label="Calculated / Actual Checksum (Hash 1)"
            value={hashA}
            onChange={(e) => setHashA(e.target.value)}
            placeholder="Paste first hash (e.g. calculated file SHA-256)..."
            rows={4}
          />

          <TextArea
            label="Expected / Official Checksum (Hash 2)"
            value={hashB}
            onChange={(e) => setHashB(e.target.value)}
            placeholder="Paste second hash (e.g. official vendor checksum)..."
            rows={4}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded text-primary"
            />
            <span>Case Insensitive Comparison (ignore UPPERCASE / lowercase differences)</span>
          </label>

          <Button variant="ghost" onClick={handleClear} disabled={!hashA && !hashB}>
            Clear
          </Button>
        </div>

        {hasInputs && (
          <div
            className={`rounded-2xl p-6 text-center transition-all ${
              isMatch
                ? "bg-green-500/10 border-2 border-green-500 text-green-700 dark:text-green-300"
                : "bg-red-500/10 border-2 border-red-500 text-red-700 dark:text-red-300"
            }`}
          >
            <div className="text-2xl font-bold">
              {isMatch ? "✓ HASHES MATCH 100%" : "✗ HASHES DO NOT MATCH"}
            </div>
            <p className="mt-2 text-xs">
              {isMatch
                ? "The checksums are identical. File integrity and authenticity verified."
                : `Character mismatch detected. (Length: Hash 1 = ${cleanA.length} chars, Hash 2 = ${cleanB.length} chars)`}
            </p>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
