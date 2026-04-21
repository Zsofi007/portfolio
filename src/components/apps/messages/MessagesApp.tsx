import { MessageBubble } from '@/components/apps/messages/MessageBubble';
import { MessagesListRow } from '@/components/apps/messages/MessagesListRow';
import type { ChatId } from '@/components/apps/messages/messagesData';
import { getThread, THREADS } from '@/components/apps/messages/messagesData';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

function ChatInputBar() {
  return (
    <div className="shrink-0 border-t border-black/[0.06] bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
      <div className="flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-[#f2f2f7] px-3 py-2">
        <span aria-hidden className="text-[16px] text-black/35">
          +
        </span>
        <div className="flex-1 text-[15px] text-black/35">iMessage</div>
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-[#007aff] text-[13px] font-semibold text-white/95 opacity-70"
          aria-label="Send (disabled)"
          disabled
        >
          ↑
        </button>
      </div>
    </div>
  );
}

export function MessagesApp() {
  const [active, setActive] = useState<ChatId | null>(null);
  const thread = useMemo(() => (active ? getThread(active) : undefined), [active]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thread) return;
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [thread?.id]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f2f2f7] font-sans">
      <header className="shrink-0 border-b border-black/[0.06] bg-white px-4 pb-2 pt-3">
        <div className="flex items-center justify-between">
          {active ? (
            <button
              type="button"
              className="-ml-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[17px] font-medium text-[#007aff] outline-none hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#007aff]"
              onClick={() => setActive(null)}
              aria-label="Back to conversations"
            >
              <span aria-hidden className="text-[22px] leading-none">
                ‹
              </span>
              Messages
            </button>
          ) : (
            <span className="text-[22px] font-bold tracking-tight text-black">Messages</span>
          )}
          <span className="text-[13px] font-semibold text-black/40">{active ? thread?.title : 'Edit'}</span>
        </div>
      </header>

      <AnimatePresence initial={false} mode="wait">
        {active && thread ? (
          <motion.div
            key={`chat-${thread.id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.16 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto px-4 py-4">
              <div className="space-y-2">
                {thread.messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
              </div>
            </div>
            <ChatInputBar />
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
              {THREADS.map((t) => (
                <MessagesListRow key={t.id} thread={t} onOpen={() => setActive(t.id)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

