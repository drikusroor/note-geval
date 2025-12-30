import {
  history,
  historyKeymap,
  indentWithTab,
  standardKeymap,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import {
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
} from "@codemirror/view";
import { editorTheme } from "./theme";

/**
 * Basic set of extensions that provide a standard "text editor" feel.
 */
export const basicSetup: Extension[] = [
  editorTheme,
  EditorView.lineWrapping,
  highlightActiveLine(),
  highlightSpecialChars(),
  history(),
  drawSelection(),
  dropCursor(),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  rectangularSelection(),
  keymap.of([
    ...standardKeymap,
    ...historyKeymap,
    ...foldKeymap,
    indentWithTab,
  ]),
];

/**
 * Standard Markdown extensions.
 */
export const markdownExtensions: Extension[] = [markdown(), basicSetup];
