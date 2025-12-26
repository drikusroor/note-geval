import fs from "node:fs/promises";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const NOTES_ROOT = path.resolve(env.NOTES_DIR);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathSegments } = await params;
    const relativePath = pathSegments.join("/");
    const absolutePath = path.join(NOTES_ROOT, relativePath);

    if (!absolutePath.startsWith(NOTES_ROOT)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const fileBuffer = await fs.readFile(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();

    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (_error) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
