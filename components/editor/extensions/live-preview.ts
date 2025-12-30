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
      // Check for header marks (e.g., ###)
      if (node.name === "HeaderMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
          decorations.push(hideDecoration.range(node.from, node.to));
        }
      }

      // Check for QuoteMark (e.g., >)
      if (node.name === "QuoteMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
          decorations.push(hideDecoration.range(node.from, node.to));
        }
      }

      // Check for ListMark (e.g., -, *, 1.)
      if (node.name === "ListMark") {
        const line = state.doc.lineAt(node.from).number;
        if (line !== cursorLine) {
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
