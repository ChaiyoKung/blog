import { tagToSlug } from "./tagToSlug";
import { expect, test, describe } from "vitest";

describe("tagToSlug", () => {
  test("lowercases the tag", () => {
    expect(tagToSlug("JavaScript")).toBe("javascript");
  });

  test("replaces spaces with hyphens", () => {
    expect(tagToSlug("Web Design Basics")).toBe("web-design-basics");
  });

  test("removes special characters", () => {
    expect(tagToSlug("C#/.NET")).toBe("c-net");
    expect(tagToSlug("Hello!@# World$%^")).toBe("hello-world");
  });

  test("trims leading/trailing hyphens", () => {
    expect(tagToSlug("  Hello World  ")).toBe("hello-world");
    expect(tagToSlug("---Hello---World---")).toBe("hello-world");
  });

  test("collapses multiple hyphens", () => {
    expect(tagToSlug("A   B   C")).toBe("a-b-c");
    expect(tagToSlug("A---B---C")).toBe("a-b-c");
  });

  test("handles empty and edge cases", () => {
    expect(tagToSlug("")).toBe("");
    expect(tagToSlug("!!!")).toBe("");
    expect(tagToSlug(" - ")).toBe("");
  });
});
