import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryCard from "@/components/CategoryCard";
import { CATEGORIES } from "@/lib/categories/config";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";
import { buildAllCategoriesBreadcrumbSchema } from "@/lib/seo/schema";

const manifest: ToolManifestEntry[] = rawManifest as ToolManifestEntry[];

export const metadata: Metadata = {
  title: "Tool Categories & Topic Hubs | ToolSnippet",
  description:
    "Explore 230+ free online developer utilities grouped into 9 specialized category hubs: Data Converters, Text Tools, Math, Design, Security, Encoding, and DevOps.",
  alternates: {
    canonical: "/category",
  },
  openGraph: {
    title: "Developer Tool Categories & Hubs | ToolSnippet",
    description:
      "Explore 230+ free online developer utilities grouped into 9 specialized category hubs.",
    url: "https://www.toolsnippet.com/category",
    siteName: "ToolSnippet",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "ToolSnippet Categories",
      },
    ],
  },
};

export default function CategoriesIndexPage() {
  const categoryCounts: Record<string, number> = {};
  for (const tool of manifest) {
    categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
  }

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/category" },
  ];

  const breadcrumbSchema = buildAllCategoriesBreadcrumbSchema();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ToolSnippet Categories Directory",
    description: "Browse all tool categories and topic clusters on ToolSnippet.",
    url: "https://www.toolsnippet.com/category",
    numberOfItems: CATEGORIES.length,
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
            <span>✨</span> 9 Specialized Tool Hubs
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Explore Tools by Category
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Discover curated collections of fast, private browser utilities tailored for developers, DevOps engineers, copywriters, and designers.
          </p>
        </section>

        {/* Categories Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              toolCount={categoryCounts[category.toolCategory] || 0}
            />
          ))}
        </section>

        {/* Directory CTA */}
        <section className="rounded-3xl border border-black/10 bg-gradient-to-r from-primary-solid/5 via-primary-solid/10 to-primary-solid/5 p-8 text-center dark:border-white/10">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Looking for all tools in one searchable list?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Browse our complete interactive directory of {manifest.length}+ client-side utilities with tag filtering.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center rounded-md bg-primary-solid px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-solid-hover dark:text-black"
          >
            Open Full Tools Directory ({manifest.length})
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </section>
      </main>
    </>
  );
}
