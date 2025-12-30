import { Store, useStore } from "@tanstack/react-store";

export interface ExplorerState {
  expandedPaths: Record<string, boolean>;
}

const STORAGE_KEY = "note-geval-explorer-expanded";

const getInitialState = (): ExplorerState => {
  if (typeof window === "undefined") return { expandedPaths: {} };
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { expandedPaths: {} };
  try {
    return { expandedPaths: JSON.parse(saved) };
  } catch {
    return { expandedPaths: {} };
  }
};

export const explorerStore = new Store<ExplorerState>(getInitialState());

// Sync to localStorage on every change
explorerStore.subscribe(() => {
  const state = explorerStore.state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expandedPaths));
});

export const useExplorerStore = () => {
  const state = useStore(explorerStore);

  const isExpanded = (path: string): boolean => {
    return !!state.expandedPaths[path];
  };

  const toggleExpanded = (path: string) => {
    explorerStore.setState((state) => ({
      ...state,
      expandedPaths: {
        ...state.expandedPaths,
        [path]: !state.expandedPaths[path],
      },
    }));
  };

  const setExpanded = (path: string, expanded: boolean) => {
    explorerStore.setState((state) => ({
      ...state,
      expandedPaths: {
        ...state.expandedPaths,
        [path]: expanded,
      },
    }));
  };

  const expandRecursively = (path: string) => {
    const segments = path.split("/");
    const pathsToExpand: string[] = [];
    let currentPath = "";

    // If it's a file path, we only want to expand its parent directories
    // But since this is for "directory navigation", we assume path is a directory or we want to expand all segments
    for (let i = 0; i < segments.length; i++) {
      currentPath = currentPath ? `${currentPath}/${segments[i]}` : segments[i];
      pathsToExpand.push(currentPath);
    }

    explorerStore.setState((state) => {
      const newExpanded = { ...state.expandedPaths };
      for (const p of pathsToExpand) {
        newExpanded[p] = true;
      }
      return {
        ...state,
        expandedPaths: newExpanded,
      };
    });
  };

  return {
    expandedPaths: state.expandedPaths,
    isExpanded,
    toggleExpanded,
    setExpanded,
    expandRecursively,
  };
};
