"use client";

import { RefreshCcw, Save } from "lucide-react";
import { useNoteStore } from "@/lib/store/useNoteStore";
import { useSettings } from "@/lib/store/useSettings";
import { Breadcrumb } from "./Breadcrumb";
import { SavingStatus } from "./SavingStatus";

export interface EditorHeaderProps {
  path: string;
  onSave: () => void;
  isSaving: boolean;
}

export function EditorHeader({ path, onSave, isSaving }: EditorHeaderProps) {
  const { getNoteDraft, revertNote } = useNoteStore();
  const { isAutoSaveEnabled, updateSettings } = useSettings();
  const draft = getNoteDraft(path);
  const isDirty = draft?.isDirty ?? false;

  const handleRevert = () => {
    if (
      window.confirm(
        "Are you sure you want to revert all unsaved changes to this note?",
      )
    ) {
      revertNote(path);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 md:p-2 border-b bg-muted/50 gap-2 overflow-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <Breadcrumb path={path} />
        {isDirty && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
              Unsaved
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <SavingStatus path={path} />

        <div className="flex items-center gap-2 mx-1 md:mx-2 bg-background/50 px-3 py-1 rounded-full border">
          <label
            className="text-[10px] md:text-xs font-medium cursor-pointer uppercase tracking-tight"
            htmlFor="auto-save"
          >
            Auto-save
          </label>
          <input
            id="auto-save"
            type="checkbox"
            checked={isAutoSaveEnabled}
            onChange={(e) =>
              updateSettings({ isAutoSaveEnabled: e.target.checked })
            }
            className="w-3 h-3 md:w-4 md:h-4 accent-primary cursor-pointer"
          />
        </div>

        {isDirty && (
          <button
            type="button"
            onClick={handleRevert}
            className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md text-sm font-medium transition-colors"
            title="Revert changes"
          >
            <RefreshCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Revert</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || !isDirty}
          className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors min-h-[44px] md:min-h-0"
          aria-label="Save note"
        >
          <Save className="w-6 h-6 md:w-4 md:h-4" />
          <span className="hidden sm:inline">
            {isSaving ? "Saving..." : "Save"}
          </span>
        </button>
      </div>
    </div>
  );
}
