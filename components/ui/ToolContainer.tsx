import type { ReactNode } from "react";

interface ToolContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "4xl" | "5xl" | "6xl";
}

export default function ToolContainer({
  title,
  description,
  children,
  maxWidth = "6xl",
}: ToolContainerProps) {
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
  };

  return (
    <section className={`mx-auto w-full ${maxWidthClasses[maxWidth]} px-4`}>
      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
