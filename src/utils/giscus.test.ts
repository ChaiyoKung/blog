import { describe, expect, test } from "vitest";
import {
  buildThemeMessage,
  getCommentTerm,
  isGiscusMessage,
  toGiscusTheme,
} from "./giscus";

describe("getCommentTerm", () => {
  test("removes the trailing slash", () => {
    expect(getCommentTerm("/blog/my-post/")).toBe("blog/my-post");
    expect(getCommentTerm("/blog/my-post")).toBe("blog/my-post");
  });

  test("gives the same term for Thai and English versions", () => {
    expect(getCommentTerm("/en/blog/my-post/")).toBe(
      getCommentTerm("/blog/my-post/")
    );
  });
});

describe("toGiscusTheme", () => {
  test("maps the dark flag to a giscus theme", () => {
    expect(toGiscusTheme(true)).toBe("dark");
    expect(toGiscusTheme(false)).toBe("light");
  });
});

describe("buildThemeMessage", () => {
  test("uses the giscus setConfig format", () => {
    expect(buildThemeMessage("dark")).toEqual({
      giscus: { setConfig: { theme: "dark" } },
    });
  });
});

describe("isGiscusMessage", () => {
  const make = (origin: string, data: unknown) =>
    ({ origin, data }) as MessageEvent;

  test("accepts a giscus message from the giscus origin", () => {
    expect(isGiscusMessage(make("https://giscus.app", { giscus: {} }))).toBe(
      true
    );
  });

  test("rejects other origins", () => {
    expect(isGiscusMessage(make("https://evil.example", { giscus: {} }))).toBe(
      false
    );
  });

  test("rejects other data", () => {
    expect(isGiscusMessage(make("https://giscus.app", null))).toBe(false);
    expect(isGiscusMessage(make("https://giscus.app", "text"))).toBe(false);
    expect(isGiscusMessage(make("https://giscus.app", { other: 1 }))).toBe(
      false
    );
  });
});
