"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function SocialShareUrlGenerator() {
  const [url, setUrl] = useState("https://www.toolsnippet.com/tools/json-formatter");
  const [text, setText] = useState("Check out this free online JSON formatter and validator!");
  const [hashtags, setHashtags] = useState("devtools,webdev,javascript");
  const [via, setVia] = useState("toolsnippet");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url.trim());
    const encodedText = encodeURIComponent(text.trim());
    const encodedHashtags = encodeURIComponent(hashtags.replace(/#/g, "").trim());

    return [
      {
        name: "X / Twitter",
        icon: "𝕏",
        url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}${via ? `&via=${encodeURIComponent(via)}` : ""}${hashtags ? `&hashtags=${encodedHashtags}` : ""}`
      },
      {
        name: "LinkedIn",
        icon: "💼",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      },
      {
        name: "Facebook",
        icon: "📘",
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      },
      {
        name: "WhatsApp",
        icon: "💬",
        url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
      },
      {
        name: "Reddit",
        icon: "🤖",
        url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`
      },
      {
        name: "Telegram",
        icon: "✈️",
        url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
      },
      {
        name: "Email",
        icon: "✉️",
        url: `mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${encodedUrl}`
      }
    ];
  }, [url, text, hashtags, via]);

  const handleCopy = (shareUrl: string, name: string) => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolContainer title="Social Share URL & Intent Link Builder" description="Generate 1-click social sharing links for Twitter/X, LinkedIn, Facebook, WhatsApp, Reddit, and Telegram.">
      <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Target Page URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20 font-mono"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Share Message / Title:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Hashtags (comma-separated):</label>
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="devtools,coding"
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Twitter @via Handle:</label>
          <input
            type="text"
            value={via}
            onChange={(e) => setVia(e.target.value)}
            placeholder="toolsnippet"
            className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Generated Social Intent Links ({links.length}):
        </label>
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base">{link.icon}</span>
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 shrink-0 w-24">
                  {link.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate font-mono">
                  {link.url}
                </span>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-black/15 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                >
                  Test Link ↗
                </a>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(link.url, link.name)}
                >
                  {copiedKey === link.name ? "✓ Copied" : "Copy"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </ToolContainer>
  );
}
