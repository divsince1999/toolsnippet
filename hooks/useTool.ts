import { useState, useCallback, useMemo } from "react";

export function useTool<T = any>() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<T | any>(null);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = input.trim();
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      characters: input.length,
      lines: input ? input.split("\n").length : 0,
    };
  }, [input]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput(null);
    setError("");
  }, []);

  return {
    input,
    setInput,
    output,
    setOutput,
    error,
    setError,
    isCopied,
    stats,
    copyToClipboard,
    clearAll,
  };
}
