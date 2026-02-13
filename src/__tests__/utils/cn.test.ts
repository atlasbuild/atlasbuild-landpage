import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names", () => {
    const result = cn("px-2", "py-1");
    expect(result).toBe("px-2 py-1");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "visible");
    expect(result).toBe("base visible");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    const result = cn("px-2", "px-4");
    expect(result).toBe("px-4");
  });

  it("handles undefined and null values", () => {
    const result = cn("base", undefined, null, "extra");
    expect(result).toBe("base extra");
  });
});
