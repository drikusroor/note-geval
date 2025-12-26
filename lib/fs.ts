import fs from "node:fs/promises";
import path from "node:path";
import { env } from "./env";

const NOTES_ROOT = path.resolve(env.NOTES_DIR);

export interface FileInfo {
  path: string;
  name: string;
  isDirectory: boolean;
  lastModified: Date;
  createdAt: Date;
  size: number;
}

export async function listFiles(relativeDir = ""): Promise<FileInfo[]> {
  const absoluteDir = path.join(NOTES_ROOT, relativeDir);
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDir, entry.name);
      const absolutePath = path.join(NOTES_ROOT, relativePath);
      const stats = await fs.stat(absolutePath);

      return {
        path: relativePath,
        name: entry.name,
        isDirectory: entry.isDirectory(),
        lastModified: stats.mtime,
        createdAt: stats.birthtime,
        size: stats.size,
      };
    }),
  );

  return files;
}

export async function listAllRecursive(relativeDir = ""): Promise<FileInfo[]> {
  const absoluteDir = path.join(NOTES_ROOT, relativeDir);
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

  let results: FileInfo[] = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const absolutePath = path.join(NOTES_ROOT, relativePath);
    const stats = await fs.stat(absolutePath);

    const info: FileInfo = {
      path: relativePath,
      name: entry.name,
      isDirectory: entry.isDirectory(),
      lastModified: stats.mtime,
      createdAt: stats.birthtime,
      size: stats.size,
    };

    results.push(info);

    if (entry.isDirectory()) {
      const children = await listAllRecursive(relativePath);
      results = results.concat(children);
    }
  }

  return results;
}

export async function readNote(relativePath: string) {
  const absolutePath = path.join(NOTES_ROOT, relativePath);
  if (!absolutePath.startsWith(NOTES_ROOT)) {
    throw new Error("Invalid path: access denied");
  }
  const content = await fs.readFile(absolutePath, "utf-8");
  const stats = await fs.stat(absolutePath);
  return {
    content,
    lastModified: stats.mtime,
    createdAt: stats.birthtime,
    size: stats.size,
  };
}

export async function writeNote(relativePath: string, content: string) {
  const absolutePath = path.join(NOTES_ROOT, relativePath);
  if (!absolutePath.startsWith(NOTES_ROOT)) {
    throw new Error("Invalid path: access denied");
  }

  // Ensure directory exists
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, content, "utf-8");
}

export async function deleteNote(relativePath: string) {
  const absolutePath = path.join(NOTES_ROOT, relativePath);
  if (!absolutePath.startsWith(NOTES_ROOT)) {
    throw new Error("Invalid path: access denied");
  }
  await fs.unlink(absolutePath);
}

export async function getAllNotesRecursively(
  relativeDir = "",
): Promise<FileInfo[]> {
  const absoluteDir = path.join(NOTES_ROOT, relativeDir);
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });

  let results: FileInfo[] = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const absolutePath = path.join(NOTES_ROOT, relativePath);
    const stats = await fs.stat(absolutePath);

    if (entry.isDirectory()) {
      results = results.concat(await getAllNotesRecursively(relativePath));
    } else if (entry.name.endsWith(".md")) {
      results.push({
        path: relativePath,
        name: entry.name,
        isDirectory: false,
        lastModified: stats.mtime,
        createdAt: stats.birthtime,
        size: stats.size,
      });
    }
  }

  return results;
}
