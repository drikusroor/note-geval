import {
  type Range,
  RangeSetBuilder,
  StateEffect,
  StateField,
} from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";

/**
 * Search Extension
 * Highlights search results in the document.
 */

// Effect to update the search query
export const setSearchQuery = StateEffect.define<string>();

const searchHighlight = Decoration.mark({ class: "cm-search-highlight" });

/**
 * Search State that stores the query and its decorations
 */
export const searchState = StateField.define<{
  query: string;
  decorations: DecorationSet;
}>({
  create() {
    return { query: "", decorations: Decoration.none };
  },
  update(value, tr) {
    let query = value.query;
    for (const effect of tr.effects) {
      if (effect.is(setSearchQuery)) {
        query = effect.value;
      }
    }

    if (query !== value.query || tr.docChanged) {
      if (!query) return { query: "", decorations: Decoration.none };

      const decorations: Range<Decoration>[] = [];
      const docString = tr.state.doc.toString();
      let pos = 0;
      while (true) {
        pos = docString.toLowerCase().indexOf(query.toLowerCase(), pos);
        if (pos === -1) break;
        decorations.push(searchHighlight.range(pos, pos + query.length));
        pos += query.length;
      }

      const builder = new RangeSetBuilder<Decoration>();
      decorations.sort((a, b) => a.from - b.from);
      for (const deco of decorations) {
        builder.add(deco.from, deco.to, deco.value);
      }

      return { query, decorations: builder.finish() };
    }

    return {
      query,
      decorations: value.decorations.map(tr.changes),
    };
  },
  provide: (f) => EditorView.decorations.from(f, (v) => v.decorations),
});

export const searchExtensions = () => [searchState];
