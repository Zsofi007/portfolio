import { useWallpaperStore } from '@/store/wallpaperStore';

const STYLES: Record<string, string> = {
  default:
    'bg-[#5b8bd9] bg-gradient-to-b from-[#87aade] via-[#5b8bd9] to-[#3d5a8a]',
  midnight: 'bg-gradient-to-b from-[#0f172a] via-[#020617] to-black',
  retro: 'bg-gradient-to-br from-[#4a1d6a] via-[#1a1033] to-[#0d3b2c]',
  sunset: 'bg-gradient-to-b from-[#ffb36b] via-[#f97316] to-[#7c2d12]',
  aurora: 'bg-gradient-to-br from-[#0ea5e9] via-[#7c3aed] to-[#10b981]',
  graphite: 'bg-gradient-to-br from-[#111827] via-[#0b1220] to-black',
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
