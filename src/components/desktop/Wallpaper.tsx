import { useWallpaperStore } from '@/store/wallpaperStore';

const STYLES: Record<string, string> = {
  default:
    'bg-[#5b8bd9] bg-gradient-to-b from-[#87aade] via-[#5b8bd9] to-[#3d5a8a]',
  midnight: 'bg-gradient-to-b from-[#0f172a] via-[#020617] to-black',
  retro: 'bg-gradient-to-br from-[#4a1d6a] via-[#1a1033] to-[#0d3b2c]',
};

export function Wallpaper() {
  const id = useWallpaperStore((s) => s.id);
  const layer = STYLES[id] ?? STYLES.default;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${layer}`}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgb(0 0 0 / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgb(0 0 0 / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
}
