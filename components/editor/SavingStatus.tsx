"use client";

import { CheckCircle, CloudUpload, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNoteStore } from "@/lib/store/useNoteStore";

export function SavingStatus({ path }: { path: string }) {
  const { getNoteDraft } = useNoteStore();
  const draft = getNoteDraft(path);
  const status = draft?.savingState ?? "idle";
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (status === "saved") {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status === "saving") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse">
        <CloudUpload className="w-4 h-4 md:w-3.5 md:h-3.5" />
        <span className="hidden sm:inline">Saving...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
        <XCircle className="w-4 h-4 md:w-3.5 md:h-3.5" />
        <span>Save failed</span>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-medium">
        <CheckCircle className="w-4 h-4 md:w-3.5 md:h-3.5" />
        <span>Saved</span>
      </div>
    );
  }

  return null;
}
