import { Store, useStore } from "@tanstack/react-store";

export interface NoteDraft {
  path: string;
  content: string;
  isDirty: boolean;
  lastSavedContent: string;
  savingState: "idle" | "saving" | "saved" | "error";
  revertCount: number;
}

export interface NoteSessionState {
  dirtyNotes: Record<string, NoteDraft>;
}

const STORAGE_KEY = "note-geval-session-notes";

const getInitialState = (): NoteSessionState => {
  if (typeof window === "undefined") return { dirtyNotes: {} };
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (!saved) return { dirtyNotes: {} };
  try {
    return JSON.parse(saved);
  } catch {
    return { dirtyNotes: {} };
  }
};

export const noteStore = new Store<NoteSessionState>(getInitialState());

// Sync to sessionStorage on every change
noteStore.subscribe(() => {
  const state = noteStore.state;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});

export const useNoteStore = () => {
  const state = useStore(noteStore);

  const getNoteDraft = (path: string): NoteDraft | undefined => {
    return state.dirtyNotes[path];
  };

  const updateNoteDraft = (path: string, updates: Partial<NoteDraft>) => {
    noteStore.setState((state) => {
      const existing = state.dirtyNotes[path] || {
        path,
        content: "",
        isDirty: false,
        lastSavedContent: "",
        savingState: "idle",
        revertCount: 0,
      };

      return {
        ...state,
        dirtyNotes: {
          ...state.dirtyNotes,
          [path]: { ...existing, ...updates },
        },
      };
    });
  };

  const setNoteClean = (path: string, content: string) => {
    updateNoteDraft(path, {
      content,
      lastSavedContent: content,
      isDirty: false,
      savingState: "saved",
    });
  };

  const revertNote = (path: string) => {
    const draft = state.dirtyNotes[path];
    if (draft) {
      updateNoteDraft(path, {
        content: draft.lastSavedContent,
        isDirty: false,
        revertCount: draft.revertCount + 1,
      });
    }
  };
  return {
    dirtyNotes: state.dirtyNotes,
    getNoteDraft,
    updateNoteDraft,
    setNoteClean,
    revertNote,
  };
};
