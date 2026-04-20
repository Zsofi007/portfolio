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
        'absolute bottom-full right-0 mb-2 w-[17rem] rounded-sm border-2 border-black/25 bg-xp-panel/95 p-3 font-retro text-retro-ink ' +
        'shadow-[var(--ui-shadow-md)] backdrop-blur-[2px]'
      }
    >
      <div className="text-lg leading-tight">
        <div className="font-semibold">{timeLabel}</div>
        <div className="text-base text-black/70">{dateLabel}</div>
      </div>
      <div className="mt-2 text-base text-black/70">System clock. Surprisingly honest.</div>
    </div>
  );
}

