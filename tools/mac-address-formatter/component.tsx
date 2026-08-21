"use client";

import { useState } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MacAddressFormatterTool() {
  const [macInput, setMacInput] = useState("001a2b3c4d5e");
  const [uppercase, setUppercase] = useState(true);

  const cleanHex = macInput.replace(/[^a-fA-F0-9]/g, "").slice(0, 12);
  const isValid = cleanHex.length === 12;

  const formatWithCase = (str: string) => (uppercase ? str.toUpperCase() : str.toLowerCase());

  const colonFormat = isValid
    ? formatWithCase(cleanHex.match(/.{1,2}/g)?.join(":") || "")
    : "—";

  const dashFormat = isValid
    ? formatWithCase(cleanHex.match(/.{1,2}/g)?.join("-") || "")
    : "—";

  const ciscoFormat = isValid
    ? (uppercase ? cleanHex.toUpperCase() : cleanHex.toLowerCase()).match(/.{1,4}/g)?.join(".") || ""
    : "—";

  const spaceFormat = isValid
    ? formatWithCase(cleanHex.match(/.{1,2}/g)?.join(" ") || "")
    : "—";

  const rawHexFormat = isValid ? `0x${formatWithCase(cleanHex)}` : "—";

  const generateRandomMac = () => {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    // Set locally administered unicast bit: byte[0] = (byte[0] & 0xfe) | 0x02
    bytes[0] = (bytes[0] & 0xfe) | 0x02;
    const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
    setMacInput(hex);
  };

  return (
    <ToolContainer
      title="MAC Address Formatter & Generator"
      description="Format MAC addresses into Colon, Dash, Cisco dot, and space notations, or generate random valid MACs."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Input MAC Address
            </label>
            <button
              type="button"
              onClick={generateRandomMac}
              className="text-xs text-primary font-medium hover:underline"
            >
              🎲 Generate Random MAC
            </button>
          </div>
          <input
            type="text"
            value={macInput}
            onChange={(e) => setMacInput(e.target.value)}
            placeholder="e.g. 001a2b3c4d5e or 00:1A:2B:3C:4D:5E"
            className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-base dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-primary"
            />
            <span>Uppercase HEX</span>
          </label>
        </div>

        {isValid ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Standard Colon Format (Linux / Mac)</span>
              <div className="text-lg font-bold font-mono text-primary mt-1">
                {colonFormat}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Hyphen / Dash Format (Windows)</span>
              <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                {dashFormat}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Cisco Tri-Dot Notation</span>
              <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                {ciscoFormat}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Space Separated Pairs</span>
              <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                {spaceFormat}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Raw Hexadecimal Integer</span>
              <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                {rawHexFormat}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center text-xs font-medium text-amber-700 dark:text-amber-300">
            Please enter a complete 12-hex-digit MAC address (currently {cleanHex.length}/12 hex characters).
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
