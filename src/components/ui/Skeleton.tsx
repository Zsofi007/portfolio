type SkeletonProps = { className?: string; 'aria-label'?: string };

export function Skeleton({ className = '', 'aria-label': ariaLabel }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel ?? 'Loading preview'}
      className={`animate-pulse rounded-md bg-slate-200/90 ${className}`.trim()}
    />
  );
}
