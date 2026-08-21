"use client";

import { useEffect, useState } from "react";
import rawManifest from "@/lib/tools/manifest.json";
import type { ToolManifestEntry } from "@/lib/tools/types";
import { tools as legacyTools } from "@/lib/tools";
import { addRecentTool, getRecentTools, clearRecentTools } from "@/lib/storage/recentTools";

const manifestData: ToolManifestEntry[] =
  (rawManifest as ToolManifestEntry[]).length > 0
    ? (rawManifest as ToolManifestEntry[])
    : legacyTools.map(({ slug, name, category, shortDescription, tags, icon }) => ({
        slug,
        name,
        category,
        shortDescription,
        tags,
        icon,
      }));

/**
 * Custom hook for managing recently used tools
 * Provides reactive state and actions for recent tools using lightweight manifest entries
 * @returns Object containing recent tools and actions
 */
export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<ToolManifestEntry[]>([]);

  // Load recent tools on mount and when localStorage changes
  useEffect(() => {
    const loadRecentTools = () => {
      const recentSlugs = getRecentTools();
      const recentToolObjects = recentSlugs
        .map((slug) => manifestData.find((tool) => tool.slug === slug))
        .filter((tool): tool is ToolManifestEntry => tool !== undefined);
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
  const handleAddRecentTool = (tool: { slug: string } & Partial<ToolManifestEntry>) => {
    addRecentTool(tool.slug);
    const manifestItem = manifestData.find((t) => t.slug === tool.slug) || {
      slug: tool.slug,
      name: tool.name || tool.slug,
      category: tool.category || "General",
      shortDescription: tool.shortDescription || "",
    };
    // Update local state immediately for better UX
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.slug !== tool.slug);
      return [manifestItem, ...filtered].slice(0, 8);
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
