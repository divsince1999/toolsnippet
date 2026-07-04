import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | ToolSnippet",
  description: "The page you are looking for does not exist. Browse our collection of 50+ free online developer tools.",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32">
      <div className="max-w-md w-full">
        {/* Error Code Tag */}
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          ⚠️ 404 Error
        </span>

        {/* Title */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Page <span className="text-primary">Not Found</span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          The utility or resource you are looking for has been moved, renamed, or does not exist.
        </p>

        {/* Quick Links Box */}
        <div className="mt-10 rounded-xl border border-black/10 bg-white/50 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Looking for a specific utility?
          </h2>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Browse our primary categories of 50+ secure, local developer tools:
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-left">
            {[
              { name: "Text Converters", href: "/?category=Text" },
              { name: "Formatters", href: "/?category=Data" },
              { name: "Encoders & Decoders", href: "/?category=Encoding" },
              { name: "Validation Utilities", href: "/?category=Validation" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="rounded-md border border-black/5 bg-white p-2.5 text-xs font-medium text-primary hover:bg-black/5 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/5 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-primary-solid px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-primary-solid-hover transition"
          >
            Go to Homepage
          </Link>
          <Link
            href="/tools"
            className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10 transition"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
