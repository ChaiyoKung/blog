export const LOCALES = ["th", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "th";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/**
 * Get the locale from an Astro `currentLocale` value.
 * Fall back to the default locale when the value is empty or unknown.
 */
export function toLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Get the `[...locale]` route param for a locale.
 * The default locale has no URL prefix, so its param is `undefined`.
 */
export function localeToRouteParam(locale: Locale): string | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}
