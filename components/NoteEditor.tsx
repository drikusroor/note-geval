"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Columns2, Edit3, Eye, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Editor from "./Editor";
import InternalSearch from "./InternalSearch";
import Preview from "./Preview";

interface NoteEditorProps {
  path: string;
}

export default function NoteEditor({ path }: NoteEditorProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [hasLoadedContent, setHasLoadedContent] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  // Default to edit view on mobile, split on desktop
  const [view, setView] = useState<"edit" | "preview" | "split">("edit");

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", path],
    queryFn: () => fetch(`/api/notes/${path}`).then((res) => res.json()),
    refetchInterval: 10000, // Poll every 10 seconds
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
    if (note?.content !== undefined && !hasLoadedContent) {
      setContent(note.content);
      setInitialContent(note.content);
      setHasLoadedContent(true);
      setIsDirty(false);
    } else if (note?.content !== undefined && hasLoadedContent && !isDirty) {
      // Only sync server content when the user has no unsaved edits
      setContent(note.content);
      setInitialContent(note.content);
      setIsDirty(false);
    }
  }, [note, hasLoadedContent, isDirty]);

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsDirty(value !== initialContent);
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const handleInput = (event: Event) => {
      const value = (event.target as HTMLTextAreaElement).value;
      setContent(value);
      setIsDirty(value !== initialContent);
    };

    el.addEventListener("input", handleInput);
    return () => el.removeEventListener("input", handleInput);
  }, [initialContent]);

  // Set initial view on mount
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setView("split");
    }
  }, []);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setView((prev) =>
          prev === "edit" || prev === "preview" ? "split" : prev,
        );
      } else {
        setView((prev) => (prev === "split" ? "edit" : prev));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <div className="p-8">Loading note...</div>;

  return (
    <div className="flex flex-col h-full relative">
      <InternalSearch content={content} />
      <div className="flex items-center justify-between p-3 md:p-2 border-b bg-muted/50 gap-2">
        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => setView("edit")}
            className={`p-3 md:p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center ${view === "edit" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Edit"
            aria-label="Edit mode"
          >
            <Edit3 className="w-6 h-6 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("preview")}
            className={`p-3 md:p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center ${view === "preview" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Preview"
            aria-label="Preview mode"
          >
            <Eye className="w-6 h-6 md:w-4 md:h-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("split")}
            className={`p-3 md:p-2 rounded-md transition-colors hidden md:flex min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 items-center justify-center ${view === "split" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Split View"
            aria-label="Split view mode"
          >
            <Columns2 className="w-6 h-6 md:w-4 md:h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => mutation.mutate(content)}
          disabled={mutation.isPending || !hasLoadedContent || !isDirty}
          className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px] md:min-h-0"
          aria-label="Save note"
        >
          <Save className="w-6 h-6 md:w-4 md:h-4" />
          <span className="hidden sm:inline">
            {mutation.isPending ? "Saving..." : "Save"}
          </span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {(view === "edit" || view === "split") && (
          <div
            className={`flex-1 overflow-hidden ${view === "split" ? "border-r" : ""}`}
          >
            <Editor
              value={content}
              onChange={handleContentChange}
              inputRef={editorRef}
            />
          </div>
        )}
        {(view === "preview" || view === "split") && (
          <div className="flex-1 overflow-hidden">
            <Preview content={content} path={path} />
          </div>
        )}
      </div>
    </div>
  );
}
