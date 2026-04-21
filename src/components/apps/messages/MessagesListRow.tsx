import type { ChatThread } from '@/components/apps/messages/messagesData';

type MessagesListRowProps = {
  thread: ChatThread;
  onOpen: () => void;
};

function lastPreview(thread: ChatThread): { text: string; at: string } {
  const last = thread.messages[thread.messages.length - 1];
  return { text: last?.text ?? '', at: last?.at ?? '' };
}

export function MessagesListRow({ thread, onOpen }: MessagesListRowProps) {
  const { text, at } = lastPreview(thread);
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 border-b border-black/[0.06] bg-white px-4 py-3 text-left outline-none active:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#007aff]"
      onClick={onOpen}
      aria-label={`Open conversation with ${thread.title}`}
    >
      <span
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e5e7eb] to-[#cbd5e1] text-[13px] font-semibold text-black/70"
      >
        {thread.title
          .split(' ')
          .map((p) => p.trim()[0])
          .filter(Boolean)
          .slice(0, 2)
          .join('')}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[15px] font-semibold text-black">{thread.title}</span>
          <span className="shrink-0 text-[12px] font-medium text-black/45">{at}</span>
        </span>
        <span className="mt-0.5 block truncate text-[13px] font-medium text-black/55">{text}</span>
      </span>
    </button>
  );
}

