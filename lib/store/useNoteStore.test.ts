import { beforeEach, describe, expect, test } from "bun:test";
import { act, renderHook } from "@testing-library/react";
import { noteStore, useNoteStore } from "./useNoteStore";

describe("useNoteStore", () => {
  beforeEach(() => {
    noteStore.setState(() => ({ dirtyNotes: {} }));
    sessionStorage.clear();
  });

  test("should update note draft and set dirty", () => {
    const { result } = renderHook(() => useNoteStore());

    act(() => {
      result.current.updateNoteDraft("test.md", {
        content: "hello",
        isDirty: true,
      });
    });

    const draft = result.current.getNoteDraft("test.md");
    expect(draft?.content).toBe("hello");
    expect(draft?.isDirty).toBe(true);
  });

  test("should set note clean", () => {
    const { result } = renderHook(() => useNoteStore());

    act(() => {
      result.current.setNoteClean("test.md", "saved content");
    });

    const draft = result.current.getNoteDraft("test.md");
    expect(draft?.isDirty).toBe(false);
    expect(draft?.lastSavedContent).toBe("saved content");
    expect(draft?.savingState).toBe("saved");
  });

  test("should revert note", () => {
    const { result } = renderHook(() => useNoteStore());

    act(() => {
      result.current.updateNoteDraft("test.md", {
        content: "dirty",
        lastSavedContent: "original",
        isDirty: true,
      });
    });

    act(() => {
      result.current.revertNote("test.md");
    });

    const draft = result.current.getNoteDraft("test.md");
    expect(draft?.content).toBe("original");
    expect(draft?.isDirty).toBe(false);
    expect(draft?.revertCount).toBe(1);
  });
});
