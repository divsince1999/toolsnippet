import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  const currentYear = 2026;

  // Select a few tools to display in Quick Links
  const quickLinkTools = tools.slice(0, 5);

  return (
    <footer className="mt-auto border-t border-black/10 bg-white pt-25 dark:border-white/10 dark:bg-black/20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="ToolSnippet home" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-solid text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <span className="text-2xl font-bold tracking-tight text-primary-solid">
                ToolSnippet
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Modern utilities built with Vanilla JS & Standardized Design. Fast,
              secure, and free online utilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {quickLinkTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="hover:text-primary-solid transition">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-primary-solid transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="inline-flex items-center font-medium text-primary-solid hover:underline"
                >
                  View All Tools <span className="ml-1">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-black/5 py-8 text-center text-xs text-gray-500 dark:border-white/5 dark:text-gray-400">
        <div className="mx-auto max-w-6xl">
          <p>
            © {currentYear} ToolBox. All rights reserved. |{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
