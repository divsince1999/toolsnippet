"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function ipToLong(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function longToIp(long: number): string {
  return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join(".");
}

function rangeToCidrs(startIp: string, endIp: string): string[] {
  let start = ipToLong(startIp);
  const end = ipToLong(endIp);
  if (start > end) return ["Invalid range: Start IP must be less than or equal to End IP."];

  const cidrs: string[] = [];
  while (end >= start) {
    let maxBits = 32;
    while (maxBits > 0) {
      const mask = (0xffffffff << (32 - (maxBits - 1))) >>> 0;
      if ((start & mask) !== start) break;
      maxBits--;
    }

    const maxDiff = 32 - Math.floor(Math.log2(end - start + 1));
    if (maxBits < maxDiff) maxBits = maxDiff;

    cidrs.push(`${longToIp(start)}/${maxBits}`);
    start += Math.pow(2, 32 - maxBits);
  }
  return cidrs;
}

export default function IpRangeToCidrTool() {
  const [startIp, setStartIp] = useState("192.168.1.1");
  const [endIp, setEndIp] = useState("192.168.1.50");
  const [cidrList, setCidrList] = useState<string[] | null>(null);

  const handleConvert = () => {
    try {
      const res = rangeToCidrs(startIp.trim(), endIp.trim());
      setCidrList(res);
    } catch {
      setCidrList(["Error calculating CIDR subnets."]);
    }
  };

  return (
    <ToolContainer
      title="IP Range to CIDR Converter"
      description="Convert starting and ending IPv4 address ranges into the minimal set of CIDR subnet blocks."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Start IP Address
            </label>
            <input
              type="text"
              value={startIp}
              onChange={(e) => setStartIp(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              End IP Address
            </label>
            <input
              type="text"
              value={endIp}
              onChange={(e) => setEndIp(e.target.value)}
              placeholder="e.g. 192.168.1.50"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleConvert}>Calculate CIDR Blocks</Button>
        </div>

        {cidrList && (
          <TextArea
            label="Minimal CIDR Subnets List"
            readOnly
            copyable
            value={cidrList.join("\n")}
            rows={Math.min(10, Math.max(3, cidrList.length))}
          />
        )}
      </div>
    </ToolContainer>
  );
}
