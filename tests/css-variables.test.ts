import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("CSS Variables", () => {
  test("globals.css contains light and dark mode variables", () => {
    const cssPath = join(process.cwd(), "app/globals.css");
    const content = readFileSync(cssPath, "utf-8");

    // Check for :root (light mode)
    expect(content).toContain(":root");
    expect(content).toContain("--background");
    expect(content).toContain("--primary");

    // Check for .dark (dark mode)
    expect(content).toContain(".dark");
    expect(content).toContain("--background");
    expect(content).toContain("--primary");
  });
});
