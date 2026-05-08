"use client";

import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToAxiosTool() {
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
      
      let method = "get";
      if (curl.includes("-X POST") || curl.includes("--request POST")) method = "post";
      else if (curl.includes("-X PUT")) method = "put";
      else if (curl.includes("-X DELETE")) method = "delete";

      const headers: Record<string, string> = {};
      const headerMatches = curl.matchAll(/-H\s+['"]([^'"]+)['"]/g);
      for (const match of headerMatches) {
        const [key, value] = match[1].split(":").map(s => s.trim());
        if (key && value) headers[key] = value;
      }

      let data = "";
      const dataMatch = curl.match(/-d\s+['"]([^'"]+)['"]|--data\s+['"]([^'"]+)['"]/);
      if (dataMatch) data = dataMatch[1] || dataMatch[2];

      const axiosCode = `import axios from 'axios';

axios({
  method: '${method}',
  url: '${url}',
  headers: ${JSON.stringify(headers, null, 2)},
  ${data ? `data: ${data}` : ""}
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});`;

      setOutput(axiosCode);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CURL command");
    }
  };

  return (
    <ToolContainer
      title="CURL to Axios"
      description="Convert CURL commands to clean Axios request snippets."
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
          <Button onClick={handleConvert}>Convert to Axios</Button>
          <Button variant="ghost" onClick={clearAll} disabled={!input}>Clear</Button>
        </div>
        {output && (
          <TextArea
            label="Axios Snippet"
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </ToolContainer>
  );
}
