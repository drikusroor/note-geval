import { describe, expect, test } from "bun:test";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { livePreviewField } from "./live-preview";

describe("live-preview headings", () => {
  const extensions = [markdown(), livePreviewField];

  test("hides header mark AND trailing space when cursor is on another line", () => {
    const doc = "# Header\nLine 2";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 9 }, // On Line 2
    });

    const decorations = state.field(livePreviewField);
    let spaceHidden = false;
    decorations.between(0, 2, (from, to) => {
      // # is at 0-1, space is at 1-2. So it should hide 0-2.
      if (from === 0 && to === 2) spaceHidden = true;
    });

    expect(spaceHidden).toBe(true);
  });

  test("hides multiple trailing spaces after header mark", () => {
    const doc = "##   Header\nLine 2";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 12 }, // On Line 2
    });

    const decorations = state.field(livePreviewField);
    let allHidden = false;
    decorations.between(0, 5, (from, to) => {
      // ## is 0-2, 3 spaces are 2-5. So it should hide 0-5.
      if (from === 0 && to === 5) allHidden = true;
    });

    expect(allHidden).toBe(true);
  });

  test("applies heading decoration to the entire heading line", () => {
    const doc = "# Header\nLine 2";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 9 },
    });

    const decorations = state.field(livePreviewField);
    let headingDecorated = false;
    decorations.between(0, 8, (from, to, value) => {
      // Value is the decoration. We check if it has the cm-h1 class.
      // @ts-ignore - spec is internal to Decoration
      if (from === 0 && to === 8 && value.spec.class === "cm-h1") {
        headingDecorated = true;
      }
    });

    expect(headingDecorated).toBe(true);
  });
});
