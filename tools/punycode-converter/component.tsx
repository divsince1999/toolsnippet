"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function PunycodeConverterTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const toPunycode = () => {
    try {
      if (!input.trim()) return;

      const lines = input.trim().split("\n");
      const converted = lines.map((domain) => {
        const clean = domain.trim();
        if (!clean) return "";
        try {
          const url = new URL(clean.includes("://") ? clean : `http://${clean}`);
          return url.hostname;
        } catch {
          return clean;
        }
      });

      setOutput(converted.join("\n"));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Punycode conversion failed.");
    }
  };

  const fromPunycode = () => {
    try {
      if (!input.trim()) return;

      const lines = input.trim().split("\n");
      const converted = lines.map((domain) => {
        const clean = domain.trim();
        if (!clean) return "";
        try {
          const url = new URL(clean.includes("://") ? clean : `http://${clean}`);
          return decodeURI(url.hostname);
        } catch {
          return clean;
        }
      });

      setOutput(converted.join("\n"));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Punycode decoding failed.");
    }
  };

  return (
    <ToolContainer
      title="Punycode (IDN) Converter"
      description="Convert Internationalized Domain Names (IDNs with accents, umlauts, or unicode) to ASCII Punycode and back."
    >
      <div className="grid gap-6">
        <TextArea
          label="Domain Name(s) - One per line"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`münchen.de\nmañana.com\n☕.to`}
          rows={6}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={toPunycode}>To Punycode (xn--)</Button>
          <Button variant="outline" onClick={fromPunycode}>To Unicode (Text)</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label="Converted Domains"
            readOnly
            copyable
            value={output}
            rows={6}
          />
        )}
      </div>
    </ToolContainer>
  );
}
