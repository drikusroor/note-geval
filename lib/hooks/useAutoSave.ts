import { useEffect, useRef } from "react";
import { useSettings } from "../store/useSettings";

/**
 * Hook to handle auto-save debounce logic.
 * @param onSave Callback to trigger the save mutation
 * @param content The current content to watch for changes
 * @param isDirty Whether the content is currently dirty
 */
export const useAutoSave = (
  onSave: () => void,
  content: string,
  isDirty: boolean,
) => {
  const { isAutoSaveEnabled, autoSaveDelay } = useSettings();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Explicitly use content to satisfy linting while ensuring re-run on change
    void content;

    // If auto-save is disabled or not dirty, clear any pending timer
    if (!isAutoSaveEnabled || !isDirty) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Reset timer on every content change
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSave();
    }, autoSaveDelay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [content, isAutoSaveEnabled, autoSaveDelay, isDirty, onSave]);
};
