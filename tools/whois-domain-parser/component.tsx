"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

interface ParsedWhois {
  domainName: string;
  registrar: string;
  creationDate: string;
  expiryDate: string;
  updatedDate: string;
  domainStatus: string[];
  nameServers: string[];
  dnssec: string;
}

function parseWhois(raw: string): ParsedWhois {
  const lines = raw.split("\n");
  let domainName = "";
  let registrar = "";
  let creationDate = "";
  let expiryDate = "";
  let updatedDate = "";
  const domainStatus: string[] = [];
  const nameServers: string[] = [];
  let dnssec = "unsigned";

  lines.forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim().toLowerCase();
      const val = line.substring(colonIdx + 1).trim();

      if (key.includes("domain name")) domainName = val;
      else if (key.includes("registrar") && !key.includes("url") && !key.includes("whois")) registrar = val;
      else if (key.includes("creation date") || key.includes("created")) creationDate = val;
      else if (key.includes("registry expiry date") || key.includes("expiration date") || key.includes("expires")) expiryDate = val;
      else if (key.includes("updated date")) updatedDate = val;
      else if (key.includes("domain status")) {
        const cleanStatus = val.split(" ")[0];
        if (cleanStatus && !domainStatus.includes(cleanStatus)) domainStatus.push(cleanStatus);
      } else if (key.includes("name server")) {
        const cleanNs = val.toLowerCase();
        if (cleanNs && !nameServers.includes(cleanNs)) nameServers.push(cleanNs);
      } else if (key.includes("dnssec")) dnssec = val;
    }
  });

  return { domainName, registrar, creationDate, expiryDate, updatedDate, domainStatus, nameServers, dnssec };
}

export default function WhoisDomainParserTool() {
  const [whoisRaw, setWhoisRaw] = useState(
    `Domain Name: toolsnippet.com\n` +
    `Registry Domain ID: 2658821901_DOMAIN_COM-VRSN\n` +
    `Registrar WHOIS Server: whois.cloudflare.com\n` +
    `Registrar: Cloudflare, Inc.\n` +
    `Registrar IANA ID: 1910\n` +
    `Updated Date: 2026-01-15T08:12:00Z\n` +
    `Creation Date: 2024-03-20T14:22:00Z\n` +
    `Registry Expiry Date: 2028-03-20T14:22:00Z\n` +
    `Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\n` +
    `Name Server: DINA.NS.CLOUDFLARE.COM\n` +
    `Name Server: ERIC.NS.CLOUDFLARE.COM\n` +
    `DNSSEC: unsigned`
  );
  const [parsed, setParsed] = useState<ParsedWhois | null>(() => parseWhois(whoisRaw));

  const handleParse = () => {
    if (!whoisRaw.trim()) return;
    setParsed(parseWhois(whoisRaw));
  };

  return (
    <ToolContainer
      title="WHOIS Record & RDAP Parser"
      description="Parse raw WHOIS query text into structured registration details, expiry dates, and nameservers."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <TextArea
          label="Raw WHOIS Text Output"
          value={whoisRaw}
          onChange={(e) => setWhoisRaw(e.target.value)}
          placeholder="Paste raw WHOIS terminal output..."
          rows={7}
        />

        <div className="flex gap-2">
          <Button onClick={handleParse}>Parse WHOIS Record</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setWhoisRaw("");
              setParsed(null);
            }}
            disabled={!whoisRaw && !parsed}
          >
            Clear
          </Button>
        </div>

        {parsed && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Domain Name</span>
              <div className="text-lg font-bold font-mono text-primary mt-1">
                {parsed.domainName || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Registrar</span>
              <div className="text-base font-bold text-gray-900 dark:text-white mt-1">
                {parsed.registrar || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Expiry Date</span>
              <div className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
                {parsed.expiryDate || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Registration Date</span>
              <div className="text-sm font-mono text-gray-900 dark:text-white mt-1">
                {parsed.creationDate || "—"}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">Name Servers ({parsed.nameServers.length})</span>
              <div className="text-xs font-mono text-gray-900 dark:text-white mt-1 space-y-0.5">
                {parsed.nameServers.map((ns) => (
                  <div key={ns}>{ns}</div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
              <span className="text-xs uppercase font-semibold text-gray-500">DNSSEC & Status</span>
              <div className="text-xs font-mono text-gray-900 dark:text-white mt-1 space-y-1">
                <div>DNSSEC: <span className="font-semibold text-primary">{parsed.dnssec}</span></div>
                <div>Status: {parsed.domainStatus.join(", ") || "Active"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
