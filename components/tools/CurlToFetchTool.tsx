"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToFetchTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();

  const handleConvert = () => {
    try {
      if (!input) return;
      
      const curl = input.trim();
      if (!curl.startsWith("curl")) {
        throw new Error("Input must start with 'curl'");
      }

      const urlMatch = curl.match(/'([^']+)'|"([^"]+)"|([^\s'"]+)/);
      const url = urlMatch ? (urlMatch[1] || urlMatch[2] || urlMatch[3]) : "https://api.example.com";
      
      let method = "GET";
      if (curl.includes("-X POST") || curl.includes("--request POST")) method = "POST";
      else if (curl.includes("-X PUT")) method = "PUT";
      else if (curl.includes("-X DELETE")) method = "DELETE";

      const headers: Record<string, string> = {};
      const headerMatches = curl.matchAll(/-H\s+['"]([^'"]+)['"]/g);
      for (const match of headerMatches) {
        const [key, value] = match[1].split(":").map(s => s.trim());
        if (key && value) headers[key] = value;
      }

      let data = "";
      const dataMatch = curl.match(/-d\s+['"]([^'"]+)['"]|--data\s+['"]([^'"]+)['"]/);
      if (dataMatch) data = dataMatch[1] || dataMatch[2];

      const fetchCode = `fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 2)},
  ${data ? `body: JSON.stringify(${data})` : ""}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));`;

      setOutput(fetchCode);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CURL command");
    }
  };

  return (
    <ToolContainer
      title="CURL to Fetch"
      description="Convert CURL commands to clean JavaScript Fetch requests."
    >
      <div className="grid gap-6">
        <TextArea
          label="CURL Command"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='curl "https://api.example.com" -H "Content-Type: application/json" -d "{\"key\": \"val\"}"'
          rows={6}
        />
        <div className="flex gap-2">
          <Button onClick={handleConvert}>Convert to Fetch</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Fetch Snippet"
            readOnly
            copyable
            value={output}
            rows={10}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
