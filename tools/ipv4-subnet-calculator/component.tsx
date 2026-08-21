"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

function ipToLong(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function longToIp(long: number): string {
  return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join(".");
}

export default function Ipv4SubnetCalculatorTool() {
  const [ip, setIp] = useState("192.168.1.150");
  const [cidr, setCidr] = useState(24);

  const subnetInfo = useMemo(() => {
    try {
      const parts = ip.trim().split(".");
      if (parts.length !== 4 || parts.some((p) => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
        return null;
      }

      const ipLong = ipToLong(ip.trim());
      const maskLong = (0xffffffff << (32 - cidr)) >>> 0;
      const wildcardLong = ~maskLong >>> 0;

      const networkLong = (ipLong & maskLong) >>> 0;
      const broadcastLong = (networkLong | wildcardLong) >>> 0;

      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : totalHosts - 2;

      const firstHostLong = cidr >= 31 ? networkLong : networkLong + 1;
      const lastHostLong = cidr >= 31 ? broadcastLong : broadcastLong - 1;

      // IP Class & Scope
      const firstOctet = Number(parts[0]);
      let ipClass = "A";
      if (firstOctet >= 128 && firstOctet <= 191) ipClass = "B";
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = "C";
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = "D (Multicast)";
      else if (firstOctet >= 240) ipClass = "E (Experimental)";

      const isPrivate =
        firstOctet === 10 ||
        (firstOctet === 172 && Number(parts[1]) >= 16 && Number(parts[1]) <= 31) ||
        (firstOctet === 192 && Number(parts[1]) === 168);

      return {
        ip: ip.trim(),
        cidr: `/${cidr}`,
        netmask: longToIp(maskLong),
        wildcard: longToIp(wildcardLong),
        network: longToIp(networkLong),
        broadcast: longToIp(broadcastLong),
        firstUsable: longToIp(firstHostLong),
        lastUsable: longToIp(lastHostLong),
        usableHosts: usableHosts.toLocaleString(),
        totalAddresses: totalHosts.toLocaleString(),
        ipClass: `Class ${ipClass} (${isPrivate ? "Private RFC 1918" : "Public Internet"})`,
        hexMask: `0x${maskLong.toString(16).toUpperCase()}`,
        binaryIp: parts.map((p) => Number(p).toString(2).padStart(8, "0")).join("."),
      };
    } catch {
      return null;
    }
  }, [ip, cidr]);

  return (
    <ToolContainer
      title="IPv4 Subnet Calculator & CIDR Analyzer"
      description="Calculate network address, broadcast, netmask, wildcard mask, and usable IP host ranges from CIDR."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              IPv4 Address
            </label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-base dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              CIDR Subnet Prefix
            </label>
            <select
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
            >
              {Array.from({ length: 32 }, (_, i) => 32 - i).map((c) => {
                const mask = longToIp((0xffffffff << (32 - c)) >>> 0);
                const hosts = c === 32 ? 1 : c === 31 ? 2 : Math.pow(2, 32 - c) - 2;
                return (
                  <option key={c} value={c}>
                    /{c} — Netmask {mask} ({hosts.toLocaleString()} hosts)
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {subnetInfo ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Network Address (CIDR)</span>
              <div className="text-xl font-bold font-mono text-primary mt-1">
                {subnetInfo.network} {subnetInfo.cidr}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Subnet Netmask</span>
              <div className="text-xl font-bold font-mono text-gray-900 dark:text-white mt-1">
                {subnetInfo.netmask}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Broadcast Address</span>
              <div className="text-xl font-bold font-mono text-gray-900 dark:text-white mt-1">
                {subnetInfo.broadcast}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Usable Host IP Range</span>
              <div className="text-sm font-bold font-mono text-gray-900 dark:text-white mt-1">
                {subnetInfo.firstUsable} – {subnetInfo.lastUsable}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Usable Hosts / Total</span>
              <div className="text-lg font-bold font-mono text-green-600 dark:text-green-400 mt-1">
                {subnetInfo.usableHosts} <span className="text-xs text-gray-400">({subnetInfo.totalAddresses} total)</span>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Wildcard Mask</span>
              <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                {subnetInfo.wildcard}
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] flex flex-wrap justify-between items-center gap-2 text-xs">
              <span className="text-gray-500 font-semibold uppercase">Classification: <span className="text-gray-900 dark:text-white font-mono">{subnetInfo.ipClass}</span></span>
              <span className="text-gray-500 font-semibold uppercase">Binary: <span className="text-gray-900 dark:text-white font-mono">{subnetInfo.binaryIp}</span></span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-center text-sm font-medium text-red-600">
            Please enter a valid IPv4 address (e.g. 192.168.1.100).
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
