import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Tools | ToolSnippet",
  description:
    "Browse all developer tools including text, encoding, auth, validation, and data utilities.",
  alternates: {
    canonical: "/tools",
  },
};

const categoryOrder = ["Text", "Data", "Encoding", "Auth", "Validation"] as const;

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-25">
      <section>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-center mb-4">All Tools</h1>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Find practical tools grouped by category for daily development work.
        </p>
      </section>

      <section className="mt-10 space-y-10">
        {categoryOrder.map((category) => {
          const items = tools.filter((tool) => tool.category === category);
          if (items.length === 0) {
            return null;
          }

          return (
            <div key={category}>
              <h2 className="text-xl font-semibold">{category}</h2>
              <ul className="mt-5 space-y-2 columns-3">
                {items.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </main>
  );
}
