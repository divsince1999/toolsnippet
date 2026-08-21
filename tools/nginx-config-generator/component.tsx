"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function NginxConfigGenerator() {
  const [domain, setDomain] = useState("example.com");
  const [type, setType] = useState<"proxy" | "spa" | "php">("proxy");
  const [proxyPort, setProxyPort] = useState(3000);
  const [enableSsl, setEnableSsl] = useState(true);
  const [enableGzip, setEnableGzip] = useState(true);
  const [copied, setCopied] = useState(false);

  const config = useMemo(() => {
    const d = domain.trim() || "example.com";

    let body = "";
    if (type === "proxy") {
      body = `    location / {
        proxy_pass http://127.0.0.1:${proxyPort};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }`;
    } else if (type === "spa") {
      body = `    root /var/www/${d}/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }`;
    } else {
      body = `    root /var/www/${d}/public;
    index index.php index.html;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }`;
    }

    const gzipBlock = enableGzip
      ? `    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;\n`
      : "";

    if (enableSsl) {
      return `server {
    listen 80;
    listen [::]:80;
    server_name ${d} www.${d};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${d} www.${d};

    ssl_certificate /etc/letsencrypt/live/${d}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${d}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

${gzipBlock}${body}
}`;
    }

    return `server {
    listen 80;
    listen [::]:80;
    server_name ${d} www.${d};

${gzipBlock}${body}
}`;
  }, [domain, type, proxyPort, enableSsl, enableGzip]);

  const handleCopy = () => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Nginx Configuration & Virtual Host Generator"
      description="Generate secure, high-performance Nginx server blocks for Reverse Proxies, SSL Certificates, Gzip compression, and SPAs."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Domain Name:
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Server Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "proxy" | "spa" | "php")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="proxy">Reverse Proxy (Node / FastAPI)</option>
              <option value="spa">Static SPA (React / Vue / Vite)</option>
              <option value="php">PHP-FPM (Laravel / WordPress)</option>
            </select>
          </div>

          {type === "proxy" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Backend Localhost Port:
              </label>
              <input
                type="number"
                value={proxyPort}
                onChange={(e) => setProxyPort(parseInt(e.target.value, 10) || 80)}
                className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 border-y border-black/10 py-3 dark:border-white/10">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={enableSsl}
              onChange={(e) => setEnableSsl(e.target.checked)}
              className="h-4 w-4 rounded text-primary-solid"
            />
            SSL / HTTPS Redirection
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={enableGzip}
              onChange={(e) => setEnableGzip(e.target.checked)}
              className="h-4 w-4 rounded text-primary-solid"
            />
            Gzip Compression
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Nginx Configuration:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Configuration"}
            </Button>
          </div>
          <pre className="max-h-96 overflow-y-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs text-gray-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100">
            {config}
          </pre>
        </div>
      </div>
    </ToolContainer>
  );
}
