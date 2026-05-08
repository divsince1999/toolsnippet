"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function Base64Tool() {
  const { input, setInput, output, setOutput, error, setError, clearAll, copyToClipboard, isCopied } = useTool();

  function encodeText() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch {
      setError("Unable to encode input.");
      setOutput("");
    }
  }

  function decodeText() {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch {
      setError("Input is not valid Base64.");
      setOutput("");
    }
  }

  return (
    <ToolContainer
      title="Base64 Encoder/Decoder"
      description="Safely encode and decode text to and from Base64 format."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter plain text or Base64..."
          rows={6}
          error={error}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={encodeText}>Encode</Button>
          <Button variant="outline" onClick={decodeText}>Decode</Button>
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
