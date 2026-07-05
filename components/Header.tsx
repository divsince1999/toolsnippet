import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="min-h-[73px] border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
        <Link href="/" aria-label="ToolSnippet home" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
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

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:underline">
                Tools
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
