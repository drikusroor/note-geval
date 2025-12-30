import { EditorView } from "@codemirror/view";

/**
 * Custom theme for the editor to match our project's UI.
 */
export const editorTheme = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "14px",
  },
  ".cm-content": {
    fontFamily: "monospace",
    padding: "1rem",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--muted-foreground)",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "var(--primary)",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
    backgroundColor: "var(--accent) !important",
  },
  ".cm-search-highlight": {
    backgroundColor: "rgba(255, 255, 0, 0.3)",
  },
  ".cm-search-highlight-active": {
    backgroundColor: "rgba(255, 165, 0, 0.5)",
  },
  // Mobile optimizations
  "@media (max-width: 768px)": {
    "&": {
      fontSize: "16px", // Better for touch targets and preventing iOS auto-zoom
    }
  }
}, { dark: false }); // We'll handle dark mode via CSS variables/parent classes
