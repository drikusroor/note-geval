import { type NextRequest, NextResponse } from "next/server";
import { listFiles } from "@/lib/fs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dir = searchParams.get("dir") || "";

    const files = await listFiles(dir);
    return NextResponse.json(files);
  } catch (error) {
    console.error("Failed to list notes:", error);
    return NextResponse.json(
      { error: "Failed to list notes" },
      { status: 500 },
    );
  }
}
