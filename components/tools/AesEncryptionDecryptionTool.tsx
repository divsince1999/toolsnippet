"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function AesEncryptionDecryptionTool() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [text, setText] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const deriveKey = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt as unknown as BufferSource,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  };

  const handleEncrypt = async () => {
    try {
      if (!text) throw new Error("Please enter text to encrypt.");
      if (!passphrase) throw new Error("Please enter a secret passphrase.");

      const enc = new TextEncoder();
      const salt = new Uint8Array(16);
      const iv = new Uint8Array(12);
      crypto.getRandomValues(salt);
      crypto.getRandomValues(iv);

      const key = await deriveKey(passphrase, salt);
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(text)
      );

      // Pack salt (16) + iv (12) + ciphertext into combined buffer
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      const binStr = String.fromCharCode(...Array.from(combined));
      setResult(btoa(binStr));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Encryption failed.");
    }
  };

  const handleDecrypt = async () => {
    try {
      if (!text) throw new Error("Please enter ciphertext to decrypt.");
      if (!passphrase) throw new Error("Please enter the secret passphrase.");

      const binStr = atob(text.trim());
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        bytes[i] = binStr.charCodeAt(i);
      }

      if (bytes.length < 28) {
        throw new Error("Invalid ciphertext format or truncated data.");
      }

      const salt = bytes.subarray(0, 16);
      const iv = bytes.subarray(16, 28);
      const ciphertext = bytes.subarray(28);

      const key = await deriveKey(passphrase, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        ciphertext
      );

      const dec = new TextDecoder();
      setResult(dec.decode(decrypted));
      setError("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Decryption failed. Please check your passphrase or ciphertext."
      );
    }
  };

  const clearAll = () => {
    setText("");
    setPassphrase("");
    setResult("");
    setError("");
  };

  return (
    <ToolContainer
      title="AES-GCM Text Encryptor & Decryptor"
      description="Military-grade 256-bit AES-GCM client-side text encryption with PBKDF2 salt derivation."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode("encrypt");
              setResult("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "encrypt"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            🔒 Encrypt Text
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("decrypt");
              setResult("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "decrypt"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            🔓 Decrypt Ciphertext
          </button>
        </div>

        <TextArea
          label={mode === "encrypt" ? "Plain Text to Encrypt" : "Base64 Ciphertext to Decrypt"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            mode === "encrypt"
              ? "Enter sensitive text or secret message..."
              : "Paste encrypted Base64 string..."
          }
          rows={5}
          error={error}
        />

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Secret Passphrase / Password Key
          </label>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Enter strong encryption passphrase..."
            className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm dark:border-white/20 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          {mode === "encrypt" ? (
            <Button onClick={handleEncrypt}>Encrypt with AES-256-GCM</Button>
          ) : (
            <Button onClick={handleDecrypt}>Decrypt Ciphertext</Button>
          )}
          <Button variant="ghost" onClick={clearAll} disabled={!text && !passphrase && !result}>
            Clear
          </Button>
        </div>

        {result && (
          <TextArea
            label={mode === "encrypt" ? "Encrypted Ciphertext (Base64)" : "Decrypted Plain Text"}
            readOnly
            copyable
            value={result}
            rows={4}
          />
        )}
      </div>
    </ToolContainer>
  );
}
