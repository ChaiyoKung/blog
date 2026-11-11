export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

export const THEME_STORAGE_KEY = "theme";

/** The class on `<html>` that turns on the Tailwind `dark` variant. */
export const DARK_CLASS = "dark";

export const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const THEME_TOGGLE_SELECTOR = "[data-theme-toggle]";

export function isTheme(value: unknown): value is Theme {
  return value === LIGHT_THEME || value === DARK_THEME;
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
  return systemPrefersDark ? DARK_THEME : LIGHT_THEME;
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
}
