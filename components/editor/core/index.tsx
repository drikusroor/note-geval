import type { Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { useCodeMirror } from "./useCodeMirror";

interface CoreEditorProps {
  initialContent: string;
  extensions: Extension[];
  onChange?: (content: string) => void;
  onViewCreated?: (view: EditorView) => void;
  className?: string;
}

export const CoreEditor = ({
  initialContent,
  extensions,
  onChange,
  onViewCreated,
  className,
}: CoreEditorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { view } = useCodeMirror({
    initialDoc: initialContent,
    extensions,
    parentRef: ref,
    onChange,
  });

  useEffect(() => {
    if (view && onViewCreated) {
      onViewCreated(view);
    }
  }, [view, onViewCreated]);

  return (
    <div
      ref={ref}
      className={`h-full w-full overflow-hidden ${className || ""}`}
    />
  );
};
