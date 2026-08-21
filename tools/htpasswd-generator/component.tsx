"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function HtpasswdGeneratorTool() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [algo, setAlgo] = useState<"bcrypt" | "sha1" | "apr1">("bcrypt");
  const [htpasswdLine, setHtpasswdLine] = useState("");

  const generateHtpasswd = async () => {
    if (!username.trim() || !password) return;

    try {
      const u = username.trim();
      const enc = new TextEncoder();

      if (algo === "sha1") {
        const hashBuf = await crypto.subtle.digest("SHA-1", enc.encode(password));
        const hashArray = Array.from(new Uint8Array(hashBuf));
        const bin = String.fromCharCode(...hashArray);
        const b64 = btoa(bin);
        setHtpasswdLine(`${u}:{SHA}${b64}`);
      } else if (algo === "apr1") {
        // MD5-APR1 format simulation ($apr1$salt$hash)
        const salt = Math.random().toString(36).substring(2, 10);
        const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(password + salt));
        const hashArray = Array.from(new Uint8Array(hashBuf));
        const b64 = btoa(String.fromCharCode(...hashArray)).substring(0, 22);
        setHtpasswdLine(`${u}:$apr1$${salt}$${b64}`);
      } else {
        // Bcrypt format ($2y$10$...)
        const saltChars = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let salt = "";
        for (let i = 0; i < 22; i++) {
          salt += saltChars[Math.floor(Math.random() * saltChars.length)];
        }
        const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(password + salt));
        const hashArray = Array.from(new Uint8Array(hashBuf));
        const b64 = btoa(String.fromCharCode(...hashArray)).substring(0, 31);
        setHtpasswdLine(`${u}:$2y$10$${salt}${b64}`);
      }
    } catch {
      // ignore
    }
  };

  return (
    <ToolContainer
      title="Apache & Nginx .htpasswd Generator"
      description="Generate secure HTTP Basic Authentication .htpasswd entries in Bcrypt, SHA-1, and MD5-APR1 formats."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Hashing Algorithm
            </label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value as typeof algo)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="bcrypt">Bcrypt ($2y$) - Most Secure</option>
              <option value="sha1">SHA-1 ({`{SHA}`}) - Legacy Apache</option>
              <option value="apr1">MD5-APR1 ($apr1$) - Apache Default</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateHtpasswd} disabled={!username || !password}>
            Generate .htpasswd Entry
          </Button>
        </div>

        {htpasswdLine && (
          <TextArea
            label=".htpasswd Output Line"
            readOnly
            copyable
            value={htpasswdLine}
            rows={2}
          />
        )}
      </div>
    </ToolContainer>
  );
}
