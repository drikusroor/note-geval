import { describe, expect, test } from "bun:test";
import { resolveInternalLink } from "./links";

describe("resolveInternalLink", () => {
  test("resolves absolute path from root", () => {
    expect(resolveInternalLink("/folder/note", "any/where.md")).toBe(
      "folder/note.md",
    );
  });

  test("resolves relative path from current directory", () => {
    expect(resolveInternalLink("./sibling", "folder/note.md")).toBe(
      "folder/sibling.md",
    );
  });

  test("resolves parent directory relative path", () => {
    expect(resolveInternalLink("../other/note", "folder/sub/note.md")).toBe(
      "folder/other/note.md",
    );
  });

  test("resolves simple filename as relative to root", () => {
    expect(resolveInternalLink("root-note", "folder/note.md")).toBe(
      "root-note.md",
    );
  });

  test("handles existing .md extension", () => {
    expect(resolveInternalLink("note.md", "folder/file.md")).toBe("note.md");
  });
});
