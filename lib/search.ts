import Fuse from "fuse.js";
import { getAllNotesRecursively, readNote } from "./fs";

export interface SearchDoc {
  path: string;
  name: string;
  content: string;
}

export async function getSearchIndex(): Promise<SearchDoc[]> {
  const allFiles = await getAllNotesRecursively();

  const docs = await Promise.all(
    allFiles.map(async (file) => {
      try {
        const { content } = await readNote(file.path);
        return {
          path: file.path,
          name: file.name,
          content: content,
        };
      } catch (_error) {
        return null;
      }
    }),
  );

  return docs.filter((doc): doc is SearchDoc => doc !== null);
}

export function searchNotes(docs: SearchDoc[], query: string) {
  const fuse = new Fuse(docs, {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "content", weight: 0.3 },
    ],
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse.search(query);
}
