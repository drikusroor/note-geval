import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder, StateField, type EditorState, type Range } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";

/**
 * Inline Styles Extension
 * Renders bold/italic and hides markers unless cursor is on them.
 */

const hideDecoration = Decoration.replace({});
const italicDecoration = Decoration.mark({ class: "cm-italic" });
const boldDecoration = Decoration.mark({ class: "cm-bold" });

export const inlineStylesField = StateField.define<DecorationSet>({
  create(state) {
    return buildDecorations(state);
  },
  update(decorations, tr) {
    if (tr.docChanged || tr.selection) {
      return buildDecorations(tr.state);
    }
    return decorations.map(tr.changes);
  },
  provide: f => EditorView.decorations.from(f)
});

function buildDecorations(state: EditorState): DecorationSet {
  const decorations: Range<Decoration>[] = [];
  const selection = state.selection.main;
  
  // Use a stack to track nested style ranges
  const activeRanges: { from: number; to: number }[] = [];

  syntaxTree(state).iterate({
    enter: (node) => {
      // Italic (Emphasis)
      if (node.name === "Emphasis") {
        decorations.push(italicDecoration.range(node.from, node.to));
        activeRanges.push({ from: node.from, to: node.to });
      }
      
      // Bold (StrongEmphasis)
      if (node.name === "StrongEmphasis") {
        decorations.push(boldDecoration.range(node.from, node.to));
        activeRanges.push({ from: node.from, to: node.to });
      }

      // Hide marks if selection does not overlap the parent style node
      if (node.name === "EmphasisMark" || node.name === "StrongEmphasisMark") {
        // Prefer the explicit parent range from the syntax tree, fall back to the active stack
        const parentNode = (node as any).node?.parent;
        const parentRange = parentNode
          ? { from: parentNode.from, to: parentNode.to }
          : activeRanges[activeRanges.length - 1] || { from: node.from, to: node.to };
        
        // Reveal if selection overlaps the style range (including boundaries)
        const hasOverlap = selection.from <= parentRange.to && selection.to >= parentRange.from;
        
        if (!hasOverlap) {
          decorations.push(hideDecoration.range(node.from, node.to));
        }
      }
    },
    leave: (node) => {
      if (node.name === "Emphasis" || node.name === "StrongEmphasis") {
        activeRanges.pop();
      }
    }
  });

  // Sort by 'from' position, then by 'startSide'
  decorations.sort((a, b) => a.from - b.from || (a.value as any).startSide - (b.value as any).startSide);

  const builder = new RangeSetBuilder<Decoration>();
  for (const deco of decorations) {
    builder.add(deco.from, deco.to, deco.value);
  }

  return builder.finish();
}

export const inlineStyles = () => [inlineStylesField];
