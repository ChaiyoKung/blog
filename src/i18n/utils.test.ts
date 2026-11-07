import { describe, expect, test } from "vitest";
import {
  getBlogLocale,
  getBlogSlug,
  getTranslatedUrls,
  localePath,
  splitLocalePath,
  switchLocalePath,
} from "./utils";

describe("localePath", () => {
  test("has no prefix for the default locale", () => {
    expect(localePath("th", "blog")).toBe("/blog");
    expect(localePath("th")).toBe("/");
  });

  test("adds a prefix for other locales", () => {
    expect(localePath("en", "blog")).toBe("/en/blog");
    expect(localePath("en")).toBe("/en");
  });

  test("keeps a trailing slash", () => {
    expect(localePath("en", "blog/my-post/")).toBe("/en/blog/my-post/");
    expect(localePath("th", "blog/my-post/")).toBe("/blog/my-post/");
  });
});

describe("splitLocalePath", () => {
  test("detects the default locale without prefix", () => {
    expect(splitLocalePath("/blog/a/")).toEqual({
      locale: "th",
      path: "blog/a/",
    });
  });

  test("detects a prefixed locale", () => {
    expect(splitLocalePath("/en/blog/a/")).toEqual({
      locale: "en",
      path: "blog/a/",
    });
    expect(splitLocalePath("/en")).toEqual({ locale: "en", path: "" });
  });
});

describe("switchLocalePath", () => {
  test("switches from the default locale", () => {
    expect(switchLocalePath("/about", "en")).toBe("/en/about");
    expect(switchLocalePath("/", "en")).toBe("/en");
  });

  test("switches back to the default locale", () => {
    expect(switchLocalePath("/en/about", "th")).toBe("/about");
    expect(switchLocalePath("/en", "th")).toBe("/");
  });
});

describe("blog ids", () => {
  test("reads locale and slug from the content id", () => {
    expect(getBlogLocale("my-post")).toBe("th");
    expect(getBlogLocale("en/my-post")).toBe("en");
    expect(getBlogSlug("my-post")).toBe("my-post");
    expect(getBlogSlug("en/my-post")).toBe("my-post");
  });
});

describe("getTranslatedUrls", () => {
  test("uses the translated URLs when they are given", () => {
    expect(
      getTranslatedUrls("/blog/a/", { th: "/blog/a/", en: "/en/blog/a/" })
    ).toEqual({ th: "/blog/a/", en: "/en/blog/a/" });
    expect(getTranslatedUrls("/blog/a/", { th: "/blog/a/" })).toEqual({
      th: "/blog/a/",
    });
  });

  test("assumes every locale has the page when none are given", () => {
    expect(getTranslatedUrls("/en/about")).toEqual({
      th: "/about",
      en: "/en/about",
    });
  });
});
