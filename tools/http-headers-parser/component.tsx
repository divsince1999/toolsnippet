"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

interface SecurityAudit {
  name: string;
  present: boolean;
  value?: string;
  recommendation: string;
}

export default function HttpHeadersParserTool() {
  const [rawHeaders, setRawHeaders] = useState(
    `HTTP/2 200 OK\n` +
    `content-type: application/json; charset=utf-8\n` +
    `content-length: 1024\n` +
    `strict-transport-security: max-age=31536000; includeSubDomains; preload\n` +
    `x-content-type-options: nosniff\n` +
    `x-frame-options: DENY\n` +
    `server: cloudflare\n` +
    `cache-control: public, max-age=3600`
  );
  const [parsedHeaders, setParsedHeaders] = useState<Record<string, string> | null>(null);
  const [securityAudits, setSecurityAudits] = useState<SecurityAudit[] | null>(null);

  const parseHeaders = () => {
    if (!rawHeaders.trim()) return;

    const lines = rawHeaders.split("\n").map((l) => l.trim()).filter(Boolean);
    const headersObj: Record<string, string> = {};

    lines.forEach((line) => {
      if (line.startsWith("HTTP/")) return; // skip status line
      const colonIdx = line.indexOf(":");
      if (colonIdx > 0) {
        const key = line.substring(0, colonIdx).trim().toLowerCase();
        const value = line.substring(colonIdx + 1).trim();
        headersObj[key] = value;
      }
    });

    const audits: SecurityAudit[] = [
      {
        name: "Strict-Transport-Security (HSTS)",
        present: Boolean(headersObj["strict-transport-security"]),
        value: headersObj["strict-transport-security"],
        recommendation: "Enforces secure HTTPS connections and protects against downgrade attacks.",
      },
      {
        name: "Content-Security-Policy (CSP)",
        present: Boolean(headersObj["content-security-policy"]),
        value: headersObj["content-security-policy"],
        recommendation: "Restricts resource loading to prevent XSS attacks and malicious injections.",
      },
      {
        name: "X-Frame-Options",
        present: Boolean(headersObj["x-frame-options"]),
        value: headersObj["x-frame-options"],
        recommendation: "Protects against clickjacking by preventing embedding in iframes.",
      },
      {
        name: "X-Content-Type-Options",
        present: Boolean(headersObj["x-content-type-options"]),
        value: headersObj["x-content-type-options"],
        recommendation: "Prevents MIME-sniffing vulnerabilities by enforcing declared content-type.",
      },
      {
        name: "Referrer-Policy",
        present: Boolean(headersObj["referrer-policy"]),
        value: headersObj["referrer-policy"],
        recommendation: "Controls how much referrer information is sent with outbound requests.",
      },
      {
        name: "Permissions-Policy",
        present: Boolean(headersObj["permissions-policy"]),
        value: headersObj["permissions-policy"],
        recommendation: "Restricts access to browser features like camera, microphone, and geolocation.",
      },
    ];

    setParsedHeaders(headersObj);
    setSecurityAudits(audits);
  };

  const jsonOutput = parsedHeaders ? JSON.stringify(parsedHeaders, null, 2) : "";

  return (
    <ToolContainer
      title="HTTP Headers Parser & Security Audit"
      description="Parse raw HTTP request and response headers into structured JSON and perform an instant security audit."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <TextArea
          label="Raw HTTP Headers"
          value={rawHeaders}
          onChange={(e) => setRawHeaders(e.target.value)}
          placeholder="Paste raw HTTP headers (e.g. from curl -I or Network tab)..."
          rows={7}
        />

        <div className="flex gap-2">
          <Button onClick={parseHeaders}>Parse Headers & Audit Security</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setRawHeaders("");
              setParsedHeaders(null);
              setSecurityAudits(null);
            }}
            disabled={!rawHeaders && !parsedHeaders}
          >
            Clear
          </Button>
        </div>

        {parsedHeaders && (
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Parsed Headers (JSON)"
              readOnly
              copyable
              value={jsonOutput}
              rows={12}
            />

            <div className="rounded-2xl border border-black/10 p-5 dark:border-white/10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                Security Headers Audit
              </h3>

              <div className="space-y-3">
                {securityAudits?.map((audit) => (
                  <div
                    key={audit.name}
                    className={`rounded-xl border p-3 text-xs transition ${
                      audit.present
                        ? "border-green-500/20 bg-green-500/5 text-green-900 dark:text-green-300"
                        : "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{audit.name}</span>
                      <span>{audit.present ? "✓ Present" : "⚠ Missing"}</span>
                    </div>
                    {audit.value && (
                      <div className="mt-1 font-mono text-[11px] break-all opacity-80">
                        {audit.value}
                      </div>
                    )}
                    <div className="mt-1 text-[11px] opacity-75">
                      {audit.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
