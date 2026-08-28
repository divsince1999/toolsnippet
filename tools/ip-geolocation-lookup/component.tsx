"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";

function ipToLong(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

function analyzeIp(ipStr: string, cidr: number) {
  const clean = ipStr.trim();
  const isV4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(clean);
  const isV6 = /^[0-9a-fA-F:]+$/.test(clean) && clean.includes(":");

  if (!isV4 && !isV6) {
    return {
      isValid: false,
      version: "Invalid",
      scope: "Unknown",
      ipClass: "Unknown",
      binary: "-",
      hex: "-",
      decimalInt: "-",
      subnetMask: "-",
      wildcardMask: "-",
      networkAddress: "-",
      broadcastAddress: "-",
      firstUsable: "-",
      lastUsable: "-",
      totalHosts: 0,
      usableHosts: 0,
    };
  }

  if (isV6) {
    return {
      isValid: true,
      version: "IPv6 (128-bit)",
      scope: clean === "::1" ? "Loopback" : clean.startsWith("fe80:") ? "Link-Local" : "Global Unicast",
      ipClass: "IPv6 Standard",
      binary: "128-bit Hexadecimal notation",
      hex: clean,
      decimalInt: "-",
      subnetMask: "/64 (Standard SLAAC)",
      wildcardMask: "-",
      networkAddress: clean,
      broadcastAddress: "-",
      firstUsable: clean,
      lastUsable: "-",
      totalHosts: Math.pow(2, 64),
      usableHosts: Math.pow(2, 64),
    };
  }

  // IPv4 calculations
  const octets = clean.split(".").map(Number);
  if (octets.some((o) => o < 0 || o > 255)) {
    return { isValid: false, version: "Invalid Octet Range", scope: "-", ipClass: "-", binary: "-", hex: "-", decimalInt: "-", subnetMask: "-", wildcardMask: "-", networkAddress: "-", broadcastAddress: "-", firstUsable: "-", lastUsable: "-", totalHosts: 0, usableHosts: 0 };
  }

  const first = octets[0];
  let ipClass = "Class A";
  if (first >= 128 && first <= 191) ipClass = "Class B";
  else if (first >= 192 && first <= 223) ipClass = "Class C";
  else if (first >= 224 && first <= 239) ipClass = "Class D (Multicast)";
  else if (first >= 240) ipClass = "Class E (Experimental)";

  let scope = "Public Internet";
  if (first === 10 || (first === 172 && octets[1] >= 16 && octets[1] <= 31) || (first === 192 && octets[1] === 168)) {
    scope = "Private (RFC 1918)";
  } else if (first === 127) {
    scope = "Loopback (Localhost)";
  } else if (first === 169 && octets[1] === 254) {
    scope = "Link-Local (APIPA)";
  } else if (first === 100 && octets[1] >= 64 && octets[1] <= 127) {
    scope = "Carrier-Grade NAT (CGNAT)";
  }

  const binary = octets.map((o) => o.toString(2).padStart(8, "0")).join(".");
  const hex = "0x" + octets.map((o) => o.toString(16).padStart(2, "0").toUpperCase()).join("");
  const ipLong = ipToLong(clean);

  // Subnet calculations
  const maskLong = (0xffffffff << (32 - cidr)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;
  const netLong = (ipLong & maskLong) >>> 0;
  const bcastLong = (netLong | wildcardLong) >>> 0;

  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  const firstUsable = cidr >= 31 ? longToIp(netLong) : longToIp(netLong + 1);
  const lastUsable = cidr >= 31 ? longToIp(bcastLong) : longToIp(bcastLong - 1);

  return {
    isValid: true,
    version: "IPv4 (32-bit)",
    scope,
    ipClass,
    binary,
    hex,
    decimalInt: ipLong.toString(),
    subnetMask: longToIp(maskLong),
    wildcardMask: longToIp(wildcardLong),
    networkAddress: longToIp(netLong),
    broadcastAddress: longToIp(bcastLong),
    firstUsable,
    lastUsable,
    totalHosts,
    usableHosts,
  };
}

export default function IpGeolocationLookupTool() {
  const [ipInput, setIpInput] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(24);
  const [detecting, setDetecting] = useState(false);

  const data = useMemo(() => analyzeIp(ipInput, cidr), [ipInput, cidr]);

  const handleDetectMyIp = async () => {
    setDetecting(true);
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const json = await res.json();
      if (json.ip) {
        setIpInput(json.ip);
      }
    } catch {
      // Fallback
    } finally {
      setDetecting(false);
    }
  };

  return (
    <ToolContainer
      title="IP Address & Subnet Inspector"
      description="Inspect IPv4/IPv6 addresses, determine private/public scope, calculate subnet masks, and convert between binary, hex, and integer notations."
    >
      <div className="space-y-6">
        {/* Input Bar & Actions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              IP Address (IPv4 or IPv6):
            </label>
            <button
              type="button"
              onClick={handleDetectMyIp}
              disabled={detecting}
              className="text-xs font-semibold text-primary-solid hover:underline"
            >
              {detecting ? "Detecting..." : "⚡ Detect My Public IP"}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="e.g. 192.168.1.1 or 8.8.8.8"
              className="flex-1 rounded-xl border border-black/15 bg-white px-4 py-2.5 font-mono text-base font-bold text-gray-900 shadow-xs outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* CIDR Slider (for IPv4) */}
        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Subnet Mask CIDR Prefix: <span className="font-mono text-primary-solid font-bold">/{cidr}</span>
            </label>
            <span className="font-mono text-xs text-gray-500">
              Mask: {data.subnetMask}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="mt-2 w-full accent-primary-solid cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-[10px] text-gray-400">
            <span>/1 (2B Hosts)</span>
            <span>/16 (65K Hosts)</span>
            <span>/24 (254 Hosts)</span>
            <span>/32 (1 Host)</span>
          </div>
        </div>

        {/* IP Classification Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-black/10 bg-white p-3.5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">IP Version</span>
            <div className="mt-1 font-mono text-sm font-bold text-gray-900 dark:text-white">
              {data.version}
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-3.5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Routing Scope</span>
            <div className="mt-1 font-mono text-sm font-bold text-primary-solid">
              {data.scope}
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-3.5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Address Class</span>
            <div className="mt-1 font-mono text-sm font-bold text-gray-900 dark:text-white">
              {data.ipClass}
            </div>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-3.5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Usable Hosts</span>
            <div className="mt-1 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {data.usableHosts.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Subnet Boundaries Table */}
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Subnet Calculations (/{cidr})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 text-xs font-mono">
            <div className="space-y-2">
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">Network Address:</span>
                <span className="font-bold text-gray-900 dark:text-white">{data.networkAddress}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">Broadcast Address:</span>
                <span className="font-bold text-gray-900 dark:text-white">{data.broadcastAddress}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">Wildcard Mask:</span>
                <span className="font-bold text-gray-900 dark:text-white">{data.wildcardMask}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">First Usable Host:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{data.firstUsable}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">Last Usable Host:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{data.lastUsable}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-1.5 dark:border-white/5">
                <span className="text-gray-500">Total IP Block:</span>
                <span className="font-bold text-gray-900 dark:text-white">{data.totalHosts.toLocaleString()} IPs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Base Representations */}
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Multi-Base Representations
          </h3>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg bg-black/5 p-2 dark:bg-white/5">
              <span className="text-gray-500 text-[11px]">Binary (32-bit):</span>
              <span className="font-bold text-gray-900 dark:text-white break-all">{data.binary}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg bg-black/5 p-2 dark:bg-white/5">
              <span className="text-gray-500 text-[11px]">Hexadecimal:</span>
              <span className="font-bold text-gray-900 dark:text-white">{data.hex}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg bg-black/5 p-2 dark:bg-white/5">
              <span className="text-gray-500 text-[11px]">Decimal Integer:</span>
              <span className="font-bold text-gray-900 dark:text-white">{data.decimalInt}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
