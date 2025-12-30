import { describe, expect, mock, test } from "bun:test";
import { render } from "@testing-library/react";
import { EditorHeader } from "./EditorHeader";

// Mock the stores
mock.module("@/lib/store/useNoteStore", () => ({
  useNoteStore: () => ({
    getNoteDraft: () => ({ isDirty: false }),
    revertNote: mock(() => {}),
  }),
}));

mock.module("@/lib/store/useSettings", () => ({
  useSettings: () => ({
    isAutoSaveEnabled: true,
    updateSettings: mock(() => {}),
  }),
}));

mock.module("@/lib/store/useExplorerStore", () => ({
  useExplorerStore: () => ({
    isExpanded: () => false,
    setExpanded: mock(() => {}),
    expandRecursively: mock(() => {}),
  }),
}));

describe("EditorHeader", () => {
  test("renders breadcrumb path", () => {
    const { getByText } = render(
      <EditorHeader
        path="notes/work/todo.md"
        onSave={() => {}}
        isSaving={false}
      />,
    );

    expect(getByText("notes")).toBeTruthy();
    expect(getByText("work")).toBeTruthy();
    expect(getByText("todo.md")).toBeTruthy();
  });

  test("renders Unsaved badge when dirty", () => {
    // Override mock for this test
    mock.module("@/lib/store/useNoteStore", () => ({
      useNoteStore: () => ({
        getNoteDraft: () => ({ isDirty: true }),
        revertNote: mock(() => {}),
      }),
    }));

    const { getByText } = render(
      <EditorHeader
        path="notes/work/todo.md"
        onSave={() => {}}
        isSaving={false}
      />,
    );

    expect(getByText("Unsaved")).toBeTruthy();
  });

  test("updates breadcrumb when path changes", () => {
    const { getByText, rerender } = render(
      <EditorHeader path="old/path.md" onSave={() => {}} isSaving={false} />,
    );

    expect(getByText("old")).toBeTruthy();
    expect(getByText("path.md")).toBeTruthy();

    rerender(
      <EditorHeader
        path="new/location/file.md"
        onSave={() => {}}
        isSaving={false}
      />,
    );

    expect(getByText("new")).toBeTruthy();
    expect(getByText("location")).toBeTruthy();
    expect(getByText("file.md")).toBeTruthy();
  });
});
