export const CODE_BLOCK_SELECTOR = ".prose pre";

/** How long the "copied" or "failed" state stays before the button resets. */
export const COPY_FEEDBACK_MS = 2000;

/** Shiki uses this name when a code block has no language. */
const PLAIN_LANGUAGE = "plaintext";

export const COPY_STATES = ["idle", "copied", "failed"] as const;

export type CopyState = (typeof COPY_STATES)[number];

/** The text a reader expects to paste: the code, without the page markup. */
export function getCodeText(pre: HTMLElement): string {
  return pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
}

/** The language label for a code block. Empty when there is no real language. */
export function getCodeLanguage(pre: HTMLElement): string {
  const language = pre.dataset.language ?? "";
  return language === PLAIN_LANGUAGE ? "" : language;
}

/** Copy text to the clipboard. Returns `false` instead of throwing. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // The clipboard can be blocked (no permission, or an insecure page).
    return false;
  }
}
