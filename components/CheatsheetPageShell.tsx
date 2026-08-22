"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CheatsheetCard from "@/components/CheatsheetCard";
import type { CheatsheetConfig } from "@/lib/cheatsheets/config";

interface CheatsheetPageShellProps {
  cheatsheet: CheatsheetConfig;
  relatedCheatsheets: CheatsheetConfig[];
}

export default function CheatsheetPageShell({
  cheatsheet,
  relatedCheatsheets,
}: CheatsheetPageShellProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Cheat Sheets", href: "/cheatsheet" },
    { name: cheatsheet.title, href: `/cheatsheet/${cheatsheet.slug}` },
  ];

  // Copy to clipboard helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => {
      setCopiedToken((prev) => (prev === text ? null : prev));
    }, 2000);
  };

  // Filter sections and rows based on search query
  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return cheatsheet.sections;

    return cheatsheet.sections
      .map((section) => {
        const matchingRows = section.rows.filter((row) => {
          return (
            row.syntax.toLowerCase().includes(q) ||
            row.name.toLowerCase().includes(q) ||
            row.description.toLowerCase().includes(q) ||
            (row.example && row.example.toLowerCase().includes(q))
          );
        });

        return {
          ...section,
          rows: matchingRows,
        };
      })
      .filter((section) => section.rows.length > 0);
  }, [cheatsheet.sections, searchQuery]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      {/* 1. Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* 2. Hero Section */}
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-6 text-center dark:border-white/10 dark:from-white/[0.02] sm:p-10">
        <div
          className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gradient-to-b ${cheatsheet.color} opacity-40 blur-3xl`}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Badge */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm dark:bg-zinc-800">
              {cheatsheet.icon}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${cheatsheet.badgeBg} ${cheatsheet.badgeText} border ${cheatsheet.badgeBorder}`}
            >
              Developer Cheat Sheet
            </span>
          </div>

          {/* Heading H1 */}
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl [text-wrap:balance]">
            {cheatsheet.headline}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto text-sm text-gray-600 dark:text-gray-300 sm:text-base md:text-lg">
            {cheatsheet.description}
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              1-Click Syntax Copy
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Production-Tested Standards
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] px-2.5 py-1 dark:bg-white/[0.05]">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Interactive Tool Companion
            </span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Tool Companion CTA Banner */}
      <section className="mb-10 rounded-2xl border border-primary-solid/30 bg-primary-solid/[0.04] p-5 dark:border-primary-solid/30 dark:bg-primary-solid/[0.08]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base">⚡</span>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {cheatsheet.toolCta.title}
              </h2>
            </div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
              {cheatsheet.toolCta.description}
            </p>
          </div>
          <Link
            href={`/tools/${cheatsheet.toolCta.toolSlug}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary-solid px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-solid-hover"
          >
            Launch {cheatsheet.toolCta.toolName} →
          </Link>
        </div>
      </section>

      {/* 4. Search & Jump Navigation Bar */}
      <section className="sticky top-20 z-30 mb-8 rounded-2xl border border-black/10 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/90">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Search */}
          <div className="relative w-full sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference tokens..."
              className="h-9 w-full rounded-lg border border-black/15 bg-black/[0.02] pl-9 pr-8 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary-solid focus:ring-1 focus:ring-primary-solid dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Jump Links */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto text-xs">
            <span className="hidden text-gray-400 sm:inline">Jump to:</span>
            {cheatsheet.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="rounded-md bg-black/[0.04] px-2.5 py-1 text-gray-700 transition hover:bg-primary-solid/10 hover:text-primary-solid dark:bg-white/[0.05] dark:text-gray-300 dark:hover:bg-primary-solid/20 dark:hover:text-primary-solid"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Reference Tables Sections */}
      <div className="space-y-12">
        {filteredSections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center dark:border-white/15">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No syntax tokens found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 inline-flex items-center rounded-lg bg-primary-solid px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          filteredSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-36 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900/70"
            >
              {/* Section Header */}
              <div className="border-b border-black/10 bg-black/[0.015] px-6 py-4 dark:border-white/10 dark:bg-white/[0.015]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-black/5 bg-black/[0.01] text-xs uppercase tracking-wider text-gray-500 dark:border-white/5 dark:bg-white/[0.01] dark:text-gray-400">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Syntax / Token</th>
                      <th className="px-5 py-3 font-semibold">Name / Type</th>
                      <th className="px-5 py-3 font-semibold">Description</th>
                      <th className="px-5 py-3 font-semibold">Example / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {section.rows.map((row, idx) => {
                      const isCopied = copiedToken === row.syntax;
                      return (
                        <tr
                          key={idx}
                          className="transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.015]"
                        >
                          {/* Syntax with 1-click copy */}
                          <td className="px-5 py-3.5 align-top">
                            <div className="flex items-center gap-2">
                              <code className="whitespace-pre rounded-md bg-black/[0.05] px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:bg-white/[0.06] dark:text-emerald-400">
                                {row.syntax}
                              </code>
                              <button
                                type="button"
                                onClick={() => handleCopy(row.syntax)}
                                title="Click to copy syntax"
                                aria-label={`Copy ${row.name}`}
                                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-black/10 text-gray-400 transition hover:border-primary-solid hover:text-primary-solid dark:border-white/10 dark:hover:border-primary-solid"
                              >
                                {isCopied ? (
                                  <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Name */}
                          <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white align-top">
                            {row.name}
                          </td>

                          {/* Description */}
                          <td className="px-5 py-3.5 text-gray-600 dark:text-gray-300 align-top">
                            {row.description}
                          </td>

                          {/* Example */}
                          <td className="px-5 py-3.5 align-top">
                            {row.example ? (
                              <code className="rounded bg-black/[0.03] px-2 py-0.5 font-mono text-xs text-gray-700 dark:bg-white/[0.04] dark:text-gray-300">
                                {row.example}
                              </code>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))
        )}
      </div>

      {/* 6. FAQ Section */}
      {cheatsheet.faqs.length > 0 && (
        <section className="my-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Common questions and developer tips regarding {cheatsheet.title.toLowerCase()}.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {cheatsheet.faqs.map((faq, index) => {
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

      {/* 7. Related Cheat Sheets */}
      {relatedCheatsheets.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Explore More Cheat Sheets
            </h2>
            <Link
              href="/cheatsheet"
              className="text-xs font-semibold text-primary-solid hover:underline"
            >
              All Cheat Sheets →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCheatsheets.map((rel) => (
              <CheatsheetCard key={rel.slug} cheatsheet={rel} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
