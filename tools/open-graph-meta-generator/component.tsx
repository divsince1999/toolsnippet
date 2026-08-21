"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function OpenGraphMetaGeneratorTool() {
  const [title, setTitle] = useState("ToolSnippet — Free Online Developer & Text Tools");
  const [description, setDescription] = useState("130+ free, fast, client-side developer utilities, formatters, and generators without tracking.");
  const [url, setUrl] = useState("https://www.toolsnippet.com");
  const [imageUrl, setImageUrl] = useState("https://www.toolsnippet.com/images/og.jpg");
  const [ogType, setOgType] = useState("website");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [siteName, setSiteName] = useState("ToolSnippet");

  const metaHtml = useMemo(() => {
    return (
      `<!-- Primary Meta Tags -->\n` +
      `<title>${title}</title>\n` +
      `<meta name="title" content="${title}">\n` +
      `<meta name="description" content="${description}">\n\n` +
      `<!-- Open Graph / Facebook / LinkedIn -->\n` +
      `<meta property="og:type" content="${ogType}">\n` +
      `<meta property="og:url" content="${url}">\n` +
      `<meta property="og:title" content="${title}">\n` +
      `<meta property="og:description" content="${description}">\n` +
      `<meta property="og:image" content="${imageUrl}">\n` +
      `<meta property="og:site_name" content="${siteName}">\n\n` +
      `<!-- Twitter Cards -->\n` +
      `<meta property="twitter:card" content="${twitterCard}">\n` +
      `<meta property="twitter:url" content="${url}">\n` +
      `<meta property="twitter:title" content="${title}">\n` +
      `<meta property="twitter:description" content="${description}">\n` +
      `<meta property="twitter:image" content="${imageUrl}">`
    );
  }, [title, description, url, imageUrl, ogType, twitterCard, siteName]);

  return (
    <ToolContainer
      title="Open Graph & Twitter Card Generator"
      description="Create social sharing meta tags (OG & Twitter) with live interactive social preview cards."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Meta Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                OG Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                og:type
              </label>
              <select
                value={ogType}
                onChange={(e) => setOgType(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Twitter Card
              </label>
              <select
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              >
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {/* Social Card Preview */}
          <div className="rounded-2xl border border-black/10 p-4 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02] space-y-3">
            <span className="text-xs uppercase font-bold text-gray-500">Social Card Live Preview</span>
            <div className="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black/40">
              <div className="flex h-32 w-full items-center justify-center bg-gray-100 dark:bg-zinc-800 text-xs font-mono text-gray-400">
                🖼️ 1200 x 630 OG Image Preview
              </div>
              <div className="p-3">
                <span className="text-[11px] font-mono text-gray-400 uppercase">{new URL(url || "https://example.com").hostname}</span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">{description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated Meta Tags (HTML)"
            readOnly
            copyable
            value={metaHtml}
            rows={16}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
