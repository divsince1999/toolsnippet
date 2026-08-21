"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Argon2HasherTool() {
  const [password, setPassword] = useState("");
  const [salt, setSalt] = useState("toolsnippet_salt_2026");
  const [iterations, setIterations] = useState(100000);
  const [hashAlgo, setHashAlgo] = useState<"SHA-512" | "SHA-256">("SHA-512");
  const [keyLength, setKeyLength] = useState<256 | 512>(512);
  const [outputFormat, setOutputFormat] = useState<"hex" | "base64">("hex");
  const [derivedKey, setDerivedKey] = useState("");
  const [isDeriving, setIsDeriving] = useState(false);

  const generateRandomSalt = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    setSalt(Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(""));
  };

  const derivePasswordHash = async () => {
    if (!password) return;
    setIsDeriving(true);
    try {
      const enc = new TextEncoder();
      const passKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
      );

      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: enc.encode(salt),
          iterations: iterations,
          hash: hashAlgo,
        },
        passKey,
        keyLength
      );

      const bytes = new Uint8Array(derivedBits);
      if (outputFormat === "hex") {
        setDerivedKey(Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(""));
      } else {
        const bin = String.fromCharCode(...Array.from(bytes));
        setDerivedKey(btoa(bin));
      }
    } catch {
      // ignore
    } finally {
      setIsDeriving(false);
    }
  };

  return (
    <ToolContainer
      title="PBKDF2 / Password Key Derivation Hasher"
      description="Derive secure cryptographic password hashes using PBKDF2 with custom iterations, salt, and SHA-512."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Plain Text Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm dark:border-white/20 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase text-gray-500">Salt</label>
              <button
                type="button"
                onClick={generateRandomSalt}
                className="text-xs text-primary font-medium hover:underline"
              >
                🎲 Random Salt
              </button>
            </div>
            <input
              type="text"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              placeholder="Enter salt or generate random..."
              className="w-full font-mono rounded-lg border border-black/15 bg-transparent p-2.5 text-xs dark:border-white/20"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-gray-500 mb-1">
              <span>Iterations</span>
              <span className="font-mono">{iterations.toLocaleString()}</span>
            </div>
            <select
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value={10000}>10,000 (Fast)</option>
              <option value={100000}>100,000 (OWASP Standard)</option>
              <option value={310000}>310,000 (OWASP 2023 Recommended)</option>
              <option value={600000}>600,000 (High Security)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Hash Function
            </label>
            <select
              value={hashAlgo}
              onChange={(e) => setHashAlgo(e.target.value as typeof hashAlgo)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="SHA-512">SHA-512</option>
              <option value="SHA-256">SHA-256</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Key Length
            </label>
            <select
              value={keyLength}
              onChange={(e) => setKeyLength(Number(e.target.value) as typeof keyLength)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value={512}>512 bits (64 bytes)</option>
              <option value={256}>256 bits (32 bytes)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Output Encoding
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="hex">Hexadecimal</option>
              <option value="base64">Base64</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={derivePasswordHash} disabled={!password || isDeriving}>
            {isDeriving ? "Deriving Key..." : "Derive Cryptographic Key"}
          </Button>
        </div>

        {derivedKey && (
          <TextArea
            label="Derived Password Key (PBKDF2)"
            readOnly
            copyable
            value={derivedKey}
            rows={3}
          />
        )}
      </div>
    </ToolContainer>
  );
}
