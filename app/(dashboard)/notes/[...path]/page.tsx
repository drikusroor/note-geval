import { NewNoteEditor as NoteEditor } from "@/components/editor/NoteEditor";

export default async function NotePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const relativePath = path.join("/");

  return <NoteEditor key={relativePath} path={relativePath} />;
}
