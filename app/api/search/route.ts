import { type NextRequest, NextResponse } from "next/server";
import { searchSchema } from "@/lib/schemas";
import { getSearchIndex, searchNotes } from "@/lib/search";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    const result = searchSchema.safeParse({ q: query });
    if (!result.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const docs = await getSearchIndex();
    const matches = searchNotes(docs, query);

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Search failed:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
