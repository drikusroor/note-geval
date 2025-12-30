"use client";

import type { EditorView } from "@codemirror/view";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CoreEditor } from "./core";
import { markdownExtensions } from "./core/defaults";
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
  const [content, setContent] = useState<string | null>(null);
  const [view, setView] = useState<EditorView | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", path] });
    },
  });

  useEffect(() => {
    if (note?.content !== undefined && content === null) {
      setContent(note.content);
    }
  }, [note, content]);

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

  if (isLoading || content === null)
    return <div className="p-8">Loading note...</div>;

  return (
    <div className="flex flex-col h-full relative">
      {isSearchOpen && (
        <SearchPanel view={view} onClose={() => setIsSearchOpen(false)} />
      )}

      <div className="flex items-center justify-between p-3 md:p-2 border-b bg-muted/50 gap-2">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-xs font-mono text-muted-foreground px-2">
            Live Preview Editor
          </span>
        </div>
        <button
          type="button"
          onClick={() => content !== null && mutation.mutate(content)}
          disabled={mutation.isPending || content === note?.content}
          className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px] md:min-h-0"
          aria-label="Save note"
        >
          <Save className="w-6 h-6 md:w-4 md:h-4" />
          <span className="hidden sm:inline">
            {mutation.isPending ? "Saving..." : "Save"}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden bg-background">
        <CoreEditor
          initialContent={content}
          extensions={extensions}
          onChange={setContent}
          onViewCreated={handleViewCreated}
        />
      </div>
    </div>
  );
}
