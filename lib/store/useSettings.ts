import { Store, useStore } from "@tanstack/react-store";

export interface UserSettings {
  isAutoSaveEnabled: boolean;
  autoSaveDelay: number;
}

const DEFAULT_SETTINGS: UserSettings = {
  isAutoSaveEnabled: true,
  autoSaveDelay: 2000,
};

const STORAGE_KEY = "note-geval-settings";

const getInitialSettings = (): UserSettings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const settingsStore = new Store<UserSettings>(getInitialSettings());

export const useSettings = () => {
  const settings = useStore(settingsStore);

  const updateSettings = (updates: Partial<UserSettings>) => {
    settingsStore.setState((state) => {
      const newState = { ...state, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return {
    ...settings,
    updateSettings,
  };
};
