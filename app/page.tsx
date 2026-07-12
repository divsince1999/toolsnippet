import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ToolGrid from "@/components/ToolGrid";
import RecentlyUsedTools from "@/components/RecentlyUsedTools";

export const metadata: Metadata = {
  title: "Free Online Developer & Text Tools | ToolSnippet",
  description:
    "Fast, secure, and 100% private browser-based developer tools. Format JSON, CSV, SQL, XML, HTML, decode JWT, generate secure passwords, convert Base64, encode URLs, and more—no data leaves your browser.",
  alternates: {
    canonical: "https://www.toolsnippet.com/",
  },
};

export default function Home() {
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolSnippet",
    "url": "https://www.toolsnippet.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.toolsnippet.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteSchema, null, 2),
        }}
      />
      <Hero />
      <RecentlyUsedTools />
      <ToolGrid />
    </main>
  );
}
