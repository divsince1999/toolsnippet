"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DnsRecordGeneratorTool() {
  const [recordType, setRecordType] = useState<"A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SRV">("A");
  const [name, setName] = useState("@");
  const [value, setValue] = useState("192.0.2.1");
  const [ttl, setTtl] = useState(3600);
  const [priority, setPriority] = useState(10);
  const [txtPreset, setTxtPreset] = useState<"custom" | "spf" | "dmarc">("custom");

  const handleTxtPreset = (preset: "custom" | "spf" | "dmarc") => {
    setTxtPreset(preset);
    if (preset === "spf") {
      setName("@");
      setValue("v=spf1 include:_spf.google.com ~all");
    } else if (preset === "dmarc") {
      setName("_dmarc");
      setValue("v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100; sp=reject");
    }
  };

  const bindRecord = useMemo(() => {
    const cleanName = name.trim() || "@";
    const cleanVal = value.trim();

    if (recordType === "MX") {
      return `${cleanName.padEnd(20)} ${ttl}  IN  MX    ${priority}  ${cleanVal}.`;
    }
    if (recordType === "TXT") {
      return `${cleanName.padEnd(20)} ${ttl}  IN  TXT   "${cleanVal}"`;
    }
    if (recordType === "CNAME") {
      return `${cleanName.padEnd(20)} ${ttl}  IN  CNAME ${cleanVal.endsWith(".") ? cleanVal : cleanVal + "."}`;
    }
    return `${cleanName.padEnd(20)} ${ttl}  IN  ${recordType.padEnd(5)} ${cleanVal}`;
  }, [recordType, name, value, ttl, priority]);

  return (
    <ToolContainer
      title="DNS Zone Record Generator (BIND / RFC 1035)"
      description="Create formatted A, AAAA, CNAME, MX, TXT (SPF/DMARC), and SRV records for Cloudflare, Route53, and BIND."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              DNS Record Type
            </label>
            <select
              value={recordType}
              onChange={(e) => {
                const t = e.target.value as typeof recordType;
                setRecordType(t);
                if (t === "A") setValue("192.0.2.1");
                else if (t === "AAAA") setValue("2001:db8::1");
                else if (t === "CNAME") setValue("app.example.com");
                else if (t === "MX") setValue("mail.example.com");
                else if (t === "TXT") setValue("v=spf1 include:_spf.google.com ~all");
              }}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="A">A — IPv4 Host Address</option>
              <option value="AAAA">AAAA — IPv6 Host Address</option>
              <option value="CNAME">CNAME — Canonical Name Alias</option>
              <option value="MX">MX — Mail Exchange Server</option>
              <option value="TXT">TXT — Text Record (SPF, DKIM, DMARC)</option>
              <option value="SRV">SRV — Service Locator</option>
            </select>
          </div>

          {recordType === "TXT" && (
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleTxtPreset("spf")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  txtPreset === "spf" ? "bg-primary text-white" : "border border-black/10 hover:bg-black/5 dark:border-white/10"
                }`}
              >
                SPF Preset
              </button>
              <button
                type="button"
                onClick={() => handleTxtPreset("dmarc")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  txtPreset === "dmarc" ? "bg-primary text-white" : "border border-black/10 hover:bg-black/5 dark:border-white/10"
                }`}
              >
                DMARC Preset
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Host / Name (@ for apex root, subdomain e.g. www, api)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Target Value / Content
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                TTL (Seconds)
              </label>
              <input
                type="number"
                value={ttl}
                onChange={(e) => setTtl(Number(e.target.value))}
                className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
              />
            </div>

            {recordType === "MX" && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Priority (MX)
                </label>
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="BIND Zone File Line (RFC 1035)"
            readOnly
            copyable
            value={bindRecord}
            rows={4}
          />

          <TextArea
            label="Cloudflare / Terraform JSON Import Format"
            readOnly
            copyable
            value={JSON.stringify(
              {
                type: recordType,
                name: name,
                content: value,
                ttl: ttl,
                ...(recordType === "MX" ? { priority: priority } : {}),
              },
              null,
              2
            )}
            rows={7}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
