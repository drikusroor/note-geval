import { syntaxTree } from "@codemirror/language";
import {
  type EditorState,
  type Range,
  RangeSetBuilder,
  StateField,
} from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";

/**
 * Live Preview Extension
 * Hides markdown syntax (like #, >, etc.) when the cursor is not on the line.
 */

// Decoration to hide text
const hideDecoration = Decoration.replace({});

// Heading decorations
const h1Decoration = Decoration.mark({ class: "cm-h1" });
const h2Decoration = Decoration.mark({ class: "cm-h2" });
const h3Decoration = Decoration.mark({ class: "cm-h3" });
const h4Decoration = Decoration.mark({ class: "cm-h4" });
const h5Decoration = Decoration.mark({ class: "cm-h5" });
const h6Decoration = Decoration.mark({ class: "cm-h6" });

const headingDecorations: Record<string, Decoration> = {
  ATXHeading1: h1Decoration,
  ATXHeading2: h2Decoration,
  ATXHeading3: h3Decoration,
  ATXHeading4: h4Decoration,
  ATXHeading5: h5Decoration,
  ATXHeading6: h6Decoration,
  SetextHeading1: h1Decoration,
  SetextHeading2: h2Decoration,
};

/**
 * State field to manage the decorations
 */
export const livePreviewField = StateField.define<DecorationSet>({
  create(state) {
    return buildDecorations(state);
  },
  update(decorations, tr) {
    if (tr.docChanged || tr.selection) {
      return buildDecorations(tr.state);
    }
    return decorations.map(tr.changes);
  },
  provide: (f) => EditorView.decorations.from(f),
});

function buildDecorations(state: EditorState): DecorationSet {
  const decorations: Range<Decoration>[] = [];
  const selection = state.selection.main;
  const cursorLine = state.doc.lineAt(selection.head).number;

  syntaxTree(state).iterate({
    enter: (node) => {
      // Apply heading styles
      if (headingDecorations[node.name]) {
        decorations.push(headingDecorations[node.name].range(node.from, node.to));
      }

      // Check for header marks (e.g., ###)
      if (node.name === "HeaderMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
          let end = node.to;
          // Hide trailing spaces after the header mark
          while (
            end < state.doc.length &&
            state.doc.sliceString(end, end + 1) === " "
          ) {
            end++;
          }
          decorations.push(hideDecoration.range(node.from, end));
        }
      }

      // Check for QuoteMark (e.g., >)
      if (node.name === "QuoteMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
          let end = node.to;
          // Hide trailing space after the quote mark
          if (state.doc.sliceString(end, end + 1) === " ") {
            end++;
          }
          decorations.push(hideDecoration.range(node.from, end));
        }
      }

      // Check for ListMark (e.g., -, *, 1.)
      if (node.name === "ListMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
          // For lists, we might NOT want to hide the space to keep indentation
          // but the user didn't ask for this, so I'll leave it as is or just hide the mark.
          decorations.push(hideDecoration.range(node.from, node.to));
        }
      }
    },
  });

  decorations.sort(
    (a, b) =>
      a.from - b.from ||
      // biome-ignore lint/suspicious/noExplicitAny: accessing startSide
      (a.value as any).startSide - (b.value as any).startSide,
  );

  const builder = new RangeSetBuilder<Decoration>();
  for (const deco of decorations) {
    builder.add(deco.from, deco.to, deco.value);
  }

  return builder.finish();
}

/**
 * The actual extension to export
 */
export const livePreview = () => [livePreviewField];
