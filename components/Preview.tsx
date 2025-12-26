"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    async function transform() {
      const result = await markdownToHtml(content);
      setHtml(result);
    }
    transform();
  }, [content]);

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none p-4 h-full overflow-y-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
