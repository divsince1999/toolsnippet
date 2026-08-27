import Link from "next/link";
import { tools } from "@/lib/tools";
import { CHEATSHEETS } from "@/lib/cheatsheets/config";

export const metadata = {
  title: "About ToolSnippet | Privacy-First Developer Utilities",
  description: "Learn about ToolSnippet's mission: building free, 100% client-side developer tools and cheat sheets with zero server tracking and sub-100ms speed.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      {/* Header Section */}
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-primary-solid/10 px-3 py-1 text-xs font-semibold text-primary-solid">
          ⚡ 100% Client-Side Architecture
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          About <span className="text-primary-solid">ToolSnippet</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          ToolSnippet was founded with a single mission: to provide web developers, software engineers, designers, and students with high-performance digital utilities that respect user privacy.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Modular Tools", value: `${tools.length}+` },
          { label: "Developer Cheat Sheets", value: `${CHEATSHEETS.length}` },
          { label: "Client-Side Processing", value: "100%" },
          { label: "Server Storage", value: "0 Bytes" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-xs dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="font-mono text-3xl font-extrabold text-primary-solid sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Narrative */}
      <div className="mt-16 space-y-8 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Problem with Modern Tool Websites
          </h2>
          <p className="mt-4">
            Every day, developers format JSON strings, test regular expressions, decode JWT tokens, compress images, and generate Dockerfiles. Unfortunately, many popular tool websites have become cluttered with intrusive popup advertisements, excessive layout shifts (CLS), and opaque backend tracking.
          </p>
          <p className="mt-4">
            Worse, many legacy converters send private text, proprietary API tokens, and confidential customer payloads over the network to remote backend servers for processing.
          </p>
        </section>

        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Our Zero-Knowledge Solution
          </h2>
          <p className="mt-4">
            ToolSnippet re-engineers online developer utilities from first principles:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <strong>Zero Server Uploads:</strong> All hashing (SHA-256, Bcrypt, MD5), AES encryption, JSON conversions, and image compression execute entirely inside your local browser memory via Web Crypto, HTML5 Canvas, and WebAssembly APIs.
            </li>
            <li>
              <strong>Sub-100ms Speed:</strong> Built on Next.js 16 with static site generation (SSG), pages load instantly with zero layout shifts and minimal resource overhead.
            </li>
            <li>
              <strong>Free & Open Access:</strong> All tools are completely free to use without mandatory user accounts, subscriptions, or paywalls.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Editorial & Engineering Standards
          </h2>
          <p className="mt-4">
            Every tool on ToolSnippet is built and maintained against modern RFC specifications, WCAG 2.1 accessibility guidelines, and strict client-side sandboxing. We continuously audit our algorithms against test suites to ensure 100% mathematical and syntactic precision.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/tools"
              className="inline-flex items-center rounded-xl bg-primary-solid px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90"
            >
              Explore All {tools.length} Tools →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-black/15 bg-black/[0.02] px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-primary-solid dark:border-white/15 dark:bg-white/[0.02] dark:text-gray-200"
            >
              Contact Engineering Team
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
