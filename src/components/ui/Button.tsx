import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className = '', type = 'button', ...rest },
  ref,
) {
  const base =
    'font-pixel inline-flex items-center justify-center border-2 border-black bg-xp-teal px-5 py-3 ' +
    'text-[0.55rem] leading-tight tracking-tight text-white [box-shadow:2px_2px_0_#000] cursor-pointer ui-pressable ' +
    'hover:bg-xp-teal-dark hover:[box-shadow:1px_1px_0_#000] active:translate-x-px active:translate-y-px ' +
    'active:[box-shadow:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-[#7cfcb0] disabled:opacity-50';
  return (
    <button ref={ref} type={type} className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
});
