"use client";

import { TextareaHTMLAttributes, useState } from "react";
import Button from "./Button";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  copyable?: boolean;
}

export default function TextArea({
  label,
  error,
  copyable,
  className = "",
  value,
  ...props
}: TextAreaProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof value === "string") {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {label && (
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </label>
        )}
        {copyable && value && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleCopy}
          >
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>
      <textarea
        value={value}
        className={`w-full rounded-lg border border-black/15 bg-transparent p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary dark:border-white/20 dark:focus:ring-primary/50 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
