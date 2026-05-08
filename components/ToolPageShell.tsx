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
        <div className="mt-4 space-y-4">
          {tool.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-black/10 p-4 dark:border-white/10"
            >
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
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
