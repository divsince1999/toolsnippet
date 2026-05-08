"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UrlEncoderDecoderTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll, copyToClipboard, isCopied } = useTool();

  function encodeValue() {
    setOutput(encodeURIComponent(input));
    setError("");
  }

  function decodeValue() {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch {
      setError("Input is not a valid encoded URL component.");
      setOutput("");
    }
  }

  return (
    <ToolContainer
      title="URL Encoder/Decoder"
      description="Encode or decode URLs to ensure they are safe for transmission over the internet."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input URL/Text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL text..."
          rows={6}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={encodeValue}>Encode</Button>
          <Button variant="outline" onClick={decodeValue}>Decode</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>

        {output && (
          <TextArea
            label="Output"
            readOnly
            copyable
            value={output}
            placeholder="Output will appear here..."
            rows={6}
          />
        )}
      </div>
    </ToolContainer>
  );
}
