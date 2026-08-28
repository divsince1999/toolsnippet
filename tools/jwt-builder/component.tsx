"use client";

import { useState, useEffect } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function signJwtHmac(
  headerJson: string,
  payloadJson: string,
  secret: string,
  alg: "HS256" | "HS384" | "HS512" | "none"
): Promise<{ token: string; headerB64: string; payloadB64: string; sigB64: string; error?: string }> {
  try {
    const headerB64 = base64UrlEncode(headerJson);
    const payloadB64 = base64UrlEncode(payloadJson);
    const unsigned = `${headerB64}.${payloadB64}`;

    if (alg === "none") {
      return { token: `${unsigned}.`, headerB64, payloadB64, sigB64: "" };
    }

    if (!secret) {
      return { token: unsigned, headerB64, payloadB64, sigB64: "", error: "Secret key is required for HMAC signing" };
    }

    const hashName = alg === "HS256" ? "SHA-256" : alg === "HS384" ? "SHA-384" : "SHA-512";
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: hashName },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(unsigned));
    const sigB64 = bufferToBase64Url(signature);
    const token = `${unsigned}.${sigB64}`;

    return { token, headerB64, payloadB64, sigB64 };
  } catch (err: unknown) {
    return {
      token: "",
      headerB64: "",
      payloadB64: "",
      sigB64: "",
      error: err instanceof Error ? err.message : "Error generating JWT",
    };
  }
}

export default function JwtBuilderTool() {
  const [alg, setAlg] = useState<"HS256" | "HS384" | "HS512" | "none">("HS256");
  const [headerStr, setHeaderStr] = useState(
    JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)
  );
  const [payloadStr, setPayloadStr] = useState(
    JSON.stringify(
      {
        sub: "user_94821",
        name: "Alex Rivera",
        role: "admin",
        iat: 1772000000,
        exp: 1772086400,
      },
      null,
      2
    )
  );
  const [secret, setSecret] = useState("my-super-secret-key-32-chars-long!");
  const [tokenResult, setTokenResult] = useState<{
    token: string;
    headerB64: string;
    payloadB64: string;
    sigB64: string;
    error?: string;
  }>({
    token: "",
    headerB64: "",
    payloadB64: "",
    sigB64: "",
  });
  const [copied, setCopied] = useState(false);

  // Update header on alg change
  const handleAlgChange = (newAlg: "HS256" | "HS384" | "HS512" | "none") => {
    setAlg(newAlg);
    try {
      const parsed = JSON.parse(headerStr);
      parsed.alg = newAlg;
      setHeaderStr(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  };

  const addExpirationSeconds = (seconds: number) => {
    try {
      const parsed = JSON.parse(payloadStr);
      const now = Math.floor(Date.now() / 1000);
      parsed.iat = now;
      parsed.exp = now + seconds;
      setPayloadStr(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  };

  const generateRandomSecret = () => {
    const array = new Uint8Array(24);
    crypto.getRandomValues(array);
    const rand = Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
    setSecret(rand);
  };

  useEffect(() => {
    let isMounted = true;
    signJwtHmac(headerStr, payloadStr, secret, alg).then((res) => {
      if (isMounted) {
        setTokenResult(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [headerStr, payloadStr, secret, alg]);

  const handleCopy = () => {
    if (tokenResult.token) {
      navigator.clipboard.writeText(tokenResult.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolContainer
      title="JWT Builder & Signer"
      description="Build, sign, and verify JSON Web Tokens (JWT) with HMAC-SHA256, custom payload claims, and instant expiration calculations 100% in-browser."
    >
      <div className="space-y-6">
        {/* Alg & Secret Header */}
        <div className="grid gap-4 sm:grid-cols-12 rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="sm:col-span-4 space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Algorithm (HMAC)
            </label>
            <select
              value={alg}
              onChange={(e) => handleAlgChange(e.target.value as "HS256" | "HS384" | "HS512" | "none")}
              className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-xs font-semibold dark:border-white/15 dark:bg-zinc-800"
            >
              <option value="HS256">HS256 (HMAC-SHA256)</option>
              <option value="HS384">HS384 (HMAC-SHA384)</option>
              <option value="HS512">HS512 (HMAC-SHA512)</option>
              <option value="none">none (Unsigned)</option>
            </select>
          </div>

          <div className="sm:col-span-8 space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Signing Secret Key
              </label>
              <button
                type="button"
                onClick={generateRandomSecret}
                className="text-[11px] text-primary-solid hover:underline"
              >
                ⚡ Generate Random Key
              </button>
            </div>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter HMAC signing secret..."
              className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 font-mono text-xs text-gray-900 shadow-xs outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* 2-Column Workstation: Header & Payload */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Header Editor */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-rose-500">
              Header JSON (Algorithm &amp; Token Type)
            </label>
            <TextArea
              value={headerStr}
              onChange={(e) => setHeaderStr(e.target.value)}
              rows={6}
              className="font-mono text-xs border-rose-500/30 focus:border-rose-500"
            />
          </div>

          {/* Payload Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-500">
                Payload JSON (Claims &amp; Data)
              </label>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="text-gray-500">Set exp:</span>
                <button
                  type="button"
                  onClick={() => addExpirationSeconds(900)}
                  className="rounded bg-black/5 px-1.5 py-0.5 hover:bg-primary-solid hover:text-white dark:bg-white/5"
                >
                  +15m
                </button>
                <button
                  type="button"
                  onClick={() => addExpirationSeconds(3600)}
                  className="rounded bg-black/5 px-1.5 py-0.5 hover:bg-primary-solid hover:text-white dark:bg-white/5"
                >
                  +1h
                </button>
                <button
                  type="button"
                  onClick={() => addExpirationSeconds(86400)}
                  className="rounded bg-black/5 px-1.5 py-0.5 hover:bg-primary-solid hover:text-white dark:bg-white/5"
                >
                  +24h
                </button>
                <button
                  type="button"
                  onClick={() => addExpirationSeconds(604800)}
                  className="rounded bg-black/5 px-1.5 py-0.5 hover:bg-primary-solid hover:text-white dark:bg-white/5"
                >
                  +7d
                </button>
              </div>
            </div>
            <TextArea
              value={payloadStr}
              onChange={(e) => setPayloadStr(e.target.value)}
              rows={10}
              className="font-mono text-xs border-purple-500/30 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Signed JWT Output Banner */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated Signed JWT:
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!tokenResult.token}
              className="h-7 text-xs"
            >
              {copied ? "✓ Copied Token" : "Copy Signed JWT"}
            </Button>
          </div>

          {/* Color-Coded Token Card */}
          <div className="rounded-2xl border border-black/15 bg-white p-4 font-mono text-xs break-all shadow-xs dark:border-white/15 dark:bg-zinc-950">
            {tokenResult.error ? (
              <span className="text-rose-500">{tokenResult.error}</span>
            ) : (
              <>
                <span className="text-rose-500 font-bold">{tokenResult.headerB64}</span>
                <span className="text-gray-400">.</span>
                <span className="text-purple-500 font-bold">{tokenResult.payloadB64}</span>
                {tokenResult.sigB64 && (
                  <>
                    <span className="text-gray-400">.</span>
                    <span className="text-sky-500 font-bold">{tokenResult.sigB64}</span>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Header
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Payload
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Signature
            </span>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
