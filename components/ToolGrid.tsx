"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";
import { tools as legacyTools } from "@/lib/tools";

// Fall back to mapping lightweight legacy entries only if manifest.json is empty during development
const manifestData: ToolManifestEntry[] =
  (rawManifest as ToolManifestEntry[]).length > 0
    ? (rawManifest as ToolManifestEntry[])
    : legacyTools.map(({ slug, name, category, shortDescription, tags, icon }) => ({
        slug,
        name,
        category,
        shortDescription,
        tags,
        icon,
      }));

const PAGE_SIZE = 24;

export default function ToolGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(manifestData.map((tool) => tool.category)))],
    []
  );
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return manifestData.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        !query ||
        tool.name.toLowerCase().includes(query) ||
        tool.shortDescription.toLowerCase().includes(query) ||
        (tool.tags && tool.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleTools = useMemo(() => {
    return filteredTools.slice(0, visibleCount);
  }, [filteredTools, visibleCount]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const hasMore = visibleCount < filteredTools.length;

  return (
    <section id="tools" className="mx-auto w-full max-w-6xl px-4 pb-25">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-4">Available Tools</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Developer-friendly utilities for everyday tasks.
        </p>

        <div className="mx-auto max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            aria-label="Search tools"
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-transparent rounded-lg border border-black/15 py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary dark:border-white/20"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-md px-4 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-primary-solid text-white dark:text-black"
                      : "border border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </aside>

        <div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleTools.length > 0 ? (
              visibleTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-xl border border-black/10 p-5 transition hover:border-primary/50 hover:shadow-sm dark:border-white/10"
                >
                  <p className="text-primary mb-2 text-xs font-semibold uppercase tracking-wide">
                    {tool.category}
                  </p>
                  <h3 className="text-lg font-semibold">{tool.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {tool.shortDescription}
                  </p>
                  <span className="text-primary mt-4 inline-block text-sm font-medium">
                    Open tool →
                  </span>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No tools found matching &quot;{searchQuery}&quot; in {activeCategory} category.
                </p>
                <button
                  onClick={() => {
                    handleSearchChange("");
                    handleCategoryChange("All");
                  }}
                  className="mt-4 text-primary hover:underline text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {filteredTools.length > 0 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-black/10 pt-6 dark:border-white/10">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{visibleTools.length}</span> of{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredTools.length}</span> tools
              </p>

              {hasMore && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="inline-flex items-center justify-center rounded-lg bg-primary-solid px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:text-black"
                  >
                    Load More Tools ({Math.min(PAGE_SIZE, filteredTools.length - visibleCount)} more)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredTools.length)}
                    className="inline-flex items-center justify-center rounded-lg border border-black/15 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-black/5 dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/10"
                  >
                    Show All ({filteredTools.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

