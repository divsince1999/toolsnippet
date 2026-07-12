import { getFromLocalStorage, setToLocalStorage, LocalStorageKeys } from "./localStorage";

const MAX_RECENT_TOOLS = 8;

export type RecentToolSlug = string;

/**
 * Add a tool to the recent tools list
 * - Moves the tool to the top if it already exists
 * - Limits the list to 8 tools
 * - Only stores the slug, not the full tool object
 * @param slug - The tool slug to add
 */
export function addRecentTool(slug: RecentToolSlug): void {
  const recentTools = getRecentTools();

  // Remove the tool if it already exists (to move it to top)
  const filteredTools = recentTools.filter((toolSlug) => toolSlug !== slug);

  // Add the tool to the beginning
  const updatedTools = [slug, ...filteredTools];

  // Limit to 8 tools
  const limitedTools = updatedTools.slice(0, MAX_RECENT_TOOLS);

  setToLocalStorage(LocalStorageKeys.RECENT_TOOLS, limitedTools);
}

/**
 * Get the list of recent tool slugs
 * @returns Array of recent tool slugs (most recent first)
 */
export function getRecentTools(): RecentToolSlug[] {
  const recentTools = getFromLocalStorage<RecentToolSlug[]>(
    LocalStorageKeys.RECENT_TOOLS
  );
  return recentTools || [];
}

/**
 * Clear all recent tools
 */
export function clearRecentTools(): void {
  setToLocalStorage(LocalStorageKeys.RECENT_TOOLS, []);
}

/**
 * Remove a specific tool from recent tools
 * @param slug - The tool slug to remove
 */
export function removeRecentTool(slug: RecentToolSlug): void {
  const recentTools = getRecentTools();
  const filteredTools = recentTools.filter((toolSlug) => toolSlug !== slug);
  setToLocalStorage(LocalStorageKeys.RECENT_TOOLS, filteredTools);
}
