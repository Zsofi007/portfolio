import type { ReactNode } from 'react';

type TitleBarProps = {
  titleId: string;
  title: string;
  dragProps: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerMove: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
  };
  controls: ReactNode;
};

export function TitleBar({ titleId, title, dragProps, controls }: TitleBarProps) {
  return (
    <div
      className={
        'flex cursor-default select-none items-center gap-2 border-b-2 border-black ' +
        'bg-gradient-to-b from-retro-titlebar-mid to-retro-titlebar-deep px-2 py-2'
      }
    >
      <div className="min-w-0 flex-1" {...dragProps}>
        <span
          id={titleId}
          className="font-pixel block truncate text-[0.55rem] leading-snug tracking-tight text-white"
        >
          {title}
        </span>
      </div>
      <div className="shrink-0" onPointerDown={(e) => e.stopPropagation()}>
        {controls}
      </div>
    </div>
  );
}
