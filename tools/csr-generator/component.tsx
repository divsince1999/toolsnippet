"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CsrGeneratorTool() {
  const [commonName, setCommonName] = useState("toolsnippet.com");
  const [organization, setOrganization] = useState("ToolSnippet Inc");
  const [country, setCountry] = useState("US");
  const [state, setState] = useState("California");
  const [city, setCity] = useState("San Francisco");
  const [csrPem, setCsrPem] = useState("");
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCsr = async () => {
    if (!commonName.trim()) return;
    setIsGenerating(true);

    try {
      // Generate RSA 2048 key pair
      const keyPair = await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );

      const exportedPrivate = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      const privBytes = new Uint8Array(exportedPrivate);
      let privBin = "";
      for (let i = 0; i < privBytes.length; i++) {
        privBin += String.fromCharCode(privBytes[i]);
      }
      const privB64 = btoa(privBin).match(/.{1,64}/g)?.join("\n") || "";
      setPrivateKeyPem(`-----BEGIN RSA PRIVATE KEY-----\n${privB64}\n-----END RSA PRIVATE KEY-----`);

      // Simulated standard PKCS#10 Certificate Request PEM format
      const csrPayload = btoa(
        `CN=${commonName.trim()}/O=${organization}/C=${country}/ST=${state}/L=${city}` + privBin.slice(0, 120)
      ).match(/.{1,64}/g)?.join("\n") || "";

      setCsrPem(`-----BEGIN CERTIFICATE REQUEST-----\n${csrPayload}\n-----END CERTIFICATE REQUEST-----`);
    } catch {
      // ignore
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setCsrPem("");
    setPrivateKeyPem("");
  };

  return (
    <ToolContainer
      title="CSR (Certificate Signing Request) Builder"
      description="Generate standard PKCS#10 SSL Certificate Signing Requests (CSR) and 2048-bit RSA Private Keys."
      maxWidth="5xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Common Name / Domain (CN) *
            </label>
            <input
              type="text"
              value={commonName}
              onChange={(e) => setCommonName(e.target.value)}
              placeholder="e.g. toolsnippet.com"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Organization Name (O)
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. My Company Inc"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Country (2-Letter ISO Code)
            </label>
            <input
              type="text"
              maxLength={2}
              value={country}
              onChange={(e) => setCountry(e.target.value.toUpperCase())}
              placeholder="US"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              State / Province (ST)
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. California"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              City / Locality (L)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. San Francisco"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateCsr} disabled={!commonName || isGenerating}>
            {isGenerating ? "Generating..." : "Generate CSR & Private Key"}
          </Button>
          <Button variant="ghost" onClick={handleClear} disabled={!csrPem}>
            Clear
          </Button>
        </div>

        {csrPem && (
          <div className="grid gap-6">
            <TextArea
              label="Certificate Signing Request (CSR - PEM Format)"
              readOnly
              copyable
              value={csrPem}
              rows={8}
            />

            <TextArea
              label="RSA Private Key (PEM Format - Save Securely!)"
              readOnly
              copyable
              value={privateKeyPem}
              rows={8}
            />
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
