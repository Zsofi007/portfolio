import { NotesListRow } from '@/components/apps/notes/NotesListRow';
import type { NoteId } from '@/components/apps/notes/notesData';
import { getNote, NOTES } from '@/components/apps/notes/notesData';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export function NotesApp() {
  const [active, setActive] = useState<NoteId | null>(null);
  const note = useMemo(() => (active ? getNote(active) : undefined), [active]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f2f2f7] font-sans">
      <header className="shrink-0 border-b border-black/[0.06] bg-white px-4 pb-2 pt-3">
        <div className="flex items-center justify-between">
          {active ? (
            <button
              type="button"
              className="-ml-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[17px] font-medium text-[#f59e0b] outline-none hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
              onClick={() => setActive(null)}
              aria-label="Back to notes"
            >
              <span aria-hidden className="text-[22px] leading-none">
                ‹
              </span>
              Notes
            </button>
          ) : (
            <span className="text-[22px] font-bold tracking-tight text-black">Notes</span>
          )}
          <span className="text-[13px] font-semibold text-black/40">{active ? note?.updatedAt : 'All iCloud'}</span>
        </div>
      </header>

      <AnimatePresence initial={false} mode="wait">
        {active && note ? (
          <motion.div
            key={`note-${note.id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.16 }}
            className="min-h-0 flex-1 overflow-auto px-4 py-4"
          >
            <h3 className="m-0 text-[20px] font-bold tracking-tight text-black">{note.title}</h3>
            <p className="m-0 mt-1 text-[12px] font-medium text-black/45">Updated {note.updatedAt}</p>
            <div className="mt-4 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_10px_28px_rgb(0_0_0/0.10)]">
              <pre className="m-0 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-black/85">
                {note.body}
              </pre>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.14 }}
            className="min-h-0 flex-1 overflow-auto"
          >
            <div className="border-t border-black/[0.06]">
              {NOTES.map((n) => (
                <NotesListRow key={n.id} note={n} onOpen={() => setActive(n.id)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

