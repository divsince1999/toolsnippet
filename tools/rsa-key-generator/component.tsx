"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function arrayBufferToPem(buffer: ArrayBuffer, type: "PUBLIC KEY" | "PRIVATE KEY"): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  const formatted = base64.match(/.{1,64}/g)?.join("\n") || base64;
  return `-----BEGIN ${type}-----\n${formatted}\n-----END ${type}-----`;
}

export default function RsaKeyGeneratorTool() {
  const [modulusLength, setModulusLength] = useState<2048 | 4096>(2048);
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateKeys = async () => {
    setIsGenerating(true);
    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: modulusLength,
          publicExponent: new Uint8Array([1, 0, 1]), // 65537
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );

      const exportedPublic = await crypto.subtle.exportKey("spki", keyPair.publicKey);
      const exportedPrivate = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

      setPublicKeyPem(arrayBufferToPem(exportedPublic, "PUBLIC KEY"));
      setPrivateKeyPem(arrayBufferToPem(exportedPrivate, "PRIVATE KEY"));
    } catch {
      // ignore
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setPublicKeyPem("");
    setPrivateKeyPem("");
  };

  return (
    <ToolContainer
      title="RSA Public & Private Key Pair Generator"
      description="Generate cryptographically secure 2048-bit and 4096-bit RSA key pairs in standard PEM format."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase text-gray-500">
              Key Size:
            </label>
            <select
              value={modulusLength}
              onChange={(e) => setModulusLength(Number(e.target.value) as 2048 | 4096)}
              className="rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value={2048}>RSA 2048-bit (Standard & Fast)</option>
              <option value={4096}>RSA 4096-bit (Maximum Security)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateKeys} disabled={isGenerating}>
              {isGenerating ? "Generating Key Pair..." : "🔑 Generate RSA Key Pair"}
            </Button>
            <Button variant="ghost" onClick={handleClear} disabled={!publicKeyPem}>
              Clear
            </Button>
          </div>
        </div>

        {publicKeyPem && (
          <div className="grid gap-6">
            <TextArea
              label="Public Key (SPKI PEM Format)"
              readOnly
              copyable
              value={publicKeyPem}
              rows={8}
            />

            <TextArea
              label="Private Key (PKCS#8 PEM Format - Keep Secret!)"
              readOnly
              copyable
              value={privateKeyPem}
              rows={12}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
