"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToPythonRequestsTool() {
  const [curlCommand, setCurlCommand] = useState(
    `curl -X POST https://api.example.com/v1/users \\\n` +
    `  -H "Authorization: Bearer secret_token_xyz" \\\n` +
    `  -H "Content-Type: application/json" \\\n` +
    `  -d '{"name": "John Doe", "email": "john@example.com"}'`
  );
  const [libType, setLibType] = useState<"requests" | "httpx">("requests");

  const pythonCode = useMemo(() => {
    try {
      const raw = curlCommand.replace(/\\\n/g, " ").replace(/\n/g, " ").trim();
      if (!raw.startsWith("curl")) return "# Please enter a valid curl command starting with 'curl'";

      // Extract URL
      const urlMatch = raw.match(/https?:\/\/[^\s"']+/);
      const url = urlMatch ? urlMatch[0] : "https://api.example.com";

      // Extract Method
      let method = "GET";
      const methodMatch = raw.match(/-X\s+([A-Z]+)/i);
      if (methodMatch) {
        method = methodMatch[1].toUpperCase();
      } else if (raw.includes("-d ") || raw.includes("--data") || raw.includes("--data-raw")) {
        method = "POST";
      }

      // Extract Headers
      const headers: Record<string, string> = {};
      const headerMatches = raw.matchAll(/-H\s+["']([^"']+)["']/g);
      for (const m of headerMatches) {
        const colon = m[1].indexOf(":");
        if (colon > 0) {
          headers[m[1].substring(0, colon).trim()] = m[1].substring(colon + 1).trim();
        }
      }

      // Extract Body
      let bodyData = "";
      const bodyMatch = raw.match(/(?:-d|--data|--data-raw)\s+['"]([\s\S]*?)['"](?:\s+-|\s*$)/);
      if (bodyMatch) {
        bodyData = bodyMatch[1];
      }

      const headersStr = Object.keys(headers).length > 0
        ? `headers = {\n${Object.entries(headers).map(([k, v]) => `    "${k}": "${v}"`).join(",\n")}\n}\n`
        : "";

      let jsonPayload = "";
      let dataPayload = "";
      if (bodyData) {
        try {
          const parsed = JSON.parse(bodyData);
          jsonPayload = `json_data = ${JSON.stringify(parsed, null, 4)}\n`;
        } catch {
          dataPayload = `data = """${bodyData}"""\n`;
        }
      }

      if (libType === "requests") {
        return (
          `import requests\n\n` +
          `url = "${url}"\n` +
          headersStr +
          jsonPayload +
          dataPayload +
          `\nresponse = requests.${method.toLowerCase()}(\n` +
          `    url,\n` +
          (headersStr ? `    headers=headers,\n` : "") +
          (jsonPayload ? `    json=json_data,\n` : "") +
          (dataPayload ? `    data=data,\n` : "") +
          `)\n\n` +
          `print(response.status_code)\n` +
          `print(response.json())`
        );
      }

      // httpx async
      return (
        `import httpx\nimport asyncio\n\n` +
        `async def main():\n` +
        `    url = "${url}"\n` +
        (headersStr ? `    ${headersStr.replace(/\n/g, "\n    ")}` : "") +
        (jsonPayload ? `    ${jsonPayload.replace(/\n/g, "\n    ")}` : "") +
        (dataPayload ? `    ${dataPayload.replace(/\n/g, "\n    ")}` : "") +
        `    async with httpx.AsyncClient() as client:\n` +
        `        response = await client.${method.toLowerCase()}(\n` +
        `            url,\n` +
        (headersStr ? `            headers=headers,\n` : "") +
        (jsonPayload ? `            json=json_data,\n` : "") +
        (dataPayload ? `            data=data,\n` : "") +
        `        )\n` +
        `        print(response.status_code)\n` +
        `        print(response.json())\n\n` +
        `asyncio.run(main())`
      );
    } catch {
      return "# Failed to parse cURL command.";
    }
  }, [curlCommand, libType]);

  return (
    <ToolContainer
      title="cURL to Python (Requests & Httpx) Converter"
      description="Transform cURL commands into clean, idiomatic Python requests or async httpx code blocks."
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
              Python HTTP Library
            </label>
            <select
              value={libType}
              onChange={(e) => setLibType(e.target.value as "requests" | "httpx")}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="requests">Python Requests (Synchronous Standard)</option>
              <option value="httpx">Python HTTPX (Modern Async/Await)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Python Script"
            readOnly
            copyable
            value={pythonCode}
            rows={14}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
