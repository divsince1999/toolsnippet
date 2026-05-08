"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UserAgentParserTool() {
  const { input, setInput, output, setOutput, clearAll } = useTool();

  const handleConvert = () => {
    if (!input) return;
    // Very basic UA parser logic
    const ua = input.toLowerCase();
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("chrome")) browser = "Chrome";
    else if (ua.includes("firefox")) browser = "Firefox";
    else if (ua.includes("safari")) browser = "Safari";
    else if (ua.includes("edge")) browser = "Edge";

    if (ua.includes("windows")) os = "Windows";
    else if (ua.includes("mac")) os = "macOS";
    else if (ua.includes("linux")) os = "Linux";
    else if (ua.includes("android")) os = "Android";
    else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";

    setOutput(`Browser: ${browser}\nOS: ${os}`);
  };

  return (
    <ToolContainer title="User Agent Parser" description="Extract browser and OS info from a User Agent string.">
      <div className="grid gap-6">
        <TextArea label="User Agent String" value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Parse UA</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && <TextArea label="Parsed Info" readOnly copyable value={output} rows={3} />}
      </div>
    </ToolContainer>
  );
}
