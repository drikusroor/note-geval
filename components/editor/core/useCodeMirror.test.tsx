import { describe, expect, test } from "bun:test";
import { renderHook } from "@testing-library/react";
import { useCodeMirror } from "./useCodeMirror";

describe("useCodeMirror hook stability", () => {
  test("should NOT re-initialize view when initialDoc changes", () => {
    const div = document.createElement("div");
    const parentRef = { current: div };
    
    const { result, rerender } = renderHook(
      ({ initialDoc }) => useCodeMirror({
        initialDoc,
        extensions: [],
        parentRef,
      }),
      { initialProps: { initialDoc: "initial" } }
    );

    const firstView = result.current.view;
    expect(firstView).not.toBeNull();

    // Simulate a document change that would normally trigger a rerender
    rerender({ initialDoc: "changed content" });
    
    const secondView = result.current.view;
    expect(secondView).toBe(firstView); // Should be the exact same instance
  });

  test("should NOT re-initialize view when extensions change", () => {
    const div = document.createElement("div");
    const parentRef = { current: div };
    
    const { result, rerender } = renderHook(
      ({ extensions }) => useCodeMirror({
        initialDoc: "some doc",
        extensions,
        parentRef,
      }),
      { initialProps: { extensions: [] as any[] } }
    );

    const firstView = result.current.view;
    expect(firstView).not.toBeNull();
    
    // Change extensions
    rerender({ extensions: [() => []] });
    
    const secondView = result.current.view;
    expect(secondView).toBe(firstView);
  });
});