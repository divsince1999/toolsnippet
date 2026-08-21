"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToGoHttp() {
  const [curl, setCurl] = useState(`curl -X POST https://api.example.com/v1/orders \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer secret_key_123" \\
  -d '{"itemId": 42, "quantity": 2}'`);
  const [copied, setCopied] = useState(false);

  const goCode = useMemo(() => {
    if (!curl.trim()) return "";

    let url = "https://example.com";
    let method = "GET";
    const headers: { key: string; val: string }[] = [];
    let data = "";

    const urlMatch = curl.match(/curl\s+(?:-X\s+[A-Z]+\s+)?['"]?([^\s'"]+)['"]?/);
    if (urlMatch) url = urlMatch[1];

    const methodMatch = curl.match(/-X\s+([A-Z]+)/i);
    if (methodMatch) method = methodMatch[1].toUpperCase();

    const headerRegex = /-H\s+['"]([^:]+):\s*([^'"]+)['"]/g;
    let hMatch;
    while ((hMatch = headerRegex.exec(curl)) !== null) {
      headers.push({ key: hMatch[1].trim(), val: hMatch[2].trim() });
    }

    const dataMatch = curl.match(/(?:-d|--data(?:-raw)?)\s+['"]([\s\S]*?)['"](?=\s+-[A-Za-z]|\s*$)/);
    if (dataMatch) {
      data = dataMatch[1];
      if (!methodMatch) method = "POST";
    }

    const headerLines = headers.map((h) => `	req.Header.Add("${h.key}", "${h.val}")`).join("\n");
    const payloadBlock = data
      ? `	payload := strings.NewReader(` + "`" + data + "`" + `)\n	req, err := http.NewRequestWithContext(ctx, "${method}", "${url}", payload)\n`
      : `	req, err := http.NewRequestWithContext(ctx, "${method}", "${url}", nil)\n`;

    return `package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

${payloadBlock}	if err != nil {
		panic(err)
	}

${headerLines}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(body))
}`;
  }, [curl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(goCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="cURL to Go HTTP Client Code Converter"
      description="Convert cURL commands into idiomatic Golang net/http client requests with context and error handling."
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
              Generated Go Client Code:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Go Code"}
            </Button>
          </div>
          <pre className="max-h-96 overflow-y-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs text-gray-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100">
            {goCode}
          </pre>
        </div>
      </div>
    </ToolContainer>
  );
}
