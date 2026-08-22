import Link from "next/link";
import type { CheatsheetConfig } from "@/lib/cheatsheets/config";

interface CheatsheetCardProps {
  cheatsheet: CheatsheetConfig;
}

export default function CheatsheetCard({ cheatsheet }: CheatsheetCardProps) {
  const totalRows = cheatsheet.sections.reduce((acc, s) => acc + s.rows.length, 0);

  return (
    <Link
      href={`/cheatsheet/${cheatsheet.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-solid/50 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-primary-solid/50"
    >
      {/* Top Accent Gradient Bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${cheatsheet.color} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Header: Icon & Category Badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.04] text-2xl shadow-inner dark:bg-white/[0.06]">
            {cheatsheet.icon}
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cheatsheet.badgeBg} ${cheatsheet.badgeText} border ${cheatsheet.badgeBorder}`}
          >
            {totalRows} Tokens
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-solid dark:text-white">
          {cheatsheet.title}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
          {cheatsheet.description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary-solid">
        <span>View Cheat Sheet</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
