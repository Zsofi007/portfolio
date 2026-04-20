import { isAppIconAsset } from '@/utils/appIconAsset';
import { resolveTheme, useThemeStore } from '@/store/themeStore';
import type { IconType } from 'react-icons';
import { FaBomb, FaDesktop, FaFlag, FaGithub, FaMoon, FaSearch, FaSun } from 'react-icons/fa';
import { RiRestartLine } from 'react-icons/ri';

type AppIconGlyphProps = {
  icon: string;
  imgClassName?: string;
  textClassName?: string;
};

const ICON_MAP: Record<string, IconType> = {
  'fa:FaBomb': FaBomb,
  'fa:FaDesktop': FaDesktop,
  'fa:FaFlag': FaFlag,
  'fa:FaGithub': FaGithub,
  'fa:FaSun': FaSun,
  'fa:FaMoon': FaMoon,
  'fa:FaSearch': FaSearch,
  'ri:RiRestartLine': RiRestartLine,
};

export function AppIconGlyph({
  icon,
  imgClassName = 'max-h-full max-w-full object-contain',
  textClassName,
}: AppIconGlyphProps) {
  const mode = useThemeStore((s) => s.mode);
  const resolved = resolveTheme(mode);

  if (isAppIconAsset(icon)) {
    const needsLightPlate = resolved === 'dark' && icon.includes('itiner-ai');
    if (!needsLightPlate) return <img src={icon} alt="" aria-hidden className={imgClassName} />;
    return (
      <span
        aria-hidden
        className="inline-flex items-center justify-center rounded-md bg-white/95 p-1 shadow-[0_10px_26px_rgb(0_0_0/0.45)]"
      >
        <img src={icon} alt="" aria-hidden className={imgClassName} />
      </span>
    );
  }
  const Icon = ICON_MAP[icon];
  if (Icon) return <Icon aria-hidden focusable={false} className={imgClassName} />;
  return <span className={textClassName}>{icon}</span>;
}
