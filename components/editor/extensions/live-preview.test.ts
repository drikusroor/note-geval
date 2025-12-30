import { describe, expect, test } from "bun:test";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { livePreviewField } from "./live-preview";

describe("live-preview extension", () => {
  const extensions = [markdown(), livePreviewField];

  test("hides header mark when cursor is on another line", () => {
    const doc = "# Header\nLine 2";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 9 }, // On Line 2
    });

    const decorations = state.field(livePreviewField);
    let found = false;
    decorations.between(0, 2, (from, to) => {
      if (from === 0 && to === 2) found = true;
    });

    expect(found).toBe(true);
  });

  test("reveals header mark when cursor is on the same line", () => {
    const doc = "# Header\nLine 2";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 2 }, // On Line 1
    });

    const decorations = state.field(livePreviewField);
    let found = false;
    decorations.between(0, 1, (from, to) => {
      if (from === 0 && to === 1) found = true;
    });

    expect(found).toBe(false);
  });
});
