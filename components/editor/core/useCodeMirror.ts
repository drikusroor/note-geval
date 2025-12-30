import { EditorState, type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { useEffect, useRef, useState } from "react";

interface UseCodeMirrorProps {
  initialDoc: string;
  extensions: Extension[];
  parentRef: React.RefObject<HTMLDivElement | null>;
  onChange?: (doc: string) => void;
}

export function useCodeMirror({
  initialDoc,
  extensions,
  parentRef,
  onChange,
}: UseCodeMirrorProps) {
  const [view, setView] = useState<EditorView | null>(null);
  const stateRef = useRef({ onChange });
  const initializedRef = useRef(false);

  // Keep callback fresh in ref to avoid re-init
  useEffect(() => {
    stateRef.current.onChange = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!parentRef.current || initializedRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && stateRef.current.onChange) {
        stateRef.current.onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: initialDoc,
      extensions: [
        ...extensions,
        updateListener,
        EditorView.lineWrapping, // Default to line wrapping
      ],
    });

    const editorView = new EditorView({
      state,
      parent: parentRef.current,
    });

    setView(editorView);
    initializedRef.current = true;

    return () => {
      editorView.destroy();
      setView(null);
      initializedRef.current = false;
    };
    // initialDoc and extensions are only used for initial setup.
    // Path changes are handled by the 'key' prop on the NoteEditor component.
    // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  }, [parentRef]);

  return { view };
}
