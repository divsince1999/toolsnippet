"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryCard from "@/components/CategoryCard";
import type { CategoryConfig } from "@/lib/categories/config";
import type { ToolManifestEntry } from "@/lib/tools/types";

interface CategoryPageShellProps {
  category: CategoryConfig;
  tools: ToolManifestEntry[];
  relatedCategories: CategoryConfig[];
  categoryCounts: Record<string, number>;
}

export default function CategoryPageShell({
  category,
  tools,
  relatedCategories,
  categoryCounts,
}: CategoryPageShellProps) {
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/category" },
    { name: category.name, href: `/category/${category.slug}` },
  ];

  // Filter tools based on subcategory chips and search query
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const subcat = category.subcategories.find((s) => s.id === activeSubcategory);

    return tools.filter((tool) => {
      // Check subcategory keyword matching
      let matchesSubcat = true;
      if (subcat && subcat.id !== "all" && subcat.keywords.length > 0) {
        const textToMatch = `${tool.slug} ${tool.name} ${tool.shortDescription} ${(tool.tags || []).join(" ")}`.toLowerCase();
        matchesSubcat = subcat.keywords.some((kw) => textToMatch.includes(kw.toLowerCase()));
      }

      // Check search query matching
      let matchesQuery = true;
      if (q) {
        const fullText = `${tool.name} ${tool.shortDescription} ${tool.slug} ${(tool.tags || []).join(" ")}`.toLowerCase();
        matchesQuery = fullText.includes(q);
      }

      return matchesSubcat && matchesQuery;
    });
  }, [tools, category.subcategories, activeSubcategory, searchQuery]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      {/* 1. Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* 2. Hero Section */}
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-6 text-center dark:border-white/10 dark:from-white/[0.02] sm:p-10">
        {/* Glow backdrop */}
        <div
          className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-b ${category.color} opacity-40 blur-3xl`}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Category Icon & Badge */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm dark:bg-zinc-800">
              {category.icon}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${category.badgeBg} ${category.badgeText} border ${category.badgeBorder}`}
            >
              {tools.length} Free {category.name}
            </span>
          </div>

          {/* Heading H1 */}
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl [text-wrap:balance]">
            {category.headline}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto text-sm text-gray-600 dark:text-gray-300 sm:text-base md:text-lg">
            {category.description}
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              100% Client-Side Private
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Zero Server Latency
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              No Registration Required
            </span>
          </div>
        </div>
      </section>

      {/* 3. Filter & Search Controls */}
      <section className="mb-8 space-y-4">
        {/* Scoped Search Input */}
        <div className="relative mx-auto max-w-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${tools.length} ${category.name.toLowerCase()}...`}
            className="h-10 w-full rounded-xl border border-black/15 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-solid focus:ring-2 focus:ring-primary-solid/20 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Subcategory Filter Chips */}
        {category.subcategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {category.subcategories.map((subcat) => {
              const isActive = activeSubcategory === subcat.id;
              return (
                <button
                  key={subcat.id}
                  type="button"
                  onClick={() => setActiveSubcategory(subcat.id)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary-solid text-white shadow-sm"
                      : "border border-black/10 bg-white text-gray-700 hover:bg-black/5 dark:border-white/10 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-white/5"
                  }`}
                >
                  {subcat.label}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Tool Cards Grid */}
      <section className="mb-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Available Tools ({filteredTools.length})
          </h2>
          <Link
            href={`/tools?category=${category.toolCategory}`}
            className="text-xs font-medium text-primary-solid hover:underline"
          >
            View in Full Directory →
          </Link>
        </div>

        {filteredTools.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center dark:border-white/15">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No tools found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveSubcategory("all");
              }}
              className="mt-4 inline-flex items-center rounded-lg bg-primary-solid px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-solid/40 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-primary-solid/40"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      {category.name}
                    </span>
                    <span className="text-xs font-semibold text-primary-solid group-hover:translate-x-0.5 transition-transform">
                      Open Tool →
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 group-hover:text-primary-solid transition-colors dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                    {tool.shortDescription}
                  </p>
                </div>

                {tool.tags && tool.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-black/[0.03] px-2 py-0.5 text-[10px] text-gray-500 dark:bg-white/[0.04] dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. Editorial SEO Section */}
      <section className="mb-16 rounded-3xl border border-black/10 bg-black/[0.015] p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.015]">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {category.editorialTitle}
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {category.editorialParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      {category.faqs.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Everything you need to know about our free client-side {category.name.toLowerCase()}.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {category.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-black/10 bg-white transition-colors dark:border-white/10 dark:bg-zinc-900"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 transition hover:text-primary-solid dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary-solid" : "text-gray-400"
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="border-t border-black/5 px-5 py-4 text-xs leading-relaxed text-gray-600 dark:border-white/5 dark:text-gray-400 sm:text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Related Categories */}
      {relatedCategories.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Explore Other Categories
            </h2>
            <Link
              href="/category"
              className="text-xs font-semibold text-primary-solid hover:underline"
            >
              All Categories ({Object.keys(categoryCounts).length}) →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCategories.map((relCat) => (
              <CategoryCard
                key={relCat.slug}
                category={relCat}
                toolCount={categoryCounts[relCat.toolCategory] || 0}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
