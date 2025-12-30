import { describe, expect, mock, test } from "bun:test";
import { NextRequest } from "next/server";
import { POST } from "./route";

mock.module("@/lib/fs", () => ({
  writeNote: mock(() => Promise.resolve()),
}));

describe("POST /api/notes", () => {
  test("creates a new note", async () => {
    const req = new NextRequest("http://localhost/api/notes", {
      method: "POST",
      body: JSON.stringify({ name: "new-note.md", content: "" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.path).toBe("new-note.md");
  });

  test("returns 400 if name is missing", async () => {
    const req = new NextRequest("http://localhost/api/notes", {
      method: "POST",
      body: JSON.stringify({ content: "" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
