"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function DockerfileGenerator() {
  const [stack, setStack] = useState<"node" | "python" | "go" | "rust" | "nginx">("node");
  const [port, setPort] = useState(3000);
  const [nonRoot, setNonRoot] = useState(true);
  const [pkgManager, setPkgManager] = useState<"npm" | "pnpm" | "yarn">("npm");
  const [copied, setCopied] = useState(false);

  const dockerfile = useMemo(() => {
    if (stack === "node") {
      const installCmd = pkgManager === "pnpm" ? "corepack enable && pnpm install --frozen-lockfile" : pkgManager === "yarn" ? "yarn install --frozen-lockfile" : "npm ci";
      return `# Stage 1: Dependencies & Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ${pkgManager === "pnpm" ? "pnpm-lock.yaml " : pkgManager === "yarn" ? "yarn.lock " : ""}./
RUN ${installCmd}
COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
${nonRoot ? "RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs\nUSER nextjs\n" : ""}
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE ${port}
ENV PORT=${port}
CMD ["node", "server.js"]`;
    }

    if (stack === "python") {
      return `FROM python:3.11-slim AS builder
WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim AS runner
WORKDIR /app
ENV PATH="/opt/venv/bin:$PATH"
COPY --from=builder /opt/venv /opt/venv
COPY . .
${nonRoot ? "RUN useradd -m -u 1001 appuser\nUSER appuser\n" : ""}
EXPOSE ${port}
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${port}"]`;
    }

    if (stack === "go") {
      return `# Build Stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /server .

# Production Image
FROM alpine:3.19
WORKDIR /app
${nonRoot ? "RUN adduser -D -u 10001 appuser\nUSER appuser\n" : ""}
COPY --from=builder /server /server
EXPOSE ${port}
CMD ["/server"]`;
    }

    if (stack === "rust") {
      return `FROM rust:1.77-alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build --release

FROM alpine:3.19
WORKDIR /app
${nonRoot ? "RUN adduser -D -u 10001 appuser\nUSER appuser\n" : ""}
COPY --from=builder /app/target/release/app /app/server
EXPOSE ${port}
CMD ["/app/server"]`;
    }

    return `FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE ${port}
CMD ["nginx", "-g", "daemon off;"]`;
  }, [stack, port, nonRoot, pkgManager]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerfile);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Dockerfile Generator & Multi-Stage Builder"
      description="Generate optimized, production-ready, multi-stage Dockerfiles for Node.js, Python, Go, Rust, PHP, and static web apps."
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Runtime Stack:
            </label>
            <select
              value={stack}
              onChange={(e) => setStack(e.target.value as "node" | "python" | "go" | "rust" | "nginx")}
              className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="node">Node.js (Next.js / Express)</option>
              <option value="python">Python (FastAPI / Flask)</option>
              <option value="go">Golang (Alpine Binary)</option>
              <option value="rust">Rust (Alpine Musl)</option>
              <option value="nginx">Static Web (Nginx)</option>
            </select>
          </div>

          {stack === "node" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Package Manager:
              </label>
              <select
                value={pkgManager}
                onChange={(e) => setPkgManager(e.target.value as "npm" | "pnpm" | "yarn")}
                className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-semibold dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="npm">npm</option>
                <option value="pnpm">pnpm</option>
                <option value="yarn">yarn</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Container Port:
            </label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(parseInt(e.target.value, 10) || 80)}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="nonRoot"
              checked={nonRoot}
              onChange={(e) => setNonRoot(e.target.checked)}
              className="h-4 w-4 rounded text-primary-solid"
            />
            <label htmlFor="nonRoot" className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Non-root user security
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Generated Dockerfile:
            </span>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Dockerfile"}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 font-mono text-xs text-gray-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100">
            {dockerfile}
          </pre>
        </div>
      </div>
    </ToolContainer>
  );
}
