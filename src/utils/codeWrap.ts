export const CODE_WRAP_STORAGE_KEY = "code-wrap";

/** The attribute on `<html>`. The CSS in `global.css` reads it. */
export const CODE_WRAP_ATTRIBUTE = "data-code-wrap";

export const CODE_WRAP_ON = "on";
export const CODE_WRAP_OFF = "off";

export const CODE_WRAP_BUTTON_SELECTOR = "[data-code-wrap-button]";

/** Read the saved value. Missing or unknown values mean "do not wrap". */
export function parseCodeWrap(stored: unknown): boolean {
  return stored === CODE_WRAP_ON;
}

/** The value to save in `localStorage`. */
export function serializeCodeWrap(isWrapped: boolean): string {
  return isWrapped ? CODE_WRAP_ON : CODE_WRAP_OFF;
}
