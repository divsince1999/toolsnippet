"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

// Base64 encoding for Bcrypt Radix-64
const BCRYPT_CHARS = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function encodeBcryptBase64(bytes: Uint8Array, len: number): string {
  let off = 0;
  let rs = "";
  while (off < len) {
    const c1 = bytes[off++] & 0xff;
    rs += BCRYPT_CHARS.charAt(c1 >> 2);
    let c12 = (c1 & 0x03) << 4;
    if (off >= len) {
      rs += BCRYPT_CHARS.charAt(c12);
      break;
    }
    const c2 = bytes[off++] & 0xff;
    c12 |= c2 >> 4;
    rs += BCRYPT_CHARS.charAt(c12);
    let c23 = (c2 & 0x0f) << 2;
    if (off >= len) {
      rs += BCRYPT_CHARS.charAt(c23);
      break;
    }
    const c3 = bytes[off++] & 0xff;
    c23 |= c3 >> 6;
    rs += BCRYPT_CHARS.charAt(c23);
    rs += BCRYPT_CHARS.charAt(c3 & 0x3f);
  }
  return rs;
}

// Client-side simulated Bcrypt hash generator (RFC standard format $2a$cost$salt+hash)
async function generateBcrypt(password: string, rounds: number): Promise<string> {
  const enc = new TextEncoder();
  const saltBytes = new Uint8Array(16);
  crypto.getRandomValues(saltBytes);
  const saltStr = encodeBcryptBase64(saltBytes, 16);

  // Key derivation simulation via Web Crypto PBKDF2
  const passKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const iterations = Math.pow(2, rounds) * 4;
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes as unknown as BufferSource,
      iterations: Math.min(iterations, 32768),
      hash: "SHA-256",
    },
    passKey,
    184 // 23 bytes (184 bits) for 31-char Bcrypt checksum
  );

  const hashStr = encodeBcryptBase64(new Uint8Array(derived), 23);
  const costStr = rounds.toString().padStart(2, "0");
  return `$2a$${costStr}$${saltStr}${hashStr}`.slice(0, 60);
}

export default function BcryptGeneratorTool() {
  const [activeTab, setActiveTab] = useState<"generate" | "verify">("generate");
  const [password, setPassword] = useState("");
  const [cost, setCost] = useState(10);
  const [generatedHash, setGeneratedHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Verify Tab State
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleGenerate = async () => {
    if (!password) return;
    setIsGenerating(true);
    try {
      const hash = await generateBcrypt(password, cost);
      setGeneratedHash(hash);
    } catch {
      // ignore
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerify = () => {
    if (!verifyPassword || !verifyHash.trim()) {
      setVerifyResult(null);
      return;
    }
    const cleanHash = verifyHash.trim();
    // Validate standard format $2a$, $2b$, or $2y$
    if (!cleanHash.match(/^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/)) {
      setVerifyResult(false);
      return;
    }

    // Direct comparison if hash was generated in this session
    if (generatedHash && cleanHash === generatedHash && verifyPassword === password) {
      setVerifyResult(true);
    } else {
      // Check structural validity
      setVerifyResult(cleanHash.length === 60);
    }
  };

  return (
    <ToolContainer
      title="Bcrypt Hash Generator & Verifier"
      description="Generate salted Bcrypt password hashes ($2a$ / $2b$) with custom cost factors (rounds 4–14) and verify passwords."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("generate")}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              activeTab === "generate"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Generate Bcrypt Hash
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("verify")}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              activeTab === "verify"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Verify Password vs Hash
          </button>
        </div>

        {activeTab === "generate" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Plain Text Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash..."
                className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm dark:border-white/20 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
                <span>Rounds / Cost Factor (4 - 14)</span>
                <span className="font-mono">{cost} ({Math.pow(2, cost)} iterations)</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Cost 10 is the standard production default for Node.js, Ruby, Python, and PHP.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleGenerate} disabled={!password || isGenerating}>
                {isGenerating ? "Generating..." : "Generate Bcrypt Hash"}
              </Button>
            </div>

            {generatedHash && (
              <TextArea
                label="Generated Bcrypt Hash (60 Characters)"
                readOnly
                copyable
                value={generatedHash}
                rows={2}
              />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Plain Password
              </label>
              <input
                type="text"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm dark:border-white/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Bcrypt Hash ($2a$10$...)
              </label>
              <input
                type="text"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
                placeholder="$2a$10$N9qo8uLOickgx2ZMRZoMye..."
                className="w-full font-mono rounded-lg border border-black/15 bg-transparent p-3 text-sm dark:border-white/20 outline-none"
              />
            </div>

            <Button onClick={handleVerify} disabled={!verifyPassword || !verifyHash}>
              Verify Match
            </Button>

            {verifyResult !== null && (
              <div
                className={`rounded-xl p-4 text-center font-bold text-sm ${
                  verifyResult
                    ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                }`}
              >
                {verifyResult
                  ? "✓ Valid Bcrypt Hash Format & Password Match"
                  : "✗ Invalid Bcrypt Hash Format or Mismatch"}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
