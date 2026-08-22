import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheatsheetCard from "@/components/CheatsheetCard";
import { CHEATSHEETS } from "@/lib/cheatsheets/config";
import { buildAllCheatsheetsBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Developer Cheat Sheets & Syntax Reference Hubs | ToolSnippet",
  description:
    "Quick-reference developer cheat sheets with 1-click token copy for RegEx tokens, Linux crontab schedules, HTTP status codes, Dockerfile directives, Git commands, Nginx location blocks, and CSS Flexbox/Grid.",
  alternates: {
    canonical: "/cheatsheet",
  },
  openGraph: {
    title: "Developer Cheat Sheets & Reference Hubs | ToolSnippet",
    description:
      "Quick-reference developer cheat sheets with 1-click token copy for RegEx, Crontab, HTTP, Dockerfile, Git, Nginx, and CSS.",
    url: "https://www.toolsnippet.com/cheatsheet",
    siteName: "ToolSnippet",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "ToolSnippet Cheat Sheets",
      },
    ],
  },
};

export default function CheatsheetsIndexPage() {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Cheat Sheets", href: "/cheatsheet" },
  ];

  const breadcrumbSchema = buildAllCheatsheetsBreadcrumbSchema();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ToolSnippet Developer Cheat Sheets Directory",
    description: "Browse comprehensive quick-reference cheat sheets for developers.",
    url: "https://www.toolsnippet.com/cheatsheet",
    numberOfItems: CHEATSHEETS.length,
    publisher: {
      "@type": "Organization",
      name: "ToolSnippet",
      url: "https://www.toolsnippet.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2),
        }}
      />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary-solid/30 bg-primary-solid/10 px-3 py-1 text-xs font-semibold text-primary-solid">
            <span>📚</span> {CHEATSHEETS.length} Developer Quick Reference Guides
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Developer Cheat Sheets & Reference
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            High-density formula cards, syntax tables, and production-tested snippets with instant 1-click token copying and interactive tool companions.
          </p>
        </section>

        {/* Cheat Sheets Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {CHEATSHEETS.map((cs) => (
            <CheatsheetCard key={cs.slug} cheatsheet={cs} />
          ))}
        </section>

        {/* Interactive Tools Directory CTA */}
        <section className="rounded-3xl border border-black/10 bg-gradient-to-r from-primary-solid/5 via-primary-solid/10 to-primary-solid/5 p-8 text-center dark:border-white/10">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Need interactive generators and converters?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Explore 232+ client-side developer utilities designed to build, format, validate, and convert code in real-time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-md bg-primary-solid px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-solid-hover dark:text-black"
            >
              Browse All Tools (232) →
            </Link>
            <Link
              href="/category"
              className="inline-flex items-center rounded-md border border-black/15 bg-white px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-black/5 dark:border-white/15 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-white/5"
            >
              Explore Category Hubs (9)
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
