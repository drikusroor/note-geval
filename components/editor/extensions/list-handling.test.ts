import { expect, test, describe } from "bun:test";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { listHandlingField } from "./list-handling";

describe("list-handling extension", () => {
  const extensions = [markdown(), listHandlingField];

  test("hides list marker when cursor is away", () => {
    const doc = "- Item 1";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { head: 5 } // In the middle of "Item 1"
    });

    const decorations = state.field(listHandlingField);
    let widgetFound = false;
    decorations.between(0, 1, (from, to, value) => {
      if (from === 0 && to === 1 && (value as any).widget !== undefined) {
          widgetFound = true;
      }
    });
    
    expect(widgetFound).toBe(true);
  });

  test("reveals list marker when cursor is on it", () => {
    const doc = "- Item 1";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { head: 0 } // On the '-'
    });

    const decorations = state.field(listHandlingField);
    let widgetFound = false;
    decorations.between(0, 1, (from, to, value) => {
       if (from === 0 && to === 1 && (value as any).widget !== undefined) {
           widgetFound = true;
       }
    });
    
    expect(widgetFound).toBe(false);
  });
});
