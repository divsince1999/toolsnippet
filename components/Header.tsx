import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
        <Link href="/" aria-label="ToolSnippet home">
          <Image
            src="/images/site-logo.png"
            alt="ToolSnippet"
            width={320}
            height={88}
            className="h-10 w-auto"
            priority
          />
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
