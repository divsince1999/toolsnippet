"use client";

import { useState } from "react";
import { useTool } from "@/hooks/useTool";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CurlToFetchTool() {
  const { input, setInput, output, setOutput, error, setError, clearAll } = useTool();
  const [targetLang, setTargetLang] = useState<"fetch" | "axios">("fetch");

  const parseAndConvert = (curlText: string, lang: "fetch" | "axios") => {
    try {
      if (!curlText.trim()) {
        setOutput("");
        setError("");
        return;
      }

      const raw = curlText.trim().replace(/\\\r?\n/g, " ");

      // Tokenize cURL command respecting quotes
      const tokenRegex = /(?:[^\s"']+|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')+/g;
      const tokens: string[] = [];
      let m;
      while ((m = tokenRegex.exec(raw)) !== null) {
        let token = m[0];
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1).replace(/\\"/g, '"');
        } else if (token.startsWith("'") && token.endsWith("'")) {
          token = token.slice(1, -1).replace(/\\'/g, "'");
        }
        tokens.push(token);
      }

      let url = "";
      let method = "GET";
      const headers: Record<string, string> = {};
      let body: string | null = null;

      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (t === "curl") continue;

        if (t === "-X" || t === "--request") {
          method = tokens[++i]?.toUpperCase() || "GET";
        } else if (t === "-H" || t === "--header") {
          const headerStr = tokens[++i] || "";
          const colonIdx = headerStr.indexOf(":");
          if (colonIdx > -1) {
            const k = headerStr.slice(0, colonIdx).trim();
            const v = headerStr.slice(colonIdx + 1).trim();
            headers[k] = v;
          }
        } else if (t === "-d" || t === "--data" || t === "--data-raw" || t === "--data-binary" || t === "--data-urlencode") {
          body = tokens[++i] || "";
          if (method === "GET") method = "POST";
        } else if (t === "-u" || t === "--user") {
          const userPass = tokens[++i] || "";
          headers["Authorization"] = `Basic ${typeof window !== "undefined" ? btoa(userPass) : Buffer.from(userPass).toString("base64")}`;
        } else if (t.startsWith("http://") || t.startsWith("https://") || (!t.startsWith("-") && !url && i > 0)) {
          url = t;
        }
      }

      if (!url) {
        throw new Error("Could not detect a valid URL in the cURL command.");
      }

      if (lang === "fetch") {
        let code = `const response = await fetch("${url}", {\n`;
        code += `  method: "${method}",\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")},\n`;
        }
        if (body) {
          try {
            const parsed = JSON.parse(body);
            code += `  body: JSON.stringify(${JSON.stringify(parsed, null, 4).replace(/\n/g, "\n  ")}),\n`;
          } catch {
            code += `  body: ${JSON.stringify(body)},\n`;
          }
        }
        code += `});\n\nconst data = await response.json();\nconsole.log(data);`;
        setOutput(code);
      } else {
        let code = `import axios from 'axios';\n\n`;
        code += `const { data } = await axios({\n`;
        code += `  method: "${method.toLowerCase()}",\n`;
        code += `  url: "${url}",\n`;
        if (Object.keys(headers).length > 0) {
          code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")},\n`;
        }
        if (body) {
          try {
            const parsed = JSON.parse(body);
            code += `  data: ${JSON.stringify(parsed, null, 4).replace(/\n/g, "\n  ")},\n`;
          } catch {
            code += `  data: ${JSON.stringify(body)},\n`;
          }
        }
        code += `});\n\nconsole.log(data);`;
        setOutput(code);
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to parse cURL command.");
    }
  };

  const handleLangChange = (lang: "fetch" | "axios") => {
    setTargetLang(lang);
    if (input.trim()) {
      parseAndConvert(input, lang);
    }
  };

  const convertCurl = () => {
    parseAndConvert(input, targetLang);
  };

  return (
    <ToolContainer
      title="cURL to Fetch & Axios Converter"
      description="Convert cURL terminal commands into modern JavaScript fetch or axios code."
    >
      <div className="grid gap-6">
        <TextArea
          label="Input cURL Command"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`curl https://api.example.com/data \\\n  -H "Authorization: Bearer token123" \\\n  -d '{"key": "value"}'`}
          rows={6}
          error={error}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant={targetLang === "fetch" ? "primary" : "outline"}
              onClick={() => handleLangChange("fetch")}
            >
              Fetch API
            </Button>
            <Button
              variant={targetLang === "axios" ? "primary" : "outline"}
              onClick={() => handleLangChange("axios")}
            >
              Axios
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={convertCurl}>Convert to Code</Button>
            <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>
              Clear
            </Button>
          </div>
        </div>

        {output && (
          <TextArea
            label={`Generated JavaScript (${targetLang})`}
            readOnly
            copyable
            value={output}
            rows={12}
          />
        )}
      </div>
    </ToolContainer>
  );
}
