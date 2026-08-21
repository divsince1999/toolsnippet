import type { Metadata } from "next";
import { Suspense } from "react";
import ToolsDirectory from "@/components/ToolsDirectory";

export const metadata: Metadata = {
  title: "All Developer Tools & Utilities | ToolSnippet Directory",
  description:
    "Explore 170+ free online developer tools: JSON, YAML, SQL, XML, CSV converters, Base64, hashing, JWT, regex, and encoding utilities.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Developer Tools Directory
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Browse and search 170+ fast, private browser-based utilities for text, schema conversion, cryptography, networking, and validation.
        </p>
      </section>

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-solid border-t-transparent" />
          </div>
        }
      >
        <ToolsDirectory />
      </Suspense>
    </main>
  );
}

