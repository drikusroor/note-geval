import { type NextRequest, NextResponse } from "next/server";
import { deleteNote, readNote, writeNote } from "@/lib/fs";
import { updateNoteSchema } from "@/lib/schemas";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const relativePath = path.join("/");
    const note = await readNote(relativePath);
    return NextResponse.json(note);
  } catch (error) {
    console.error("Failed to read note:", error);
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const relativePath = path.join("/");
    const body = await request.json();
    const result = updateNoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await writeNote(relativePath, result.data.content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const relativePath = path.join("/");
    await deleteNote(relativePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
