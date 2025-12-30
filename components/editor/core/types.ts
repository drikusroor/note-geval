import type { Extension } from "@codemirror/state";

/**
 * A standard interface for any extension module in our editor.
 * It's essentially a wrapper around CodeMirror's Extension type but allows
 * us to add metadata or lifecycle hooks in the future if needed.
 */
export interface EditorExtension {
  /**
   * The underlying CodeMirror extension(s).
   */
  extension: Extension;

  /**
   * Optional unique identifier for the extension.
   */
  id?: string;
}

/**
 * Configuration passed to the editor that extensions might need access to.
 */
export interface EditorConfig {
  /**
   * Whether the editor is in read-only mode.
   */
  readOnly?: boolean;

  /**
   * Initial content of the editor.
   */
  initialContent?: string;
  
  /**
   * Callback when content changes
   */
  onChange?: (content: string) => void;
}
