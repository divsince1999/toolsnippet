"use client";

import { useEffect, useState } from "react";
import { tools } from "@/lib/tools";
import { addRecentTool, getRecentTools, clearRecentTools } from "@/lib/storage/recentTools";
import type { ToolInfo } from "@/lib/tools";

/**
 * Custom hook for managing recently used tools
 * Provides reactive state and actions for recent tools
 * @returns Object containing recent tools and actions
 */
export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<ToolInfo[]>([]);

  // Load recent tools on mount and when localStorage changes
  useEffect(() => {
    const loadRecentTools = () => {
      const recentSlugs = getRecentTools();
      const recentToolObjects = recentSlugs
        .map((slug) => tools.find((tool) => tool.slug === slug))
        .filter((tool): tool is ToolInfo => tool !== undefined);
      setRecentTools(recentToolObjects);
    };

    loadRecentTools();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "recent-tools") {
        loadRecentTools();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * Add a tool to recent tools
   * @param tool - The tool to add
   */
  const handleAddRecentTool = (tool: ToolInfo) => {
    addRecentTool(tool.slug);
    // Update local state immediately for better UX
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.slug !== tool.slug);
      return [tool, ...filtered].slice(0, 8);
    });
  };

  /**
   * Clear all recent tools
   */
  const handleClearRecentTools = () => {
    clearRecentTools();
    setRecentTools([]);
  };

  return {
    recentTools,
    addRecentTool: handleAddRecentTool,
    clearRecentTools: handleClearRecentTools,
  };
}
