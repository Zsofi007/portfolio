import type { Note } from '@/components/apps/notes/notesData';

type NotesListRowProps = {
  note: Note;
  onOpen: () => void;
};

export function NotesListRow({ note, onOpen }: NotesListRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-start gap-3 border-b border-black/[0.06] bg-white px-4 py-3 text-left outline-none active:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
      onClick={onOpen}
      aria-label={`Open note: ${note.title}`}
    >
      <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#f59e0b] opacity-75" />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[15px] font-semibold text-black">{note.title}</span>
          <span className="shrink-0 text-[12px] font-medium text-black/45">{note.updatedAt}</span>
        </span>
        <span className="mt-0.5 block truncate text-[13px] font-medium text-black/55">
          {note.body.replaceAll('\n', ' ')}
        </span>
      </span>
    </button>
  );
}

