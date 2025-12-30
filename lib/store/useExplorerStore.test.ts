import { beforeEach, describe, expect, test } from "bun:test";
import { act, renderHook } from "@testing-library/react";
import { explorerStore, useExplorerStore } from "./useExplorerStore";

describe("useExplorerStore", () => {
  beforeEach(() => {
    explorerStore.setState(() => ({ expandedPaths: {} }));
    localStorage.clear();
  });

  test("should toggle expanded state", () => {
    const { result } = renderHook(() => useExplorerStore());

    expect(result.current.isExpanded("folder1")).toBe(false);

    act(() => {
      result.current.toggleExpanded("folder1");
    });

    expect(result.current.isExpanded("folder1")).toBe(true);

    act(() => {
      result.current.toggleExpanded("folder1");
    });

    expect(result.current.isExpanded("folder1")).toBe(false);
  });

  test("should set expanded state", () => {
    const { result } = renderHook(() => useExplorerStore());

    act(() => {
      result.current.setExpanded("folder1", true);
    });

    expect(result.current.isExpanded("folder1")).toBe(true);

    act(() => {
      result.current.setExpanded("folder1", false);
    });

    expect(result.current.isExpanded("folder1")).toBe(false);
  });

  test("should expand recursively", () => {
    const { result } = renderHook(() => useExplorerStore());

    act(() => {
      result.current.expandRecursively("a/b/c");
    });

    expect(result.current.isExpanded("a")).toBe(true);
    expect(result.current.isExpanded("a/b")).toBe(true);
    expect(result.current.isExpanded("a/b/c")).toBe(true);
  });
});
