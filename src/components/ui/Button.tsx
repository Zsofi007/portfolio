import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className = '', type = 'button', ...rest },
  ref,
) {
  const base =
    'inline-flex items-center justify-center rounded-xl border border-[color:var(--ui-border-soft)] px-5 py-3 font-sans text-[13px] font-semibold ' +
    'cursor-pointer ui-pressable outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ui-focus)] disabled:opacity-50 ' +
    'bg-[color:var(--ui-cta-bg)] hover:bg-[color:var(--ui-cta-bg-hover)] text-[color:var(--ui-cta-text)]';
  return (
    <button ref={ref} type={type} className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
});
