import { getCollection } from "astro:content";
import type { Locale } from "../i18n/config";
import { getBlogLocale } from "../i18n/utils";

export async function getBlogsByLocale(locale: Locale) {
  return getCollection("blog", ({ id }) => getBlogLocale(id) === locale);
}
