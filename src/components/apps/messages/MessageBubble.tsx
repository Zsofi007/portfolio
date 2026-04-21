import type { ChatMessage } from '@/components/apps/messages/messagesData';

type MessageBubbleProps = {
  msg: ChatMessage;
};

export function MessageBubble({ msg }: MessageBubbleProps) {
  const mine = msg.from === 'me';
  return (
    <div className={'flex w-full ' + (mine ? 'justify-end' : 'justify-start')}>
      <div
        className={
          'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[15px] leading-snug shadow-[0_10px_26px_rgb(0_0_0/0.12)] ' +
          (mine
            ? 'bg-[#007aff] text-white'
            : 'bg-white text-black/90 border border-black/[0.06]')
        }
      >
        <p className="m-0 whitespace-pre-wrap">{msg.text}</p>
      </div>
    </div>
  );
}

