"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface PreviewProps {
  content: string;
  path: string;
}

export default function Preview({ content, path }: PreviewProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function transform() {
      const result = await markdownToHtml(content, path);
      setHtml(result);
    }
    transform();
  }, [content, path]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none p-4 h-full overflow-y-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: intended use
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
