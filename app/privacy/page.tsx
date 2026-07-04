import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | ToolSnippet",
  description: "Learn how ToolSnippet protects your privacy with our zero-data architecture.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "April 2026";

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-25">
      {/* Header Section */}
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          🔒 Zero-Data Architecture
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Your Privacy is Our <span className="text-primary">Foundation</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          ToolSnippet is built from the ground up with a single guarantee:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            your data never leaves your device.
          </span>{" "}
          We have no backend servers, no databases, and no tracking systems.
        </p>
      </div>

      {/* Core Pillars Grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: "💻",
            title: "100% Local Processing",
            desc: "All computation happens in your browser. No text, files, or inputs are ever transmitted over the network.",
          },
          {
            icon: "🗄️",
            title: "Zero Databases",
            desc: "We operate no databases. There is no storage layer capable of holding your data — by design.",
          },
          {
            icon: "👤",
            title: "No User Accounts",
            desc: "No sign-up, login, or account is required. We intentionally have no user identity system to protect.",
          },
          {
            icon: "🚫",
            title: "No Tracking",
            desc: "We do not use Google Analytics, Facebook Pixel, or any third-party tracking scripts that collect user behavior.",
          },
        ].map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-xl border border-black/10 bg-white p-6 text-center dark:border-white/5 dark:bg-white/[0.03]"
          >
            <div className="text-2xl">{pillar.icon}</div>
            <h3 className="mt-4 text-sm font-bold text-gray-900 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Sections */}
      <div className="mt-16 space-y-6">
        {/* Data Processing Architecture */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Data Processing Architecture
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ToolSnippet is a <span className="font-semibold">static, client-side web application</span>. Every tool — from the Word Counter to the Password Generator — runs entirely using JavaScript executed inside your web browser. When you type text into a ToolSnippet tool:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>The text is stored in your browser's memory (RAM) only while the tab is open.</li>
            <li>No network requests are made with your input data.</li>
            <li>When you close the tab, all data is immediately discarded.</li>
            <li>We have no server-side endpoint to receive data even if we wanted to.</li>
          </ul>
        </section>

        {/* What Data We Do Not Collect */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            What Data We Do Not Collect
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            We explicitly confirm we do not collect or store:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Any text you enter into our tools</li>
            <li>Files you upload or process</li>
            <li>Your IP address (no server-side logging)</li>
            <li>Browser fingerprinting data</li>
            <li>Session or user-behavior data</li>
          </ul>
        </section>

        {/* Cookies & Local Storage */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Cookies & Local Storage
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            ToolSnippet does not set any cookies. We do not use browser localStorage or sessionStorage to persist your input data between sessions. Any state managed by the application lives only in memory and is cleared when you navigate away.
          </p>
        </section>

        {/* Hosting & Infrastructure */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Hosting & Infrastructure
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            This website is served as a collection of static HTML, CSS, and JavaScript files. We use standard static hosting (e.g., GitHub Pages) which may log standard HTTP access logs (IP address, page requested, timestamp) as part of routine infrastructure operation. These logs are controlled by the hosting provider and are not accessible to or used by ToolSnippet for any purpose.
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            All pages are served exclusively over <span className="font-semibold">HTTPS</span> to ensure the transport layer between your browser and our CDN is encrypted.
          </p>
        </section>

        {/* Security Headers */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Security Headers
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            To further signal and enforce a secure environment, every page on this platform includes a strict <span className="font-semibold">Content-Security-Policy (CSP)</span> meta tag. This technical header prevents any unauthorized external scripts from executing on our pages, protecting you from third-party injection attacks.
          </p>
          <div className="mt-4 rounded-lg bg-black/5 p-4 font-mono text-[10px] text-gray-600 dark:bg-white/5 dark:text-gray-400">
            default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-black/10 bg-white p-8 dark:border-white/5 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy or our zero-data architecture, you are welcome to review the source code directly — this entire application is built with plain HTML, CSS, and Vanilla JavaScript with no obfuscation.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            ← Return to the Homepage
          </Link>
        </section>
      </div>

      <p className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
        Last updated: {lastUpdated}
      </p>
    </main>
  );
}
