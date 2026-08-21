"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function JsonLdGeneratorTool() {
  const [schemaType, setSchemaType] = useState<"article" | "organization" | "faq" | "product">("article");
  
  // Article fields
  const [headline, setHeadline] = useState("Modern Web Performance Best Practices");
  const [author, setAuthor] = useState("Alex Developer");
  const [datePublished, setDatePublished] = useState("2026-08-18");
  const [articleImage, setArticleImage] = useState("https://example.com/images/article.jpg");

  // Organization fields
  const [orgName, setOrgName] = useState("ToolSnippet");
  const [orgUrl, setOrgUrl] = useState("https://www.toolsnippet.com");
  const [orgLogo, setOrgLogo] = useState("https://www.toolsnippet.com/logo.png");

  // FAQ fields
  const [faqQ1, setFaqQ1] = useState("Are all developer tools on ToolSnippet free?");
  const [faqA1, setFaqA1] = useState("Yes, all developer tools are 100% free and run client-side in your browser.");
  const [faqQ2, setFaqQ2] = useState("Is my data sent to any server?");
  const [faqA2, setFaqA2] = useState("No, all data processing happens locally in your browser with zero server tracking.");

  const jsonLdCode = useMemo(() => {
    let schemaObj: Record<string, unknown> = {};

    if (schemaType === "article") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline,
        image: [articleImage],
        datePublished: datePublished,
        dateModified: datePublished,
        author: [{
          "@type": "Person",
          name: author,
        }],
      };
    } else if (schemaType === "organization") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: orgName,
        url: orgUrl,
        logo: orgLogo,
      };
    } else if (schemaType === "faq") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: faqQ1,
            acceptedAnswer: {
              "@type": "Answer",
              text: faqA1,
            },
          },
          {
            "@type": "Question",
            name: faqQ2,
            acceptedAnswer: {
              "@type": "Answer",
              text: faqA2,
            },
          },
        ],
      };
    } else {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Developer Tool Suite Pro",
        image: "https://example.com/product.jpg",
        description: "All-in-one developer utilities.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      };
    }

    const jsonStr = JSON.stringify(schemaObj, null, 2);
    return `<script type="application/ld+json">\n${jsonStr}\n</script>`;
  }, [schemaType, headline, author, datePublished, articleImage, orgName, orgUrl, orgLogo, faqQ1, faqA1, faqQ2, faqA2]);

  return (
    <ToolContainer
      title="JSON-LD Schema Markup Generator"
      description="Create Google-compliant structured data markup (JSON-LD) for Articles, Organizations, FAQs, and Products."
      maxWidth="5xl"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Schema.org Type
            </label>
            <select
              value={schemaType}
              onChange={(e) => setSchemaType(e.target.value as typeof schemaType)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="article">Article / Blog Post</option>
              <option value="faq">FAQ Page (Rich Snippets)</option>
              <option value="organization">Organization / Brand</option>
              <option value="product">Product / Software Application</option>
            </select>
          </div>

          {schemaType === "article" && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={articleImage}
                  onChange={(e) => setArticleImage(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Date Published (YYYY-MM-DD)</label>
                <input
                  type="date"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </>
          )}

          {schemaType === "organization" && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Website URL</label>
                <input
                  type="text"
                  value={orgUrl}
                  onChange={(e) => setOrgUrl(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={orgLogo}
                  onChange={(e) => setOrgLogo(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </>
          )}

          {schemaType === "faq" && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Question 1</label>
                <input
                  type="text"
                  value={faqQ1}
                  onChange={(e) => setFaqQ1(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  type="text"
                  value={faqA1}
                  onChange={(e) => setFaqA1(e.target.value)}
                  placeholder="Answer 1"
                  className="w-full mt-1.5 rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Question 2</label>
                <input
                  type="text"
                  value={faqQ2}
                  onChange={(e) => setFaqQ2(e.target.value)}
                  className="w-full rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  type="text"
                  value={faqA2}
                  onChange={(e) => setFaqA2(e.target.value)}
                  placeholder="Answer 2"
                  className="w-full mt-1.5 rounded-lg border border-black/15 bg-white p-2 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <TextArea
            label="Generated JSON-LD <script> Tag"
            readOnly
            copyable
            value={jsonLdCode}
            rows={16}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
