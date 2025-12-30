"use client";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.Ref<HTMLTextAreaElement>;
}

export default function Editor({ value, onChange, inputRef }: EditorProps) {
  return (
    <div className="flex flex-col h-full">
      <textarea
        className="flex-1 w-full p-4 md:p-4 bg-background text-foreground resize-none focus:outline-none font-mono text-base md:text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing..."
        spellCheck={false}
        ref={inputRef}
      />
    </div>
  );
}
