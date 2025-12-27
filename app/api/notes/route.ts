import { type NextRequest, NextResponse } from "next/server";
import { listAllRecursive, listFiles, writeNote } from "@/lib/fs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dir = searchParams.get("dir") || "";
    const recursive = searchParams.get("recursive") === "true";

    const files = recursive
      ? await listAllRecursive(dir)
      : await listFiles(dir);
    return NextResponse.json(files);
  } catch (error) {
    console.error("Failed to list notes:", error);
    return NextResponse.json(
      { error: "Failed to list notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, content = "" } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Ensure .md extension
    const fileName = name.endsWith(".md") ? name : `${name}.md`;

    await writeNote(fileName, content);

    return NextResponse.json(
      { message: "Note created", path: fileName },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
