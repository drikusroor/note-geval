import { describe, expect, test } from "bun:test";
import { filterTree, sortTree, type TreeNode } from "./tree";

const mockTree: TreeNode[] = [
  {
    name: "z-folder",
    path: "z-folder",
    isDirectory: true,
    size: 0,
    lastModified: new Date("2025-01-01"),
    createdAt: new Date("2025-01-01"),
    children: [
      {
        name: "inner-file.md",
        path: "z-folder/inner-file.md",
        isDirectory: false,
        size: 500,
        lastModified: new Date("2025-01-05"),
        createdAt: new Date("2025-01-05"),
      },
    ],
  },
  {
    name: "a-file.md",
    path: "a-file.md",
    isDirectory: false,
    size: 1000,
    lastModified: new Date("2025-01-10"),
    createdAt: new Date("2025-01-10"),
  },
  {
    name: "b-folder",
    path: "b-folder",
    isDirectory: true,
    size: 0,
    lastModified: new Date("2025-01-02"),
    createdAt: new Date("2025-01-02"),
    children: [],
  },
];

describe("sortTree", () => {
  test("sorts by name asc, folders first", () => {
    const sorted = sortTree(mockTree, { attribute: "name", direction: "asc" });
    expect(sorted[0].name).toBe("b-folder");
    expect(sorted[1].name).toBe("z-folder");
    expect(sorted[2].name).toBe("a-file.md");
  });

  test("sorts by size desc, folders first", () => {
    const sorted = sortTree(mockTree, { attribute: "size", direction: "desc" });
    // Folders first (size 0)
    expect(sorted[0].isDirectory).toBe(true);
    expect(sorted[1].isDirectory).toBe(true);
    expect(sorted[2].name).toBe("a-file.md");
  });
});

describe("filterTree", () => {
  test("filters by name case-insensitive", () => {
    const filtered = filterTree(mockTree, "INNER");
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe("z-folder");
    expect(filtered[0].children?.[0].name).toBe("inner-file.md");
  });

  test("returns empty if no match", () => {
    const filtered = filterTree(mockTree, "nomatch");
    expect(filtered.length).toBe(0);
  });

  test("returns full tree if query empty", () => {
    const filtered = filterTree(mockTree, "");
    expect(filtered.length).toBe(3);
  });
});
