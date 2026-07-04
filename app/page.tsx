import type { Metadata } from "next";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import ToolGrid from "@/components/ToolGrid";

export const metadata: Metadata = {
  title: "ToolSnippet - Free Online Developer Tools & Formatting Utilities",
  description:
    "Fast, secure, and 100% private client-side utilities for developers. Format JSON, CSV, SQL, XML, HTML, decode JWT, generate secure passwords, passwords, and convert encoding instantly.",
  alternates: {
    canonical: "https://toolsnippet.com/",
  },
};

export default function Home() {
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolSnippet",
    "url": "https://toolsnippet.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://toolsnippet.com/?q={search_term_string}",
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
      <Suspense fallback={
        <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center text-gray-500">
          Loading tools...
        </div>
      }>
        <ToolGrid />
      </Suspense>
    </main>
  );
}
