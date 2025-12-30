import { useEffect, useState, useRef } from "react";
import { EditorState, type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

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

  // Keep callback fresh in ref to avoid re-init
  useEffect(() => {
    stateRef.current.onChange = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!parentRef.current) return;

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

    const view = new EditorView({
      state,
      parent: parentRef.current,
    });

    setView(view);

    return () => {
      view.destroy();
      setView(null);
    };
  }, [parentRef]); // Intentionally empty deps for extensions/initialDoc to avoid re-init

  return { view };
}
