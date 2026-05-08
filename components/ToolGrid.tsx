"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tools } from "@/lib/tools";

export default function ToolGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tools.map((tool) => tool.category)))],
    []
  );
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md px-4 py-2 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-primary-solid text-white"
                      : "border border-black/15 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
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
                No tools found matching "{searchQuery}" in {activeCategory} category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-primary hover:underline text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
