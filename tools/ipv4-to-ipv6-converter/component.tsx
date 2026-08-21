"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function ipv4ToHex(ip: string): string {
  return ip
    .split(".")
    .map((o) => parseInt(o, 10).toString(16).padStart(2, "0"))
    .join("");
}

export default function Ipv4ToIpv6ConverterTool() {
  const [ipv4, setIpv4] = useState("192.168.1.1");
  const [ipv6Input, setIpv6Input] = useState("2001:db8::1");
  const [expandedIpv6, setExpandedIpv6] = useState("");
  const [compressedIpv6, setCompressedIpv6] = useState("");

  const hex = ipv4ToHex(ipv4);
  const hexPart1 = hex.slice(0, 4);
  const hexPart2 = hex.slice(4, 8);

  const ipv4Mapped = `::ffff:${ipv4}`;
  const ipv4MappedHex = `::ffff:${hexPart1}:${hexPart2}`;
  const sixToFour = `2002:${hexPart1}:${hexPart2}::1`;

  const expandIpv6 = (str: string) => {
    try {
      const clean = str.trim().toLowerCase();
      let parts = clean.split(":");
      if (clean.includes("::")) {
        const [left, right] = clean.split("::");
        const leftParts = left ? left.split(":") : [];
        const rightParts = right ? right.split(":") : [];
        const missing = 8 - (leftParts.length + rightParts.length);
        const zeroParts = Array(missing).fill("0000");
        parts = [...leftParts, ...zeroParts, ...rightParts];
      }
      const expanded = parts.map((p) => p.padStart(4, "0")).join(":");
      setExpandedIpv6(expanded);
    } catch {
      setExpandedIpv6("Invalid IPv6 Address format");
    }
  };

  const compressIpv6 = (str: string) => {
    try {
      const clean = str.trim().toLowerCase();
      // Remove leading zeros from each hextet
      const hextets = clean.split(":").map((h) => h.replace(/^0+/, "") || "0");
      // Find longest sequence of '0's to replace with ::
      const joined = hextets.join(":");
      const compressed = joined.replace(/(^|:)0(:0)+(:|$)/, "::");
      setCompressedIpv6(compressed);
    } catch {
      setCompressedIpv6("Invalid IPv6 Address format");
    }
  };

  return (
    <ToolContainer
      title="IPv4 to IPv6 & IPv6 Expander/Compressor"
      description="Convert IPv4 addresses to IPv4-mapped IPv6, 6to4 prefix, and expand/compress 128-bit IPv6 hextets."
      maxWidth="5xl"
    >
      <div className="space-y-8">
        {/* Section 1: IPv4 to IPv6 */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            1. IPv4 to IPv6 Address Mapping
          </h3>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Input IPv4 Address
            </label>
            <input
              type="text"
              value={ipv4}
              onChange={(e) => setIpv4(e.target.value)}
              placeholder="192.168.1.1"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-base dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">IPv4-Mapped (Dotted)</span>
              <div className="text-base font-bold font-mono text-primary mt-1 break-all">
                {ipv4Mapped}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">IPv4-Mapped (Hex)</span>
              <div className="text-base font-bold font-mono text-gray-900 dark:text-white mt-1 break-all">
                {ipv4MappedHex}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">6to4 Tunnel Prefix</span>
              <div className="text-base font-bold font-mono text-gray-900 dark:text-white mt-1 break-all">
                {sixToFour}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: IPv6 Expander and Compressor */}
        <div className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            2. IPv6 Expander & Compressor (RFC 5952)
          </h3>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Input Any IPv6 Address
            </label>
            <input
              type="text"
              value={ipv6Input}
              onChange={(e) => setIpv6Input(e.target.value)}
              placeholder="e.g. 2001:db8::1 or 2001:0db8:0000:0000:0000:0000:0000:0001"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-base dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => expandIpv6(ipv6Input)}>Expand Full 8 Hextets</Button>
            <Button variant="secondary" onClick={() => compressIpv6(ipv6Input)}>Compress (RFC 5952)</Button>
          </div>

          {expandedIpv6 && (
            <TextArea
              label="Expanded 128-bit IPv6 Address"
              readOnly
              copyable
              value={expandedIpv6}
              rows={2}
            />
          )}

          {compressedIpv6 && (
            <TextArea
              label="Compressed IPv6 Address"
              readOnly
              copyable
              value={compressedIpv6}
              rows={2}
            />
          )}
        </div>
      </div>
    </ToolContainer>
  );
}
