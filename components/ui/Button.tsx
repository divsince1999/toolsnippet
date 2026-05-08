import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  children: ReactNode;
  as?: "button" | "a";
  className?: string;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as = "button",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary-solid text-white hover:bg-primary-solid-hover",
    secondary: "bg-black/5 text-gray-900 hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
    outline: "border border-black/15 bg-transparent hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10",
    ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-9 w-9",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === "a") {
    return (
      <a className={combinedClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
