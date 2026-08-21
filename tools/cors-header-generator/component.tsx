"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function CorsHeaderGeneratorTool() {
  const [origins, setOrigins] = useState("https://example.com");
  const [allowCredentials, setAllowCredentials] = useState(true);
  const [methods, setMethods] = useState<string[]>(["GET", "POST", "PUT", "DELETE", "OPTIONS"]);
  const [headers, setHeaders] = useState("Content-Type, Authorization, X-Requested-With");
  const [maxAge, setMaxAge] = useState(86400);
  const [targetServer, setTargetServer] = useState<"http" | "nginx" | "apache" | "express" | "nextjs">("http");

  const allMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];

  const toggleMethod = (m: string) => {
    if (methods.includes(m)) {
      setMethods(methods.filter((item) => item !== m));
    } else {
      setMethods([...methods, m]);
    }
  };

  const generatedCode = useMemo(() => {
    const originVal = origins.trim() || "*";
    const methodsVal = methods.join(", ");
    const headersVal = headers.trim() || "*";

    if (targetServer === "http") {
      return (
        `Access-Control-Allow-Origin: ${originVal}\n` +
        `Access-Control-Allow-Methods: ${methodsVal}\n` +
        `Access-Control-Allow-Headers: ${headersVal}\n` +
        (allowCredentials ? `Access-Control-Allow-Credentials: true\n` : "") +
        `Access-Control-Max-Age: ${maxAge}`
      );
    }

    if (targetServer === "nginx") {
      return (
        `# Nginx CORS Configuration\n` +
        `add_header 'Access-Control-Allow-Origin' '${originVal}' always;\n` +
        `add_header 'Access-Control-Allow-Methods' '${methodsVal}' always;\n` +
        `add_header 'Access-Control-Allow-Headers' '${headersVal}' always;\n` +
        (allowCredentials ? `add_header 'Access-Control-Allow-Credentials' 'true' always;\n` : "") +
        `add_header 'Access-Control-Max-Age' ${maxAge} always;\n\n` +
        `if ($request_method = 'OPTIONS') {\n` +
        `    return 204;\n` +
        `}`
      );
    }

    if (targetServer === "apache") {
      return (
        `# Apache .htaccess CORS Headers\n` +
        `<IfModule mod_headers.c>\n` +
        `    Header always set Access-Control-Allow-Origin "${originVal}"\n` +
        `    Header always set Access-Control-Allow-Methods "${methodsVal}"\n` +
        `    Header always set Access-Control-Allow-Headers "${headersVal}"\n` +
        (allowCredentials ? `    Header always set Access-Control-Allow-Credentials "true"\n` : "") +
        `    Header always set Access-Control-Max-Age "${maxAge}"\n` +
        `</IfModule>`
      );
    }

    if (targetServer === "express") {
      return (
        `// Node.js Express CORS Middleware\n` +
        `app.use((req, res, next) => {\n` +
        `  res.header('Access-Control-Allow-Origin', '${originVal}');\n` +
        `  res.header('Access-Control-Allow-Methods', '${methodsVal}');\n` +
        `  res.header('Access-Control-Allow-Headers', '${headersVal}');\n` +
        (allowCredentials ? `  res.header('Access-Control-Allow-Credentials', 'true');\n` : "") +
        `  res.header('Access-Control-Max-Age', '${maxAge}');\n` +
        `  if (req.method === 'OPTIONS') return res.sendStatus(204);\n` +
        `  next();\n` +
        `});`
      );
    }

    // Next.js config
    return (
      `// next.config.js CORS headers\n` +
      `module.exports = {\n` +
      `  async headers() {\n` +
      `    return [\n` +
      `      {\n` +
      `        source: '/api/:path*',\n` +
      `        headers: [\n` +
      `          { key: 'Access-Control-Allow-Origin', value: '${originVal}' },\n` +
      `          { key: 'Access-Control-Allow-Methods', value: '${methodsVal}' },\n` +
      `          { key: 'Access-Control-Allow-Headers', value: '${headersVal}' },\n` +
      (allowCredentials ? `          { key: 'Access-Control-Allow-Credentials', value: 'true' },\n` : "") +
      `          { key: 'Access-Control-Max-Age', value: '${maxAge}' },\n` +
      `        ],\n` +
      `      },\n` +
      `    ];\n` +
      `  },\n` +
      `};`
    );
  }, [origins, allowCredentials, methods, headers, maxAge, targetServer]);

  return (
    <ToolContainer
      title="CORS Header Generator"
      description="Generate Cross-Origin Resource Sharing (CORS) rules for Raw HTTP, Nginx, Apache, Express, and Next.js."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Allowed Origins (Access-Control-Allow-Origin)
            </label>
            <input
              type="text"
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              placeholder="e.g. https://example.com or *"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">
              Allowed HTTP Methods
            </label>
            <div className="flex flex-wrap gap-2">
              {allMethods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggleMethod(m)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    methods.includes(m)
                      ? "bg-primary text-white"
                      : "border border-black/10 bg-black/5 hover:bg-black/10 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Allowed Headers
            </label>
            <input
              type="text"
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="Content-Type, Authorization, X-Requested-With"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Max-Age (Preflight Cache Sec)
              </label>
              <input
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={allowCredentials}
                  onChange={(e) => setAllowCredentials(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Allow Credentials</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Target Framework / Web Server
            </label>
            <select
              value={targetServer}
              onChange={(e) => setTargetServer(e.target.value as typeof targetServer)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="http">Raw HTTP Headers</option>
              <option value="nginx">Nginx Config</option>
              <option value="apache">Apache .htaccess</option>
              <option value="express">Express.js (Node.js)</option>
              <option value="nextjs">Next.js (next.config.js)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TextArea
            label="Generated CORS Rules"
            readOnly
            copyable
            value={generatedCode}
            rows={14}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
