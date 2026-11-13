import { DARK_THEME, LIGHT_THEME, type Theme } from "./theme";
import { splitLocalePath } from "../i18n/utils";

export const GISCUS_ORIGIN = "https://giscus.app";

export const GISCUS_SCRIPT_SRC = `${GISCUS_ORIGIN}/client.js`;

export const GISCUS_FRAME_SELECTOR = "iframe.giscus-frame";

export const GISCUS_CONTAINER_SELECTOR = "[data-giscus]";

/**
 * Get the key of the comment thread for a page.
 * It has no locale prefix, so the Thai and English versions of a post
 * share one thread. For example, `/en/blog/my-post/` gives `blog/my-post`.
 */
export function getCommentTerm(pathname: string): string {
  return splitLocalePath(pathname).path.replace(/\/+$/, "");
}

/** Giscus has built-in `light` and `dark` themes. */
export function toGiscusTheme(isDark: boolean): Theme {
  return isDark ? DARK_THEME : LIGHT_THEME;
}

/** The message that tells the giscus iframe to change its theme. */
export function buildThemeMessage(theme: Theme) {
  return { giscus: { setConfig: { theme } } };
}

/** Giscus sends its own messages from its origin. */
export function isGiscusMessage(event: MessageEvent): boolean {
  return (
    event.origin === GISCUS_ORIGIN &&
    typeof event.data === "object" &&
    event.data !== null &&
    "giscus" in event.data
  );
}
