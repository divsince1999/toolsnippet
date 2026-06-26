import type { ReactNode } from "react";
import Link from "next/link";
import type { ToolInfo } from "@/lib/tools";
import StructuredData from "@/components/StructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: tool.name, href: `/tools/${tool.slug}` }
  ];

  return (
    <main>
      <div className="mx-auto w-full max-w-6xl px-4 pt-25">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <section className="mx-auto w-full max-w-6xl px-4 pb-15 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{tool.heroTitle}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-300">
          {tool.heroDescription}
        </p>
      </section>

      {children}

      <section className="mx-auto w-full max-w-6xl px-4 mt-15">
        <h2 className="text-2xl font-bold">About This Tool</h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{tool.about}</p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 mt-15">
        <h2 className="text-2xl font-bold">How to Use This Tool</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          {tool.howToUse.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 mt-15">
        <h2 className="text-2xl font-bold">Why Use This Tool</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
          {tool.whyUse.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 mt-15">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {tool.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-black/10 p-4 transition-colors duration-200 dark:border-white/10 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold focus:outline-none select-none text-gray-900 dark:text-gray-100">
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

      <section className="mx-auto w-full max-w-6xl px-4 mt-15 mb-25">
        <h2 className="text-2xl font-bold">Related Tools</h2>
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
      <StructuredData tool={tool} />
    </main>
  );
}
