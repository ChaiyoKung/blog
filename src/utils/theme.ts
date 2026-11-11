export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Pick the theme to show.
 * A saved user choice wins. Without one, follow the system setting.
 */
export function resolveTheme(
  storedTheme: unknown,
  systemPrefersDark: boolean
): Theme {
  if (isTheme(storedTheme)) return storedTheme;
  return systemPrefersDark ? "dark" : "light";
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}
