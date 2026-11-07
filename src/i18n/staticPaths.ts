import { LOCALES, localeToRouteParam } from "./config";

/**
 * `getStaticPaths` for pages under `src/pages/[...locale]/` that only need the locale.
 */
export function getLocaleStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { locale: localeToRouteParam(locale) },
  }));
}
