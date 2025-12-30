"use client";

import type { EditorView } from "@codemirror/view";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import { useNoteStore } from "@/lib/store/useNoteStore";
import { CoreEditor } from "./core";
import { markdownExtensions } from "./core/defaults";
import { EditorHeader } from "./EditorHeader";
import { inlineStyles } from "./extensions/inline-styles";
import { listHandling } from "./extensions/list-handling";
import { livePreview } from "./extensions/live-preview";
import { searchExtensions } from "./extensions/search";
import { SearchPanel } from "./SearchPanel";

interface NewNoteEditorProps {
  path: string;
}

export function NewNoteEditor({ path }: NewNoteEditorProps) {
  const queryClient = useQueryClient();
  const { getNoteDraft, updateNoteDraft, setNoteClean } = useNoteStore();
  const [view, setView] = useState<EditorView | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const draft = getNoteDraft(path);

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", path],
    queryFn: () => fetch(`/api/notes/${path}`).then((res) => res.json()),
    refetchInterval: 10000,
  });

  const mutation = useMutation({
    mutationFn: (newContent: string) =>
      fetch(`/api/notes/${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newContent }),
      }).then((res) => res.json()),
    onMutate: () => {
      updateNoteDraft(path, { savingState: "saving" });
    },
    onSuccess: (_data, newContent) => {
      setNoteClean(path, newContent);
      queryClient.invalidateQueries({ queryKey: ["note", path] });
    },
    onError: () => {
      updateNoteDraft(path, { savingState: "error" });
    },
  });

  // Initialize draft when note is loaded
  useEffect(() => {
    if (note?.content !== undefined && !draft) {
      updateNoteDraft(path, {
        content: note.content,
        lastSavedContent: note.content,
        isDirty: false,
        savingState: "idle",
      });
    }
  }, [note, draft, path, updateNoteDraft]);

  // Handle Search Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const extensions = useMemo(
    () => [
      ...markdownExtensions,
      livePreview(),
      inlineStyles(),
      listHandling(),
      searchExtensions(),
    ],
    [],
  );

  const handleViewCreated = useCallback((view: EditorView) => {
    setView(view);
  }, []);

  const handleContentChange = useCallback(
    (newContent: string) => {
      if (!draft) return;
      updateNoteDraft(path, {
        content: newContent,
        isDirty: newContent !== draft.lastSavedContent,
      });
    },
    [path, updateNoteDraft, draft],
  );

  const currentContent = draft?.content ?? note?.content ?? null;

  const handleSave = useCallback(() => {
    if (currentContent !== null) {
      mutation.mutate(currentContent);
    }
  }, [mutation, currentContent]);

  useAutoSave(handleSave, currentContent ?? "", draft?.isDirty ?? false);

  if (isLoading || currentContent === null)
    return <div className="p-8">Loading note...</div>;

  return (
    <div className="flex flex-col h-full relative">
      {isSearchOpen && (
        <SearchPanel view={view} onClose={() => setIsSearchOpen(false)} />
      )}

      <EditorHeader
        path={path}
        onSave={handleSave}
        isSaving={mutation.isPending}
      />

      <div className="flex-1 overflow-hidden bg-background">
        <CoreEditor
          key={`${path}-${draft?.revertCount ?? 0}`} // Re-mount if note changes or is reverted
          initialContent={currentContent}
          extensions={extensions}
          onChange={handleContentChange}
          onViewCreated={handleViewCreated}
        />
      </div>
    </div>
  );
}
