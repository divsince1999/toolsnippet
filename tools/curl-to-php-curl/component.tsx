"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToPhpCurl() {
  const [curl, setCurl] = useState(`curl -X POST https://api.example.com/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer my_api_secret_token" \\
  -d '{"name": "Alice Developer", "role": "admin"}'`);
  const [copied, setCopied] = useState(false);

  const phpCode = useMemo(() => {
    if (!curl.trim()) return "";

    let url = "https://example.com";
    let method = "GET";
    const headers: string[] = [];
    let data = "";

    // Extract URL
    const urlMatch = curl.match(/curl\s+(?:-X\s+[A-Z]+\s+)?['"]?([^\s'"]+)['"]?/);
    if (urlMatch) url = urlMatch[1];

    // Method
    const methodMatch = curl.match(/-X\s+([A-Z]+)/i);
    if (methodMatch) method = methodMatch[1].toUpperCase();

    // Headers
    const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
    let hMatch;
    while ((hMatch = headerRegex.exec(curl)) !== null) {
      headers.push(hMatch[1]);
    }

    // Data
    const dataMatch = curl.match(/(?:-d|--data(?:-raw)?)\s+['"]([\s\S]*?)['"](?=\s+-[A-Za-z]|\s*$)/);
    if (dataMatch) {
      data = dataMatch[1];
      if (!methodMatch) method = "POST";
    }

    const headerLines = headers.map((h) => `        '${h}',`).join("\n");
    const dataBlock = data ? `        CURLOPT_POSTFIELDS => '${data.replace(/'/g, "\\'")}',\n` : "";

    return `<?php

\$curl = curl_init();

curl_setopt_array(\$curl, [
    CURLOPT_URL => '${url}',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => '${method}',
${dataBlock}    CURLOPT_HTTPHEADER => [
${headerLines}
    ],
]);

\$response = curl_exec(\$curl);
\$err = curl_error(\$curl);

curl_close(\$curl);

if (\$err) {
    echo "cURL Error #:" . \$err;
} else {
    echo \$response;
}`;
  }, [curl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(phpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="cURL to PHP cURL Code Converter"
      description="Convert cURL terminal commands into PHP curl_init and curl_setopt_array scripts with headers and JSON payloads."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Input cURL Command:
          </label>
          <textarea
            value={curl}
            onChange={(e) => setCurl(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated PHP Script:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy PHP Code"}
            </Button>
          </div>
          <pre className="max-h-96 overflow-y-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs text-gray-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100">
            {phpCode}
          </pre>
        </div>
      </div>
    </ToolContainer>
  );
}
