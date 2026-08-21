"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function BasicAuthHeaderGeneratorTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("secretpassword123");
  const [headerInput, setHeaderInput] = useState("Authorization: Basic YWRtaW46c2VjcmV0cGFzc3dvcmQxMjM=");
  const [decodedUser, setDecodedUser] = useState("");
  const [decodedPass, setDecodedPass] = useState("");
  const [error, setError] = useState("");

  const enc = new TextEncoder();
  const rawBytes = enc.encode(`${username}:${password}`);
  const base64Token = btoa(String.fromCharCode(...Array.from(rawBytes)));

  const handleDecode = () => {
    try {
      if (!headerInput.trim()) return;
      let token = headerInput.trim();
      if (token.toLowerCase().startsWith("authorization:")) {
        token = token.substring(14).trim();
      }
      if (token.toLowerCase().startsWith("basic")) {
        token = token.substring(5).trim();
      }

      const decoded = atob(token);
      const colonIdx = decoded.indexOf(":");
      if (colonIdx === -1) {
        throw new Error("Invalid Basic Auth token: missing ':' separator.");
      }

      setDecodedUser(decoded.substring(0, colonIdx));
      setDecodedPass(decoded.substring(colonIdx + 1));
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to decode Basic Auth header.");
    }
  };

  return (
    <ToolContainer
      title="HTTP Basic Auth Header Builder & Decoder"
      description="Generate standard Authorization: Basic Base64 headers from credentials or decode existing tokens."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode("encode");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "encode"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Encode Credentials → Header
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("decode");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "decode"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Decode Header → Credentials
          </button>
        </div>

        {mode === "encode" ? (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full rounded-lg border border-black/15 bg-white p-3 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              <TextArea
                label="Full HTTP Request Header"
                readOnly
                copyable
                value={`Authorization: Basic ${base64Token}`}
                rows={2}
              />

              <TextArea
                label="cURL Command Flag"
                readOnly
                copyable
                value={`curl -H "Authorization: Basic ${base64Token}" https://api.example.com`}
                rows={2}
              />

              <TextArea
                label="JavaScript Fetch Headers"
                readOnly
                copyable
                value={`headers: {\n  "Authorization": "Basic ${base64Token}"\n}`}
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <TextArea
              label="Authorization Header or Base64 Token"
              value={headerInput}
              onChange={(e) => setHeaderInput(e.target.value)}
              placeholder="Authorization: Basic YWRtaW46c2VjcmV0..."
              rows={4}
              error={error}
            />

            <Button onClick={handleDecode}>Decode Credentials</Button>

            {decodedUser && (
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                  <span className="text-xs uppercase font-semibold text-gray-500">Decoded Username</span>
                  <div className="text-lg font-bold font-mono text-primary mt-1">
                    {decodedUser}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
                  <span className="text-xs uppercase font-semibold text-gray-500">Decoded Password</span>
                  <div className="text-lg font-bold font-mono text-gray-900 dark:text-white mt-1">
                    {decodedPass}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
