"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToNodeAxiosTool() {
  const [curlCommand, setCurlCommand] = useState(
    `curl -X POST https://api.example.com/v1/checkout \\\n` +
    `  -H "Authorization: Bearer sk_test_51Mz..." \\\n` +
    `  -H "Content-Type: application/json" \\\n` +
    `  -d '{"amount": 4900, "currency": "usd"}'`
  );
  const [clientType, setClientType] = useState<"axios" | "fetch">("axios");

  const jsCode = useMemo(() => {
    try {
      const raw = curlCommand.replace(/\\\n/g, " ").replace(/\n/g, " ").trim();
      if (!raw.startsWith("curl")) return "// Please enter a valid curl command";

      const urlMatch = raw.match(/https?:\/\/[^\s"']+/);
      const url = urlMatch ? urlMatch[0] : "https://api.example.com";

      let method = "GET";
      const methodMatch = raw.match(/-X\s+([A-Z]+)/i);
      if (methodMatch) {
        method = methodMatch[1].toUpperCase();
      } else if (raw.includes("-d ") || raw.includes("--data") || raw.includes("--data-raw")) {
        method = "POST";
      }

      const headers: Record<string, string> = {};
      const headerMatches = raw.matchAll(/-H\s+["']([^"']+)["']/g);
      for (const m of headerMatches) {
        const colon = m[1].indexOf(":");
        if (colon > 0) {
          headers[m[1].substring(0, colon).trim()] = m[1].substring(colon + 1).trim();
        }
      }

      let bodyData = "";
      const bodyMatch = raw.match(/(?:-d|--data|--data-raw)\s+['"]([\s\S]*?)['"](?:\s+-|\s*$)/);
      if (bodyMatch) {
        bodyData = bodyMatch[1];
      }

      let parsedJson: unknown = null;
      if (bodyData) {
        try {
          parsedJson = JSON.parse(bodyData);
        } catch {
          parsedJson = bodyData;
        }
      }

      if (clientType === "axios") {
        return (
          `import axios from "axios";\n\n` +
          `async function makeRequest() {\n` +
          `  try {\n` +
          `    const response = await axios({\n` +
          `      method: "${method.toLowerCase()}",\n` +
          `      url: "${url}",\n` +
          (Object.keys(headers).length > 0 ? `      headers: ${JSON.stringify(headers, null, 8).trim()},\n` : "") +
          (parsedJson ? `      data: ${JSON.stringify(parsedJson, null, 8).trim()},\n` : "") +
          `    });\n` +
          `    console.log(response.data);\n` +
          `  } catch (error) {\n` +
          `    console.error("API Request Error:", error.response?.data || error.message);\n` +
          `  }\n` +
          `}\n\n` +
          `makeRequest();`
        );
      }

      // Native fetch
      return (
        `async function makeRequest() {\n` +
        `  try {\n` +
        `    const response = await fetch("${url}", {\n` +
        `      method: "${method}",\n` +
        (Object.keys(headers).length > 0 ? `      headers: ${JSON.stringify(headers, null, 8).trim()},\n` : "") +
        (parsedJson ? `      body: JSON.stringify(${JSON.stringify(parsedJson, null, 8).trim()}),\n` : "") +
        `    });\n\n` +
        `    const data = await response.json();\n` +
        `    console.log(data);\n` +
        `  } catch (error) {\n` +
        `    console.error("Fetch Error:", error);\n` +
        `  }\n` +
        `}\n\n` +
        `makeRequest();`
      );
    } catch {
      return "// Failed to parse cURL command.";
    }
  }, [curlCommand, clientType]);

  return (
    <ToolContainer
      title="cURL to Node.js Axios & Fetch Converter"
      description="Convert cURL commands into clean async/await Node.js Axios and native Fetch code snippets."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label="cURL Command Line"
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
            rows={9}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              JavaScript Client Library
            </label>
            <select
              value={clientType}
              onChange={(e) => setClientType(e.target.value as "axios" | "fetch")}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="axios">Axios (Promise / Node.js)</option>
              <option value="fetch">Native Fetch (Node 18+ & Modern Browsers)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated JavaScript / TypeScript"
            readOnly
            copyable
            value={jsCode}
            rows={14}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
