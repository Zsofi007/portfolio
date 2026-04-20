import { PreviewError } from '@/components/projects/PreviewError';
import { Skeleton } from '@/components/ui/Skeleton';
import type { AppChromeVariant } from '@/types/app-chrome';
import { useEffect, useState } from 'react';

const TIMEOUT_MS = 14_000;

type ProjectPreviewIframeProps = {
  src: string;
  title: string;
  loadEnabled: boolean;
  variant?: AppChromeVariant;
};

export function ProjectPreviewIframe({ src, title, loadEnabled, variant = 'xp' }: ProjectPreviewIframeProps) {
  const ios = variant === 'ios';
  const [phase, setPhase] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    if (!loadEnabled) return;
    setPhase('loading');
    const t = window.setTimeout(() => {
      setPhase((p) => (p === 'loading' ? 'error' : p));
    }, TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [loadEnabled, src, loadKey]);

  const retry = () => {
    if (!loadEnabled) return;
    setLoadKey((k) => k + 1);
  };

  const showFrame = loadEnabled && phase !== 'error';
  const onLoad = () => setPhase('ready');

  return (
    <div
      className={
        ios
          ? 'relative min-h-[12rem] flex-1 overflow-hidden rounded-2xl border border-black/[0.1] bg-zinc-100 shadow-inner'
          : 'relative min-h-[12rem] flex-1 overflow-hidden border-2 border-black/25 bg-white'
      }
    >
      {(phase === 'idle' || phase === 'loading') && (
        <Skeleton className="absolute inset-2" aria-label="Loading project preview" />
      )}
      {phase === 'error' && (
        <div className="absolute inset-2 flex items-center justify-center">
          <PreviewError onRetry={retry} />
        </div>
      )}
      {showFrame && (
        <iframe
          key={loadKey}
          title={title}
          src={src}
          loading="lazy"
          onLoad={onLoad}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer-when-downgrade"
          className={`h-full min-h-[12rem] w-full border-0 ${phase === 'ready' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
