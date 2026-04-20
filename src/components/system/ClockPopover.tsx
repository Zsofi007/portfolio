type ClockPopoverProps = {
  dateLabel: string;
  timeLabel: string;
  id: string;
};

export function ClockPopover({ dateLabel, timeLabel, id }: ClockPopoverProps) {
  return (
    <div
      id={id}
      role="dialog"
      aria-label="Clock"
      className={
        'absolute bottom-full right-0 mb-2 w-[17rem] rounded-2xl border bg-[color:var(--ui-glass-strong)] p-3 font-retro ' +
        'shadow-[var(--ui-shadow-md)] backdrop-blur-[16px]'
      }
      style={{ borderColor: 'var(--ui-border-soft)', color: 'var(--ui-text)' }}
    >
      <div className="text-lg leading-tight">
        <div className="font-semibold">{timeLabel}</div>
        <div className="text-base" style={{ color: 'var(--ui-text-muted)' }}>
          {dateLabel}
        </div>
      </div>
      <div className="mt-2 text-base" style={{ color: 'var(--ui-text-muted)' }}>
        Time flies. So should your tabs.
      </div>
    </div>
  );
}

