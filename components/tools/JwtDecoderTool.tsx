"use client";

import { useMemo } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

function decodeJwtPart(part: string) {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return JSON.parse(atob(padded));
}

export default function JwtDecoderTool() {
  const { input: token, setInput: setToken, clearAll, copyToClipboard } = useTool();

  const result = useMemo(() => {
    if (!token.trim()) {
      return { header: "", payload: "", error: "" };
    }

    const parts = token.trim().split(".");
    if (parts.length < 2) {
      return { header: "", payload: "", error: "Invalid JWT format." };
    }

    try {
      const header = decodeJwtPart(parts[0]);
      const payload = decodeJwtPart(parts[1]);
      return {
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        error: "",
      };
    } catch {
      return { header: "", payload: "", error: "Unable to decode token." };
    }
  }, [token]);

  return (
    <ToolContainer
      title="JWT Decoder"
      description="Decode JSON Web Tokens and inspect their header and payload."
    >
      <div className="grid gap-6">
        <TextArea
          label="JWT Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token..."
          rows={4}
          error={result.error}
        />

        <div className="flex gap-2">
          <Button variant="ghost" onClick={clearAll} disabled={!token}>Clear</Button>
        </div>

        {!result.error && token && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="relative">
              <h3 className="mb-2 text-sm font-semibold">Header</h3>
              <pre className="overflow-x-auto rounded-lg border border-black/10 bg-black/[0.03] p-4 text-xs dark:border-white/10 dark:bg-white/[0.03]">
                {result.header}
              </pre>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-8"
                onClick={() => copyToClipboard(result.header)}
              >
                Copy
              </Button>
            </div>
            <div className="relative">
              <h3 className="mb-2 text-sm font-semibold">Payload</h3>
              <pre className="overflow-x-auto rounded-lg border border-black/10 bg-black/[0.03] p-4 text-xs dark:border-white/10 dark:bg-white/[0.03]">
                {result.payload}
              </pre>
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-2 top-8"
                onClick={() => copyToClipboard(result.payload)}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
