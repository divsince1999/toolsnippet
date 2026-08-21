"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UtmBuilderTool() {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("spring_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generatedUrl = useMemo(() => {
    if (!baseUrl.trim()) return "";
    try {
      const url = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
      if (source.trim()) url.searchParams.set("utm_source", source.trim());
      if (medium.trim()) url.searchParams.set("utm_medium", medium.trim());
      if (campaign.trim()) url.searchParams.set("utm_campaign", campaign.trim());
      if (term.trim()) url.searchParams.set("utm_term", term.trim());
      if (content.trim()) url.searchParams.set("utm_content", content.trim());
      return url.toString();
    } catch {
      return "";
    }
  }, [baseUrl, source, medium, campaign, term, content]);

  const handleCopy = async () => {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setBaseUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  return (
    <ToolContainer
      title="UTM Campaign URL Builder"
      description="Create tracked marketing URLs for Google Analytics with custom UTM parameters."
      maxWidth="5xl"
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Website URL *</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/pricing"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Campaign Source (utm_source) *</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google, newsletter, twitter"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Campaign Medium (utm_medium) *</label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="cpc, banner, email, social"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Campaign Name (utm_campaign) *</label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="spring_launch, black_friday"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Campaign Term (utm_term)</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="paid search keywords"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Campaign Content (utm_content)</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="logolink, textlink, cta_button"
              className="w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCopy} disabled={!generatedUrl}>
            {isCopied ? "Copied URL!" : "Copy Generated URL"}
          </Button>
          <Button variant="ghost" onClick={handleClear}>
            Clear All
          </Button>
        </div>

        {generatedUrl && (
          <TextArea
            label="Generated Campaign URL"
            readOnly
            copyable
            value={generatedUrl}
            rows={3}
          />
        )}
      </div>
    </ToolContainer>
  );
}
