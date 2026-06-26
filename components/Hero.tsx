import Link from "next/link";

type HeroProps = {
  title?: string;
  highlight?: string;
  description?: string;
  badges?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function Hero({
  title = "Powerful Tools,",
  highlight = "Simplified.",
  description = "Fast, secure, and free online utilities for developers, writers, and digital professionals. No registration, no ads, just tools.",
  badges = ["Free & Easy", "No Signup", "100% Private"],
  ctaLabel = "Explore Tools",
  ctaHref = "/#tools",
}: HeroProps) {
  return (
    <section className="px-4 py-20 sm:py-25">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title} <span className="text-primary">{highlight}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-black/10 dark:border-white/10 px-4 py-1.5 text-sm font-medium"
            >
              {"\u2713"} {badge}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={ctaHref}
            className="inline-flex items-center rounded-md bg-primary-solid px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-solid-hover dark:text-black"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
