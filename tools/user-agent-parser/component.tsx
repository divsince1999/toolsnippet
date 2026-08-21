"use client";

import { useState } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

interface ParsedUa {
  browser: string;
  browserVersion: string;
  os: string;
  deviceType: string;
  engine: string;
  isBot: boolean;
}

function parseUserAgent(ua: string): ParsedUa {
  let browser = "Unknown Browser";
  let browserVersion = "Unknown";
  let os = "Unknown OS";
  let deviceType = "Desktop";
  let engine = "Unknown Engine";
  let isBot = false;

  const lower = ua.toLowerCase();

  // Bot detection
  if (lower.includes("googlebot") || lower.includes("bingbot") || lower.includes("yandex") || lower.includes("duckduckbot") || lower.includes("slurp") || lower.includes("baiduspider") || lower.includes("ahrefs") || lower.includes("semrush")) {
    isBot = true;
    deviceType = "Web Crawler / Bot";
  }

  // Device detection
  if (lower.includes("mobile") || lower.includes("android") || lower.includes("iphone")) {
    deviceType = "Mobile Device";
  } else if (lower.includes("ipad") || lower.includes("tablet")) {
    deviceType = "Tablet";
  }

  // OS detection
  if (ua.includes("Windows NT 10.0")) os = "Windows 10 / 11";
  else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
  else if (ua.includes("Mac OS X")) {
    const match = ua.match(/Mac OS X ([0-9_]+)/);
    os = `macOS ${match ? match[1].replace(/_/g, ".") : ""}`;
  } else if (ua.includes("Android")) {
    const match = ua.match(/Android ([0-9.]+)/);
    os = `Android ${match ? match[1] : ""}`;
  } else if (ua.includes("iPhone OS") || ua.includes("iOS")) {
    const match = ua.match(/OS ([0-9_]+)/);
    os = `iOS ${match ? match[1].replace(/_/g, ".") : ""}`;
  } else if (ua.includes("Linux")) os = "Linux";

  // Browser detection
  if (ua.includes("Edg/")) {
    browser = "Microsoft Edge";
    engine = "Blink / Chromium";
    browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    browser = "Google Chrome";
    engine = "Blink / Chromium";
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (ua.includes("Firefox/")) {
    browser = "Mozilla Firefox";
    engine = "Gecko";
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
    browser = "Apple Safari";
    engine = "WebKit";
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
  }

  return { browser, browserVersion, os, deviceType, engine, isBot };
}

export default function UserAgentParserTool() {
  const [uaInput, setUaInput] = useState(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
  );
  const [parsed, setParsed] = useState<ParsedUa>(() => parseUserAgent(uaInput));

  const handleParse = (val: string) => {
    setUaInput(val);
    setParsed(parseUserAgent(val));
  };

  const detectMyBrowser = () => {
    if (typeof window !== "undefined" && navigator.userAgent) {
      handleParse(navigator.userAgent);
    }
  };

  return (
    <ToolContainer
      title="User-Agent Parser & Device Inspector"
      description="Parse raw User-Agent headers to detect browser, version, operating system, rendering engine, and device type."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold uppercase text-gray-500">
              User-Agent String
            </label>
            <button
              type="button"
              onClick={detectMyBrowser}
              className="text-xs text-primary font-medium hover:underline"
            >
              🌐 Detect My Current Browser
            </button>
          </div>
          <TextArea
            value={uaInput}
            onChange={(e) => handleParse(e.target.value)}
            placeholder="Paste User-Agent header..."
            rows={3}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <span className="text-xs uppercase font-semibold text-gray-500">Browser & Version</span>
            <div className="text-lg font-bold text-primary mt-1">
              {parsed.browser}
            </div>
            <div className="text-xs font-mono text-gray-500 mt-0.5">
              Version: {parsed.browserVersion}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <span className="text-xs uppercase font-semibold text-gray-500">Operating System</span>
            <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {parsed.os}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <span className="text-xs uppercase font-semibold text-gray-500">Device Category</span>
            <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {parsed.deviceType}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <span className="text-xs uppercase font-semibold text-gray-500">Rendering Engine</span>
            <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {parsed.engine}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 p-5 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
            <span className="text-xs uppercase font-semibold text-gray-500">Bot / Crawler Status</span>
            <div className="text-lg font-bold mt-1">
              <span className={parsed.isBot ? "text-amber-500" : "text-green-600 dark:text-green-400"}>
                {parsed.isBot ? "🤖 Verified Crawler" : "👤 Human User Client"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
