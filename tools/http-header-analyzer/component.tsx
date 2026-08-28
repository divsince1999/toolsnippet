"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";

interface HeaderRule {
  key: string;
  name: string;
  weight: number;
  description: string;
  recommended: string;
}

const SECURITY_RULES: HeaderRule[] = [
  {
    key: "content-security-policy",
    name: "Content-Security-Policy (CSP)",
    weight: 25,
    description: "Restricts resource loading (scripts, styles, images) to prevent Cross-Site Scripting (XSS) and injection attacks.",
    recommended: "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';",
  },
  {
    key: "strict-transport-security",
    name: "Strict-Transport-Security (HSTS)",
    weight: 25,
    description: "Enforces TLS/HTTPS encryption on all browser connections and prevents SSL stripping attacks.",
    recommended: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "x-frame-options",
    name: "X-Frame-Options",
    weight: 15,
    description: "Prevents your site from being embedded in iframes on malicious third-party domains (Clickjacking defense).",
    recommended: "DENY or SAMEORIGIN",
  },
  {
    key: "x-content-type-options",
    name: "X-Content-Type-Options",
    weight: 15,
    description: "Prevents browsers from MIME-sniffing a response away from the declared content-type.",
    recommended: "nosniff",
  },
  {
    key: "referrer-policy",
    name: "Referrer-Policy",
    weight: 10,
    description: "Controls how much referrer information (paths, parameters) is sent during outbound navigation.",
    recommended: "strict-origin-when-cross-origin",
  },
  {
    key: "permissions-policy",
    name: "Permissions-Policy",
    weight: 10,
    description: "Restricts access to sensitive browser features (camera, microphone, geolocation).",
    recommended: "camera=(), microphone=(), geolocation=()",
  },
];

function analyzeHeaders(raw: string) {
  const lines = raw.split("\n");
  const headersMap: Record<string, string> = {};

  for (const line of lines) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const k = line.slice(0, colon).trim().toLowerCase();
    const v = line.slice(colon + 1).trim();
    headersMap[k] = v;
  }

  let totalScore = 0;
  const auditResults = SECURITY_RULES.map((rule) => {
    const present = rule.key in headersMap;
    const value = headersMap[rule.key] || "";
    if (present) {
      totalScore += rule.weight;
    }
    return {
      ...rule,
      present,
      value,
    };
  });

  // Check information leakages
  const leaks: string[] = [];
  if (headersMap["x-powered-by"]) {
    leaks.push(`Exposed backend framework banner in 'X-Powered-By: ${headersMap["x-powered-by"]}'`);
    totalScore = Math.max(0, totalScore - 10);
  }
  if (headersMap["server"] && (headersMap["server"].includes("/") || headersMap["server"].match(/\d/))) {
    leaks.push(`Exposed server version banner in 'Server: ${headersMap["server"]}'`);
    totalScore = Math.max(0, totalScore - 5);
  }

  let grade = "F";
  if (totalScore >= 95) grade = "A+";
  else if (totalScore >= 85) grade = "A";
  else if (totalScore >= 70) grade = "B";
  else if (totalScore >= 50) grade = "C";
  else if (totalScore >= 30) grade = "D";

  return {
    headersMap,
    auditResults,
    leaks,
    score: totalScore,
    grade,
    headerCount: Object.keys(headersMap).length,
  };
}

const SAMPLE_SECURE_HEADERS = `HTTP/2 200 OK
content-type: text/html; charset=utf-8
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline';
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
cache-control: public, max-age=3600, must-revalidate`;

const SAMPLE_VULNERABLE_HEADERS = `HTTP/1.1 200 OK
Server: Apache/2.4.41 (Ubuntu)
X-Powered-By: PHP/7.4.3
Content-Type: text/html; charset=UTF-8
Set-Cookie: sessionid=9482710492; path=/; HttpOnly`;

export default function HttpHeaderAnalyzerTool() {
  const [headersInput, setHeadersInput] = useState(SAMPLE_SECURE_HEADERS);

  const analysis = useMemo(() => analyzeHeaders(headersInput), [headersInput]);

  return (
    <ToolContainer
      title="HTTP Security Header Analyzer"
      description="Inspect HTTP response headers, audit security defense policies, and calculate your site's security health score in real-time."
    >
      <div className="space-y-6">
        {/* Scorecard Hero Banner */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Security Grade</span>
            <div className={`mt-2 font-mono text-3xl font-extrabold ${analysis.score >= 85 ? "text-emerald-600 dark:text-emerald-400" : analysis.score >= 50 ? "text-amber-500" : "text-rose-500"}`}>
              {analysis.grade}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Security Score</span>
            <div className="mt-2 font-mono text-3xl font-extrabold text-primary-solid">
              {analysis.score} / 100
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Headers Audited</span>
            <div className="mt-2 font-mono text-3xl font-extrabold text-gray-900 dark:text-white">
              {analysis.headerCount}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <span className="text-xs text-gray-500">Leakage Alerts</span>
            <div className={`mt-2 font-mono text-3xl font-extrabold ${analysis.leaks.length === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>
              {analysis.leaks.length}
            </div>
          </div>
        </div>

        {/* Presets Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Header Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Hardened Production (A+)", raw: SAMPLE_SECURE_HEADERS },
              { label: "Legacy Vulnerable Server (F)", raw: SAMPLE_VULNERABLE_HEADERS },
              {
                label: "Default Cloudflare / Static",
                raw: `HTTP/2 200 OK\ncontent-type: text/html\nserver: cloudflare\nstrict-transport-security: max-age=15552000; includeSubDomains\nx-content-type-options: nosniff\ncf-ray: 8df9284-IAD`,
              },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setHeadersInput(p.raw)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Workstation */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Paste Raw HTTP Headers:
              </label>
              <button
                type="button"
                onClick={() => setHeadersInput("")}
                className="text-xs text-gray-500 hover:text-rose-500"
              >
                Clear
              </button>
            </div>
            <TextArea
              value={headersInput}
              onChange={(e) => setHeadersInput(e.target.value)}
              placeholder="Paste raw response headers from curl, DevTools Network tab, or server config..."
              rows={16}
              className="font-mono text-xs"
            />
          </div>

          {/* Right: Security Audit Checklist */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Mandatory Security Headers Audit:
            </span>

            {/* Information Leak Alerts */}
            {analysis.leaks.map((leak, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-medium text-rose-800 dark:text-rose-300"
              >
                ⚠️ <strong>Information Leak:</strong> {leak}
              </div>
            ))}

            <div className="space-y-2.5">
              {analysis.auditResults.map((r) => (
                <div
                  key={r.key}
                  className="rounded-xl border border-black/10 bg-white p-3.5 shadow-xs dark:border-white/10 dark:bg-zinc-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {r.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.present ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
                      {r.present ? "✓ Implemented" : "❌ Missing (-" + r.weight + " pts)"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-400">
                    {r.description}
                  </p>
                  {r.present ? (
                    <div className="mt-2 rounded bg-black/5 p-1.5 font-mono text-[10px] text-emerald-700 dark:bg-white/5 dark:text-emerald-300 break-all">
                      {r.value}
                    </div>
                  ) : (
                    <div className="mt-2 rounded bg-black/5 p-1.5 font-mono text-[10px] text-gray-600 dark:bg-white/5 dark:text-gray-400 break-all">
                      Recommended: {r.recommended}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
