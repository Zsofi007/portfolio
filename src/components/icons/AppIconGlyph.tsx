import { isAppIconAsset } from '@/utils/appIconAsset';
import type { IconType } from 'react-icons';
import { FaBomb, FaFlag, FaGithub, FaSearch } from 'react-icons/fa';
import { RiRestartLine } from 'react-icons/ri';

type AppIconGlyphProps = {
  icon: string;
  imgClassName?: string;
  textClassName?: string;
};

const ICON_MAP: Record<string, IconType> = {
  'fa:FaBomb': FaBomb,
  'fa:FaFlag': FaFlag,
  'fa:FaGithub': FaGithub,
  'fa:FaSearch': FaSearch,
  'ri:RiRestartLine': RiRestartLine,
};

export function AppIconGlyph({
  icon,
  imgClassName = 'max-h-full max-w-full object-contain',
  textClassName,
}: AppIconGlyphProps) {
  if (isAppIconAsset(icon)) {
    return <img src={icon} alt="" aria-hidden className={imgClassName} />;
  }
  const Icon = ICON_MAP[icon];
  if (Icon) return <Icon aria-hidden focusable={false} className={imgClassName} />;
  return <span className={textClassName}>{icon}</span>;
}
