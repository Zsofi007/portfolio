import type { MobileNotificationItem } from '@/store/mobileNotificationStore';

type MobileNotificationRowsProps = {
  items: MobileNotificationItem[];
  exitingIds: Set<string>;
  listFading: boolean;
  onClearOne: (id: string) => void;
};

const rowBase =
  'flex gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/[0.04] ' +
  'transition duration-200 ease-out motion-reduce:transition-none';

export function MobileNotificationRows({
  items,
  exitingIds,
  listFading,
  onClearOne,
}: MobileNotificationRowsProps) {
  if (items.length === 0) {
    return <p className="m-0 px-2 py-6 text-center font-sans text-[15px] text-black/45">No notifications</p>;
  }

  return (
    <ul
      className={
        'm-0 list-none space-y-2 p-0 transition duration-200 ease-out motion-reduce:transition-none ' +
        (listFading ? 'pointer-events-none scale-[0.99] opacity-0' : 'opacity-100')
      }
    >
      {items.map((n) => {
        const exiting = exitingIds.has(n.id);
        return (
          <li key={n.id}>
            <div
              className={
                rowBase +
                (exiting
                  ? ' pointer-events-none translate-y-[-2px] scale-[0.985] opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100'
                  : '')
              }
            >
              <div className="min-w-0 flex-1 font-sans">
                <p className="m-0 text-[15px] font-semibold text-black">{n.title}</p>
                <p className="m-0 mt-0.5 text-[13px] leading-snug text-black/60">{n.body}</p>
              </div>
              <button
                type="button"
                aria-label={`Dismiss ${n.title}`}
                className="shrink-0 self-start rounded-full px-2 py-1 font-sans text-[13px] text-[#007aff] disabled:opacity-40"
                disabled={exiting}
                onClick={() => onClearOne(n.id)}
              >
                Clear
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
