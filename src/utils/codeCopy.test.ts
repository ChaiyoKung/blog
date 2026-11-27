import { afterEach, describe, expect, test, vi } from "vitest";
import { copyText, getCodeLanguage, getCodeText } from "./codeCopy";

function fakePre(options: { code?: string; language?: string; text?: string }) {
  return {
    dataset: { language: options.language },
    textContent: options.text ?? "",
    querySelector: (selector: string) =>
      selector === "code" && options.code !== undefined
        ? { textContent: options.code }
        : null,
  } as unknown as HTMLElement;
}

describe("getCodeText", () => {
  test("returns the text of the code element", () => {
    expect(getCodeText(fakePre({ code: "echo hi\nls" }))).toBe("echo hi\nls");
  });

  test("falls back to the pre text when there is no code element", () => {
    expect(getCodeText(fakePre({ text: "plain" }))).toBe("plain");
  });
});

describe("getCodeLanguage", () => {
  test("returns the language name", () => {
    expect(getCodeLanguage(fakePre({ language: "bash" }))).toBe("bash");
  });

  test("returns an empty string for plain text", () => {
    expect(getCodeLanguage(fakePre({ language: "plaintext" }))).toBe("");
  });

  test("returns an empty string when there is no language", () => {
    expect(getCodeLanguage(fakePre({}))).toBe("");
  });
});

describe("copyText", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("writes the text to the clipboard and returns true", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    await expect(copyText("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
  });

  test("returns false when the clipboard rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    vi.stubGlobal("navigator", { clipboard: { writeText } });

    await expect(copyText("hello")).resolves.toBe(false);
  });

  test("returns false when the clipboard is not available", async () => {
    vi.stubGlobal("navigator", {});

    await expect(copyText("hello")).resolves.toBe(false);
  });
});
