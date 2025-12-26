"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3, Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import Editor from "./Editor";
import InternalSearch from "./InternalSearch";
import Preview from "./Preview";

interface NoteEditorProps {
  path: string;
}

export default function NoteEditor({ path }: NoteEditorProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [view, setView] = useState<"edit" | "preview" | "split">("split");

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
    if (note?.content !== undefined) {
      setContent(note.content);
    }
  }, [note]);

  if (isLoading) return <div className="p-8">Loading note...</div>;

  return (
    <div className="flex flex-col h-full relative">
      <InternalSearch content={content} />
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("edit")}
            className={`p-2 rounded-md ${view === "edit" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("preview")}
            className={`p-2 rounded-md ${view === "preview" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("split")}
            className={`p-2 rounded-md ${view === "split" ? "bg-accent" : "hover:bg-accent/50"}`}
            title="Split View"
          >
            <div className="flex gap-0.5">
              <div className="w-1.5 h-3 border-r" />
              <div className="w-1.5 h-3" />
            </div>
          </button>
        </div>
        <button
          onClick={() => mutation.mutate(content)}
          disabled={mutation.isPending || content === note?.content}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {(view === "edit" || view === "split") && (
          <div
            className={`flex-1 overflow-hidden ${view === "split" ? "border-r" : ""}`}
          >
            <Editor value={content} onChange={setContent} />
          </div>
        )}
        {(view === "preview" || view === "split") && (
          <div className="flex-1 overflow-hidden">
            <Preview content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
