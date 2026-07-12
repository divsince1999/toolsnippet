"use client";

import Link from "next/link";
import { useRecentTools } from "@/hooks/useRecentTools";

export default function RecentlyUsedTools() {
  const { recentTools } = useRecentTools();

  // Only render if there are recent tools
  if (recentTools.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-25">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Recently Used Tools</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Continue where you left off.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentTools.map((tool) => (
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
        ))}
      </div>
    </section>
  );
}
