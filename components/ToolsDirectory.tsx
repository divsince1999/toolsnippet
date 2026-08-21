"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";

const manifest: ToolManifestEntry[] = rawManifest as ToolManifestEntry[];

export default function ToolsDirectory() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "All";

  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [userCategory, setUserCategory] = useState<string | null>(null);

  const searchQuery = userQuery !== null ? userQuery : urlQuery;
  const activeCategory = userCategory !== null ? userCategory : urlCategory;

  // Unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(manifest.map((t) => t.category)));
    return ["All", ...unique];
  }, []);

  // Filter tools
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return manifest.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        (tool.tags && tool.tags.some((tag) => tag.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  // Count tools per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: manifest.length };
    for (const tool of manifest) {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Group filtered tools by category when in "All" view with no specific category filter
  const groupedTools = useMemo(() => {
    const groups: { category: string; tools: ToolManifestEntry[] }[] = [];
    const cats = activeCategory === "All"
      ? Array.from(new Set(filteredTools.map((t) => t.category)))
      : [activeCategory];

    for (const cat of cats) {
      const items = filteredTools.filter((t) => t.category === cat);
      if (items.length > 0) {
        groups.push({ category: cat, tools: items });
      }
    }
    return groups;
  }, [filteredTools, activeCategory]);

  const handleReset = () => {
    setUserQuery("");
    setUserCategory("All");
  };

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="mx-auto mb-8 max-w-2xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 dark:text-gray-500">
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
            value={searchQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Search tools by name, keyword, or description..."
            aria-label="Search all tools"
            className="h-12 w-full rounded-xl border border-black/15 bg-white pl-11 pr-10 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-primary-solid focus:ring-2 focus:ring-primary-solid/20 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-primary-solid"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setUserQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Clear search query"
            >
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setUserCategory(category)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-primary-solid text-white shadow-sm dark:text-black"
                  : "border border-black/10 bg-black/[0.02] text-gray-700 hover:bg-black/5 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/10"
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-black"
                    : "bg-black/5 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-3 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
        <span>
          Showing <strong className="text-gray-900 dark:text-gray-100">{filteredTools.length}</strong> {filteredTools.length === 1 ? "tool" : "tools"}
          {activeCategory !== "All" && ` in "${activeCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(searchQuery || activeCategory !== "All") && (
          <button
            type="button"
            onClick={handleReset}
            className="text-primary-solid hover:underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Grouped / Filtered Results */}
      {filteredTools.length > 0 ? (
        <div className="space-y-10">
          {groupedTools.map(({ category, tools }) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-400">
                  {tools.length}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-black/10 bg-white p-4.5 transition hover:border-primary-solid/50 hover:shadow-sm dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-primary-solid/50"
                  >
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-solid">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-solid dark:text-gray-100">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                        {tool.shortDescription}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center text-xs font-medium text-primary-solid">
                      <span>Open tool</span>
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="my-16 rounded-2xl border border-dashed border-black/15 py-16 text-center dark:border-white/15">
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
            No developer tools found matching &quot;{searchQuery}&quot;
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Try searching with different keywords or clear the category filter.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 inline-flex items-center rounded-lg bg-primary-solid px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:text-black"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
