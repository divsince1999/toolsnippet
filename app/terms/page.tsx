import Link from "next/link";

export const metadata = {
  title: "Terms of Service | ToolSnippet",
  description: "Terms and conditions governing the use of ToolSnippet's free online developer utilities and cheat sheets.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "August 2026";

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-primary-solid/10 px-3 py-1 text-xs font-semibold text-primary-solid">
          📜 Legal Agreement
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Terms of <span className="text-primary-solid">Service</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Please read these terms carefully before using ToolSnippet. By accessing or using our website, you agree to be bound by these terms.
        </p>
      </div>

      <div className="mt-12 space-y-6 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="mt-3">
            By visiting, accessing, or using ToolSnippet (accessible at{" "}
            <Link href="/" className="text-primary-solid hover:underline">
              https://www.toolsnippet.com
            </Link>
            ), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue use of the website immediately.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Permitted Use & License</h2>
          <p className="mt-3">
            ToolSnippet grants you a free, non-exclusive, revocable license to access and use our utilities for personal, educational, research, development, and commercial purposes. You are free to:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>Format, convert, validate, and manipulate code, text, schemas, and configurations.</li>
            <li>Generate configuration files (.gitignore, Dockerfiles, Nginx configs, robots.txt) for inclusion in your software projects.</li>
            <li>Use generated code snippets and cheat sheets without royalty or licensing fees.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Client-Side Processing & User Responsibility</h2>
          <p className="mt-3">
            ToolSnippet operates on a 100% client-side execution model. All operations, conversions, cryptography, and formatting are executed locally in your browser memory. You acknowledge that:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>You are solely responsible for the inputs you process and verifying the accuracy of all generated outputs.</li>
            <li>ToolSnippet does not store, backup, or retain any data. Closing your browser session permanently clears active workspace contents.</li>
            <li>You must not use our tools for unlawful activities, malicious network testing, or violating third-party intellectual property rights.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Disclaimer of Warranties</h2>
          <p className="mt-3">
            ToolSnippet and all associated services, scripts, and documentation are provided on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without warranties of any kind, whether express, implied, statutory, or otherwise.
          </p>
          <p className="mt-2">
            While we strive for 100% mathematical and syntactic precision, we do not warrant that our tools will be error-free, uninterrupted, or free from bugs. You are advised to review and test all configurations before deploying to production environments.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Limitation of Liability</h2>
          <p className="mt-3">
            In no event shall ToolSnippet, its creators, or contributors be liable for any direct, indirect, incidental, special, consequential, or exemplary damages (including, but not limited to, loss of data, loss of profits, system downtime, or business interruption) arising out of the use or inability to use this service.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">6. Changes to Terms</h2>
          <p className="mt-3">
            We reserve the right to modify or replace these Terms of Service at any time. Continued use of ToolSnippet after any updates constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">7. Contact Information</h2>
          <p className="mt-3">
            If you have questions regarding these Terms of Service, please visit our{" "}
            <Link href="/contact" className="text-primary-solid hover:underline">
              Contact Page
            </Link>{" "}
            or email us at <code>contact@toolsnippet.com</code>.
          </p>
        </section>
      </div>

      <p className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
        Last updated: {lastUpdated}
      </p>
    </main>
  );
}
