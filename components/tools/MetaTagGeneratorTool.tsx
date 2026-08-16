"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("My Awesome Website - Fast & Secure");
  const [description, setDescription] = useState("Discover the ultimate web platform for modern developers and creators.");
  const [url, setUrl] = useState("https://example.com");
  const [imageUrl, setImageUrl] = useState("https://example.com/og-image.jpg");
  const [author, setAuthor] = useState("John Doe");
  const [twitterHandle, setTwitterHandle] = useState("@mywebsite");
  const [isCopied, setIsCopied] = useState(false);

  const generatedTags = useMemo(() => {
    let tags = `<!-- Primary Meta Tags -->\n`;
    tags += `<title>${title}</title>\n`;
    tags += `<meta name="title" content="${title}" />\n`;
    tags += `<meta name="description" content="${description}" />\n`;
    if (author) tags += `<meta name="author" content="${author}" />\n`;
    tags += `<link rel="canonical" href="${url}" />\n\n`;

    tags += `<!-- Open Graph / Facebook -->\n`;
    tags += `<meta property="og:type" content="website" />\n`;
    tags += `<meta property="og:url" content="${url}" />\n`;
    tags += `<meta property="og:title" content="${title}" />\n`;
    tags += `<meta property="og:description" content="${description}" />\n`;
    if (imageUrl) tags += `<meta property="og:image" content="${imageUrl}" />\n\n`;

    tags += `<!-- Twitter -->\n`;
    tags += `<meta property="twitter:card" content="summary_large_image" />\n`;
    tags += `<meta property="twitter:url" content="${url}" />\n`;
    tags += `<meta property="twitter:title" content="${title}" />\n`;
    tags += `<meta property="twitter:description" content="${description}" />\n`;
    if (imageUrl) tags += `<meta property="twitter:image" content="${imageUrl}" />\n`;
    if (twitterHandle) tags += `<meta name="twitter:creator" content="${twitterHandle}" />\n`;

    return tags;
  }, [title, description, url, imageUrl, author, twitterHandle]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedTags);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Open Graph & Meta Tag Generator"
      description="Generate complete HTML meta tags, OpenGraph (Facebook/LinkedIn), and Twitter Cards for social SEO."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Page Title * (50-60 characters)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
            <div className="mt-1 text-xs text-gray-500">{title.length} characters</div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Page Description * (150-160 characters)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
            <div className="mt-1 text-xs text-gray-500">{description.length} characters</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Canonical URL *</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Social Preview Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Twitter / X Handle</label>
            <input
              type="text"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCopy}>
            {isCopied ? "Copied Tags!" : "Copy Meta Tags"}
          </Button>
        </div>

        <TextArea
          label="Generated HTML Meta Tags"
          readOnly
          copyable
          value={generatedTags}
          rows={14}
        />
      </div>
    </ToolContainer>
  );
}
