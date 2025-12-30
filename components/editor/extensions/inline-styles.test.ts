import { expect, test, describe } from "bun:test";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { inlineStylesField } from "./inline-styles";

describe("inline-styles extension", () => {
  const extensions = [markdown(), inlineStylesField];
  const isHiddenMark = (value: any) => {
    const spec = (value as any).spec || {};
    return spec.replace === true || spec.class === undefined;
  };

  test("hides marks when cursor is outside", () => {
    const state = EditorState.create({ doc: "  *italic*", extensions, selection: { head: 0 } });
    let hasReplace = false;
    state.field(inlineStylesField).between(2, 3, (_from, _to, value) => {
      if (isHiddenMark(value)) hasReplace = true;
    });
    expect(hasReplace).toBe(true);
  });

  test("reveals marks when cursor is inside", () => {
    const doc = "*italic*";
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 3, head: 3 }
    });

    const decorations = state.field(inlineStylesField);
    let hasReplace = false;
    decorations.between(0, 1, (_from, _to, value) => {
      if (isHiddenMark(value)) hasReplace = true;
    });
    expect(hasReplace).toBe(false);
  });

  test("reveals ALL marks in nested selection", () => {
    const doc = "_**Mankementensoep**_";
    // Indices:
    // _ : 0-1
    // **: 1-3
    // Mankementensoep: 3-18
    // **: 18-20
    // _ : 20-21
    
    const state = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 0, head: 21 } // Select all
    });

    const decorations = state.field(inlineStylesField);
    
    let firstMarkHidden = false;
    decorations.between(0, 1, (from, to, value) => {
      if (isHiddenMark(value)) firstMarkHidden = true;
    });
    
    let lastMarkHidden = false;
    decorations.between(20, 21, (from, to, value) => {
      if (isHiddenMark(value)) lastMarkHidden = true;
    });

    expect(firstMarkHidden).toBe(false);
    expect(lastMarkHidden).toBe(false);
  });

  // Write another test here to check whether all marks are shown when cursor is inside nested marks
  // Example: A italic bold word (_**word**_)
  // No selection should show no marks
  // When the word is selected / cursor is inside, all marks should be shown, ie. _**word**_

  test("reveals nested marks when cursor is inside nested styles", () => {
    const doc = "xx _**word**_ xx";

    const outsideState = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 0, head: 0 } // Cursor before the styled word
    });

    const insideState = EditorState.create({
      doc,
      extensions,
      selection: { anchor: 8, head: 8 } // Cursor inside the styled word
    });

    const countHiddenMarks = (state: EditorState) => {
      let hidden = 0;
      const decorations = state.field(inlineStylesField);
      decorations.between(0, state.doc.length, (_from, _to, value) => {
        if (isHiddenMark(value)) hidden += 1;
      });
      return hidden;
    };

    const hiddenOutside = countHiddenMarks(outsideState);
    const hiddenInside = countHiddenMarks(insideState);

    expect(hiddenOutside).toBeGreaterThan(0);
    expect(hiddenInside).toBe(0);
  });
  
});
