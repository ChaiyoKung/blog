import type { Locale } from "./config";

const en = {
  "site.description": "Welcome to my blog!",
  "nav.home": "Home",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.rss": "RSS feed",
  "nav.language": "Language",
  "theme.switchToLight": "Switch to light mode",
  "theme.switchToDark": "Switch to dark mode",
  "home.latestBlogs": "Latest Blogs",
  "home.viewAll": "View All",
  "home.viewAllBlogs": "View All Blogs",
  "post.updatedOn": "Updated on",
  "post.altSuffix": "Blog Post",
  "tag.pageTitle": "Posts Tagged with: {tag}",
  "tag.pageDescription": "Blog posts tagged with {tag}",
  "tag.label": "Tag:",
  "about.title": "About Me",
  "about.description": "Learn more about me",
  "about.body":
    "Hi, I'm a Software Engineer at heart, exploring the world of web development as a passionate hobbyist. By day, I work as a Staff CloudOps Engineer, building and maintaining robust infrastructure. This blog is where I share my learning journey and the projects I create.",
} as const;

export type UiKey = keyof typeof en;

const th: Record<UiKey, string> = {
  "site.description": "ยินดีต้อนรับสู่บล็อกของผม",
  "nav.home": "หน้าแรก",
  "nav.blog": "บล็อก",
  "nav.about": "เกี่ยวกับผม",
  "nav.rss": "RSS feed",
  "nav.language": "ภาษา",
  "theme.switchToLight": "สลับเป็นโหมดสว่าง",
  "theme.switchToDark": "สลับเป็นโหมดมืด",
  "home.latestBlogs": "บล็อกล่าสุด",
  "home.viewAll": "ดูทั้งหมด",
  "home.viewAllBlogs": "ดูบล็อกทั้งหมด",
  "post.updatedOn": "อัปเดตเมื่อ",
  "post.altSuffix": "บล็อก",
  "tag.pageTitle": "โพสต์ที่ติดแท็ก: {tag}",
  "tag.pageDescription": "โพสต์ที่ติดแท็ก {tag}",
  "tag.label": "แท็ก:",
  "about.title": "เกี่ยวกับผม",
  "about.description": "รู้จักผมให้มากขึ้น",
  "about.body":
    "สวัสดีครับ ผมเป็น Software Engineer ที่หลงใหลในการสร้างเว็บ และกำลังเรียนรู้โลกของ web development ในฐานะงานอดิเรก ช่วงกลางวันผมทำงานเป็น Staff CloudOps Engineer ดูแลและสร้างโครงสร้างพื้นฐานให้มั่นคง บล็อกนี้เป็นที่ที่ผมแบ่งปันเส้นทางการเรียนรู้และโปรเจกต์ที่ผมสร้าง",
};

export const ui: Record<Locale, Record<UiKey, string>> = { en, th };

export const LOCALE_LABELS: Record<Locale, string> = {
  th: "ไทย",
  en: "English",
};

/** Value of `<html lang>`. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  th: "th",
  en: "en",
};

/**
 * Locale for date formatting.
 * Thai uses the Gregorian calendar, so the year matches `createdAt`.
 */
export const LOCALE_DATE_FORMAT: Record<Locale, string> = {
  th: "th-TH-u-ca-gregory",
  en: "en-US",
};

export function useTranslations(locale: Locale) {
  return function t(key: UiKey, params: Record<string, string> = {}): string {
    return Object.entries(params).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, value),
      ui[locale][key]
    );
  };
}
