import { describe, expect, test } from "vitest";
import { parseCodeWrap, serializeCodeWrap } from "./codeWrap";

describe("parseCodeWrap", () => {
  test("returns true for the saved value `on`", () => {
    expect(parseCodeWrap("on")).toBe(true);
  });

  test("returns false for the saved value `off`", () => {
    expect(parseCodeWrap("off")).toBe(false);
  });

  test("returns false when nothing is saved", () => {
    expect(parseCodeWrap(null)).toBe(false);
  });

  test("returns false for an unknown value", () => {
    expect(parseCodeWrap("yes")).toBe(false);
  });
});

describe("serializeCodeWrap", () => {
  test("saves `on` when wrap is on", () => {
    expect(serializeCodeWrap(true)).toBe("on");
  });

  test("saves `off` when wrap is off", () => {
    expect(serializeCodeWrap(false)).toBe("off");
  });

  test("gives a value that parseCodeWrap reads back", () => {
    expect(parseCodeWrap(serializeCodeWrap(true))).toBe(true);
    expect(parseCodeWrap(serializeCodeWrap(false))).toBe(false);
  });
});
