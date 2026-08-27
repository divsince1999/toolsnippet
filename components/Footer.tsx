import Link from "next/link";
import { tools } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories/config";
import { CHEATSHEETS } from "@/lib/cheatsheets/config";

export default function Footer() {
  const currentYear = 2026;

  // Select a few tools to display in Quick Links
  const quickLinkTools = tools.slice(0, 5);

  return (
    <footer className="mt-auto border-t border-black/10 bg-white pt-16 dark:border-white/10 dark:bg-black/20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              aria-label="ToolSnippet home"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
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
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Free, fast, private, and client-side utilities built for web developers and engineers.
            </p>
          </div>

          {/* Categories Hub Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-primary-solid transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/category"
                  className="font-semibold text-primary-solid hover:underline"
                >
                  All 9 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Cheat Sheets */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Cheat Sheets
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {CHEATSHEETS.slice(0, 5).map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`/cheatsheet/${cs.slug}`}
                    className="hover:text-primary-solid transition-colors"
                  >
                    {cs.title.split(" (")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cheatsheet"
                  className="font-semibold text-primary-solid hover:underline"
                >
                  All {CHEATSHEETS.length} Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Top Tools
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              {quickLinkTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="hover:text-primary-solid transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Company &amp; Legal
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-solid transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary-solid transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary-solid transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-solid transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-primary-solid transition-colors"
                >
                  Tools Directory ({tools.length})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-black/5 py-8 text-center text-xs text-gray-500 dark:border-white/5 dark:text-gray-400">
        <div className="mx-auto max-w-6xl px-4">
          <p>
            © {currentYear} ToolSnippet. All rights reserved. 100% Client-Side Processing.
          </p>
        </div>
      </div>
    </footer>
  );
}
