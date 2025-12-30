import { describe, expect, test } from "bun:test";
import { EditorState } from "@codemirror/state";
import { composeExtensions, loadExtensions } from "./extension-loader";

describe("extension-loader", () => {
  test("loadExtensions extracts raw extensions from EditorExtension objects", () => {
    const dummyExtension = EditorState.readOnly.of(true);
    const editorExtensions = [{ extension: dummyExtension, id: "test-ext" }];

    const result = loadExtensions(editorExtensions);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(dummyExtension);
  });

  test("composeExtensions handles both raw extensions and EditorExtension objects", () => {
    const rawExt = EditorState.readOnly.of(true);
    const wrappedExt = {
      extension: EditorState.allowMultipleSelections.of(true),
    };

    const result = composeExtensions(rawExt, wrappedExt);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe(rawExt);
    expect(result[1]).toBe(wrappedExt.extension);
  });
});
