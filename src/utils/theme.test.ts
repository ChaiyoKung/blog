import { describe, expect, test } from "vitest";
import { getOppositeTheme, isTheme, resolveTheme } from "./theme";

describe("isTheme", () => {
  test("accepts light and dark", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
  });

  test("rejects other values", () => {
    expect(isTheme("system")).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
  });
});

describe("resolveTheme", () => {
  test("uses the saved theme over the system setting", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  test("follows the system setting when nothing is saved", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  test("ignores an invalid saved value", () => {
    expect(resolveTheme("blue", true)).toBe("dark");
  });
});

describe("getOppositeTheme", () => {
  test("switches between light and dark", () => {
    expect(getOppositeTheme("light")).toBe("dark");
    expect(getOppositeTheme("dark")).toBe("light");
  });
});
