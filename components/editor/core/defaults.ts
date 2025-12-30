import type { Extension } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { 
  keymap, 
  highlightActiveLine, 
  drawSelection, 
  dropCursor, 
  rectangularSelection, 
  highlightSpecialChars,
  EditorView
} from "@codemirror/view";
import { 
  standardKeymap, 
  history, 
  historyKeymap, 
  indentWithTab 
} from "@codemirror/commands";
import { 
  bracketMatching, 
  foldKeymap, 
  indentOnInput, 
  syntaxHighlighting, 
  defaultHighlightStyle 
} from "@codemirror/language";
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
export const markdownExtensions: Extension[] = [
  markdown(),
  basicSetup,
];
