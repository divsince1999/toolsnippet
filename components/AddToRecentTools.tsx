"use client";

import { useEffect } from "react";
import { useRecentTools } from "@/hooks/useRecentTools";
import type { ToolInfo } from "@/lib/tools";

type AddToRecentToolsProps = {
  tool: ToolInfo;
};

/**
 * Client component that adds a tool to recent tools when mounted
 * This is separated to keep ToolPageShell as a server component
 */
export default function AddToRecentTools({ tool }: AddToRecentToolsProps) {
  const { addRecentTool } = useRecentTools();

  useEffect(() => {
    addRecentTool(tool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This component doesn't render anything
  return null;
}
