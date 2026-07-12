/**
 * Shared localStorage helper functions
 * Provides a consistent interface for localStorage operations
 * with error handling and type safety
 */

export const LocalStorageKeys = {
  RECENT_TOOLS: "recent-tools",
  FAVORITES: "favorites",
} as const;

export type LocalStorageKey = (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];

/**
 * Get a value from localStorage
 * @param key - The storage key
 * @returns The parsed value or null if not found
 */
export function getFromLocalStorage<T>(key: LocalStorageKey): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Set a value in localStorage
 * @param key - The storage key
 * @param value - The value to store
 */
export function setToLocalStorage<T>(key: LocalStorageKey, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Remove a value from localStorage
 * @param key - The storage key
 */
export function removeFromLocalStorage(key: LocalStorageKey): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

/**
 * Clear all values from localStorage
 */
export function clearLocalStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
