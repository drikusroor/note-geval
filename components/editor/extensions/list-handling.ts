import { syntaxTree } from "@codemirror/language";
import {
  type EditorState,
  type Range,
  RangeSetBuilder,
  StateField,
} from "@codemirror/state";
import {
  Decoration,
  type DecorationSet,
  EditorView,
  WidgetType,
} from "@codemirror/view";

/**
 * List Management Extension
 * Swaps list markers with bullets/numbers and reveals them on focus.
 */

class BulletWidget extends WidgetType {
  toDOM() {
    const span = document.createElement("span");
    span.textContent = "• ";
    span.className = "cm-bullet";
    return span;
  }
}

const bulletWidget = Decoration.replace({
  widget: new BulletWidget(),
});

export const listHandlingField = StateField.define<DecorationSet>({
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

  syntaxTree(state).iterate({
    enter: (node) => {
      if (node.name === "ListMark") {
        // Range check: reveal if cursor is at node.from, node.to, or start of line
        // User story says: only when your cursor is at the bullet point, you should see the `-`
        const isCursorAtMarker =
          selection.head >= node.from && selection.head <= node.to;

        if (!isCursorAtMarker) {
          // Check if it's an unordered list marker
          const text = state.doc.sliceString(node.from, node.to);
          if (text === "-" || text === "*" || text === "+") {
            decorations.push(bulletWidget.range(node.from, node.to));
          }
          // For numbers (e.g. 1.) we could do something similar,
          // but usually just keeping them as is but formatted is fine.
          // The user specifically mentioned the `-` sign.
        }
      }
    },
  });

  decorations.sort((a, b) => a.from - b.from);

  const builder = new RangeSetBuilder<Decoration>();
  for (const deco of decorations) {
    builder.add(deco.from, deco.to, deco.value);
  }

  return builder.finish();
}

export const listHandling = () => [listHandlingField];
