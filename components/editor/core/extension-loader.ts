import type { Extension } from "@codemirror/state";
import type { EditorExtension } from "./types";

/**
 * flattens our EditorExtension wrapper into raw CodeMirror extensions
 */
export function loadExtensions(extensions: EditorExtension[]): Extension[] {
  return extensions.map((ext) => ext.extension);
}

/**
 * Utility to compose extensions
 */
export function composeExtensions(
  ...exts: (EditorExtension | Extension)[]
): Extension[] {
  return exts.map((ext) => {
    if ("extension" in (ext as EditorExtension)) {
      return (ext as EditorExtension).extension;
    }
    return ext as Extension;
  });
}
