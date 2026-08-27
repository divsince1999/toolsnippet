import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderSearch from "@/components/HeaderSearch";

export default function Header() {
  return (
    <header className="min-h-[73px] border-b border-black/10 dark:border-white/10 sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-[1920px] flex-wrap items-center justify-between gap-3 p-4 md:flex-nowrap md:gap-6">
        <Link href="/" aria-label="ToolSnippet home" className="flex shrink-0 items-center gap-2 hover:opacity-90 transition-opacity">
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

        {/* Header Search Bar */}
        <div className="order-3 w-full flex-1 md:order-2 md:w-auto md:max-w-md">
          <HeaderSearch />
        </div>

        <nav aria-label="Main navigation" className="order-2 md:order-3">
          <ul className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-primary-solid transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/category" className="hover:text-primary-solid transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/cheatsheet" className="hover:text-primary-solid transition-colors whitespace-nowrap">
                Cheat Sheets
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-primary-solid transition-colors">
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
