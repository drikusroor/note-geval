import NoteEditor from "@/components/NoteEditor";

export default async function NotePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const relativePath = path.join("/");

  return <NoteEditor path={relativePath} />;
}
