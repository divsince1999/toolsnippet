"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function base64UrlEncode(str: string): string {
  const enc = new TextEncoder();
  const bytes = enc.encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
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
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const INITIAL_PAYLOAD = JSON.stringify(
  {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1770000000,
    exp: 1770086400,
  },
  null,
  2
);

export default function JwtGeneratorTool() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState(INITIAL_PAYLOAD);
  const [secretKey, setSecretKey] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const signJwt = async () => {
    try {
      // Validate JSON
      JSON.parse(header);
      JSON.parse(payload);

      if (!secretKey) throw new Error("Please enter a secret key.");

      const encodedHeader = base64UrlEncode(header);
      const encodedPayload = base64UrlEncode(payload);
      const dataToSign = `${encodedHeader}.${encodedPayload}`;

      const enc = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(secretKey),
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      );

      const signature = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        enc.encode(dataToSign)
      );

      const encodedSig = bufferToBase64Url(signature);
      setToken(`${dataToSign}.${encodedSig}`);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign JWT token.");
    }
  };

  const addExpiration = (hours: number) => {
    try {
      const p = JSON.parse(payload);
      const now = Math.floor(Date.now() / 1000);
      p.iat = now;
      p.exp = now + hours * 3600;
      setPayload(JSON.stringify(p, null, 2));
    } catch {
      // ignore
    }
  };

  return (
    <ToolContainer
      title="JWT Token Generator & Signer"
      description="Create, customize claims, and cryptographically sign JSON Web Tokens with HMAC-SHA256."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <TextArea
              label="Header (JSON)"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              rows={4}
            />

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase text-gray-500">
                  Payload Claims (JSON)
                </label>
                <div className="flex gap-1.5 text-xs text-primary">
                  <button
                    type="button"
                    onClick={() => addExpiration(1)}
                    className="hover:underline"
                  >
                    +1h Exp
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => addExpiration(24)}
                    className="hover:underline"
                  >
                    +24h Exp
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => addExpiration(168)}
                    className="hover:underline"
                  >
                    +7d Exp
                  </button>
                </div>
              </div>
              <TextArea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                rows={8}
                error={error}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                HMAC Secret Key
              </label>
              <input
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter secret signing key..."
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <Button onClick={signJwt} className="w-full">
              ⚡ Sign & Generate JWT Token
            </Button>

            {token && (
              <div className="space-y-3 pt-2">
                <TextArea
                  label="Signed JSON Web Token"
                  readOnly
                  copyable
                  value={token}
                  rows={4}
                />

                <div className="rounded-xl border border-black/10 p-3 text-xs bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] break-all font-mono leading-relaxed">
                  <span className="text-red-500 font-bold">{token.split(".")[0]}</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-purple-500 font-bold">{token.split(".")[1]}</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-teal-500 font-bold">{token.split(".")[2]}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
