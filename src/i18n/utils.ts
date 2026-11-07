import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "./config";

/**
 * Build a site path for a locale.
 * The default locale has no prefix: `localePath("th", "blog")` is `/blog`.
 * Other locales have a prefix: `localePath("en", "blog")` is `/en/blog`.
 */
export function localePath(locale: Locale, path = ""): string {
  const cleanPath = path.replace(/^\/+/, "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return cleanPath ? `${prefix}/${cleanPath}` : prefix || "/";
}

/**
 * Split a pathname into its locale and the rest of the path.
 * A path without a locale prefix belongs to the default locale.
 */
export function splitLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const [first, ...rest] = pathname.replace(/^\/+/, "").split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: rest.join("/") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname.replace(/^\/+/, "") };
}

/** Same page, other locale. Use it when every locale has the page. */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, splitLocalePath(pathname).path);
}

/**
 * Blog content lives in `src/content/blog/`.
 * Default locale posts are in the root folder.
 * Other locales have a folder with the locale code, for example `en/`.
 */
export function getBlogLocale(id: string): Locale {
  const [first] = id.split("/");
  return isLocale(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE;
}

export function getBlogSlug(id: string): string {
  const { path } = splitLocalePath(id);
  return path;
}

export type TranslatedUrls = Partial<Record<Locale, string>>;

/**
 * Get the URL of the current page in each locale that has it.
 * Pass `translated` when only some locales have the page.
 * Without it, we assume every locale has the same page.
 */
export function getTranslatedUrls(
  pathname: string,
  translated?: TranslatedUrls
): TranslatedUrls {
  if (translated) return translated;
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, switchLocalePath(pathname, locale)])
  );
}
