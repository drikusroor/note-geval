import { describe, expect, test } from "bun:test";
import { getCumulativePaths, splitPath } from "./path";

describe("path utils", () => {
  test("splitPath should split path into segments", () => {
    expect(splitPath("notes/work/todo.md")).toEqual([
      "notes",
      "work",
      "todo.md",
    ]);
    expect(splitPath("root.md")).toEqual(["root.md"]);
    expect(splitPath("")).toEqual([]);
    expect(splitPath("/a/b/")).toEqual(["a", "b"]);
  });

  test("getCumulativePaths should return paths for breadcrumbs", () => {
    expect(getCumulativePaths(["notes", "work", "todo.md"])).toEqual([
      "notes",
      "notes/work",
      "notes/work/todo.md",
    ]);
    expect(getCumulativePaths(["root.md"])).toEqual(["root.md"]);
    expect(getCumulativePaths([])).toEqual([]);
  });
});
