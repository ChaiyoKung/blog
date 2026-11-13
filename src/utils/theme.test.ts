import { describe, expect, test } from "vitest";
import {
  getNextPreference,
  isTheme,
  resolveTheme,
  toPreference,
} from "./theme";

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

describe("toPreference", () => {
  test("keeps a saved theme", () => {
    expect(toPreference("light")).toBe("light");
    expect(toPreference("dark")).toBe("dark");
  });

  test("returns system when nothing valid is saved", () => {
    expect(toPreference(null)).toBe("system");
    expect(toPreference("blue")).toBe("system");
  });
});

describe("getNextPreference", () => {
  test("cycles light, dark, system", () => {
    expect(getNextPreference("light")).toBe("dark");
    expect(getNextPreference("dark")).toBe("system");
    expect(getNextPreference("system")).toBe("light");
  });
});
