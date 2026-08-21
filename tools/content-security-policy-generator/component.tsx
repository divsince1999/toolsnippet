"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function ContentSecurityPolicyGeneratorTool() {
  const [defaultSrc, setDefaultSrc] = useState("'self'");
  const [scriptSrc, setScriptSrc] = useState("'self' 'unsafe-inline' https://www.googletagmanager.com");
  const [styleSrc, setStyleSrc] = useState("'self' 'unsafe-inline' https://fonts.googleapis.com");
  const [imgSrc, setImgSrc] = useState("'self' data: https:");
  const [connectSrc, setConnectSrc] = useState("'self' https://api.toolsnippet.com");
  const [fontSrc, setFontSrc] = useState("'self' https://fonts.gstatic.com");
  const [frameAncestors, setFrameAncestors] = useState("'none'");
  const [upgradeInsecure, setUpgradeInsecure] = useState(true);

  const cspString = useMemo(() => {
    const directives: string[] = [];
    if (defaultSrc.trim()) directives.push(`default-src ${defaultSrc.trim()}`);
    if (scriptSrc.trim()) directives.push(`script-src ${scriptSrc.trim()}`);
    if (styleSrc.trim()) directives.push(`style-src ${styleSrc.trim()}`);
    if (imgSrc.trim()) directives.push(`img-src ${imgSrc.trim()}`);
    if (connectSrc.trim()) directives.push(`connect-src ${connectSrc.trim()}`);
    if (fontSrc.trim()) directives.push(`font-src ${fontSrc.trim()}`);
    if (frameAncestors.trim()) directives.push(`frame-ancestors ${frameAncestors.trim()}`);
    if (upgradeInsecure) directives.push("upgrade-insecure-requests");

    return directives.join("; ");
  }, [defaultSrc, scriptSrc, styleSrc, imgSrc, connectSrc, fontSrc, frameAncestors, upgradeInsecure]);

  return (
    <ToolContainer
      title="Content Security Policy (CSP) Generator"
      description="Build strict, production-ready Content-Security-Policy HTTP headers to protect against XSS and injection attacks."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              default-src (Fallback)
            </label>
            <input
              type="text"
              value={defaultSrc}
              onChange={(e) => setDefaultSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              script-src (JavaScript Sources)
            </label>
            <input
              type="text"
              value={scriptSrc}
              onChange={(e) => setScriptSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              style-src (CSS Stylesheets)
            </label>
            <input
              type="text"
              value={styleSrc}
              onChange={(e) => setStyleSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              img-src (Images & Vectors)
            </label>
            <input
              type="text"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              connect-src (Fetch & WebSocket APIs)
            </label>
            <input
              type="text"
              value={connectSrc}
              onChange={(e) => setConnectSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              font-src (Web Fonts)
            </label>
            <input
              type="text"
              value={fontSrc}
              onChange={(e) => setFontSrc(e.target.value)}
              className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                frame-ancestors
              </label>
              <input
                type="text"
                value={frameAncestors}
                onChange={(e) => setFrameAncestors(e.target.value)}
                className="w-full font-mono rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={upgradeInsecure}
                  onChange={(e) => setUpgradeInsecure(e.target.checked)}
                  className="rounded text-primary"
                />
                <span>Upgrade Insecure Requests</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="HTTP Header (Content-Security-Policy)"
            readOnly
            copyable
            value={`Content-Security-Policy: ${cspString}`}
            rows={5}
          />

          <TextArea
            label="HTML <meta> Tag"
            readOnly
            copyable
            value={`<meta http-equiv="Content-Security-Policy" content="${cspString}">`}
            rows={5}
          />

          <TextArea
            label="Nginx Configuration"
            readOnly
            copyable
            value={`add_header Content-Security-Policy "${cspString}" always;`}
            rows={4}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
