import type { ReactNode } from "react";
import Link from "next/link";
import type { ToolInfo } from "@/lib/tools";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddToRecentTools from "@/components/AddToRecentTools";
import { getCategoryByToolCategory } from "@/lib/categories/config";

type ToolPageShellProps = {
  tool: ToolInfo;
  relatedTools: ToolInfo[];
  children: ReactNode;
};

export default function ToolPageShell({
  tool,
  relatedTools,
  children,
}: ToolPageShellProps) {
  const categoryConfig = getCategoryByToolCategory(tool.category);

  const breadcrumbItems = categoryConfig
    ? [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/category" },
        { name: categoryConfig.name, href: `/category/${categoryConfig.slug}` },
        { name: tool.name, href: `/tools/${tool.slug}` },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Tools", href: "/tools" },
        { name: tool.name, href: `/tools/${tool.slug}` },
      ];

  return (
    <main>
      <AddToRecentTools tool={tool} />
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 mb-8 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs items={breadcrumbItems} />
        {categoryConfig && (
          <Link
            href={`/category/${categoryConfig.slug}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${categoryConfig.badgeBg} ${categoryConfig.badgeText} border ${categoryConfig.badgeBorder} transition hover:opacity-80`}
          >
            <span>{categoryConfig.icon}</span>
            <span>Part of {categoryConfig.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight [text-wrap:balance]">{tool.heroTitle}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300">
          {tool.heroDescription}
        </p>
      </section>

      {children}

      <section className="mx-auto w-full max-w-6xl px-4 mt-15">
        <h2 className="text-2xl font-bold">About This Tool</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{tool.about}</p>
      </section>

      {tool.features && tool.features.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 mt-15">
          <h2 className="text-2xl font-bold">Key Features</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tool.features.map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-black/10 p-4 transition hover:border-primary/50 dark:border-white/10"
              >
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 mt-15">
          <h2 className="text-2xl font-bold">How to Use</h2>
          <ol className="mt-4 space-y-3">
            {tool.howToUse.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {tool.whyUse && tool.whyUse.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 mt-15">
          <h2 className="text-2xl font-bold">Why Use ToolSnippet {tool.name}?</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {tool.whyUse.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 flex-shrink-0 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {tool.tips && tool.tips.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 mt-15">
          <h2 className="text-2xl font-bold">Tips for Best Results</h2>
          <ul className="mt-4 space-y-2">
            {tool.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
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
                  className="mt-0.5 flex-shrink-0 text-amber-500"
                >
                  <path d="M12 2v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="M12 22v-4" />
                  <path d="m19.07 19.07-2.83-2.83" />
                  <path d="M22 12h-4" />
                  <path d="m19.07 4.93-2.83 2.83" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 mt-15">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            {tool.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-black/10 p-4 transition open:border-primary/50 dark:border-white/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  <span>{faq.question}</span>
                  <span className="ml-1.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/5 transition duration-300 group-open:-rotate-180 dark:bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-4 mt-15 mb-25">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Related Tools</h2>
          {categoryConfig && (
            <Link
              href={`/category/${categoryConfig.slug}`}
              className="text-xs font-semibold text-primary-solid hover:underline"
            >
              All {categoryConfig.name} →
            </Link>
          )}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((related) => (
            <Link
              key={related.slug}
              href={`/tools/${related.slug}`}
              className="rounded-lg border border-black/10 p-4 transition hover:border-primary/50 dark:border-white/10"
            >
              <h3 className="font-semibold">{related.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {related.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}