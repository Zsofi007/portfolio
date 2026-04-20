import type { AppChromeVariant } from '@/types/app-chrome';

const RESUME_URL = import.meta.env.VITE_RESUME_URL ?? '/resume.pdf';

type ResumeAppProps = {
  variant?: AppChromeVariant;
  /** When false, skip loading the PDF (inactive window). */
  loadPreview?: boolean;
};

export function ResumeApp({ variant = 'xp', loadPreview = true }: ResumeAppProps) {
  const ios = variant === 'ios';
  const src = loadPreview ? RESUME_URL : undefined;

  const preview = (
    <iframe
      title="Resume PDF"
      src={src}
      className={
        ios
          ? 'min-h-[min(58dvh,520px)] w-full flex-1 border-0 md:min-h-0'
          : 'min-h-[min(52dvh,480px)] w-full flex-1 border-0 md:min-h-0'
      }
    />
  );

  if (ios) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto bg-white p-4 font-sans text-black">
        <header className="shrink-0">
          <h2 className="m-0 text-lg font-semibold">Resume.pdf</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-black/65">
            Summary: senior frontend engineer · React · TypeScript · product-minded delivery.
          </p>
        </header>
        <section
          aria-label="Resume preview"
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-zinc-100 shadow-inner"
        >
          {preview}
        </section>
        <p className="m-0 shrink-0 text-[12px] leading-snug text-black/45">
          If the preview does not load in your browser, use Download to open the file.
        </p>
        <a
          href={RESUME_URL}
          download
          className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-[#007aff] px-5 py-3 text-[16px] font-semibold text-white no-underline hover:bg-[#0066d6]"
        >
          Download PDF
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4 font-sans" style={{ color: 'var(--ui-text)' }}>
      <header className="shrink-0">
        <p className="mt-2 text-[15px] leading-snug" style={{ color: 'var(--ui-text-muted)' }}>
          Summary: senior frontend engineer · React · TypeScript · product-minded delivery.
        </p>
      </header>
      <section
        aria-label="Resume preview"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border bg-[color:var(--ui-glass)] shadow-[var(--ui-shadow-sm)] backdrop-blur-[12px]"
        style={{ borderColor: 'var(--ui-border-soft)' }}
      >
        {preview}
      </section>
      <p className="m-0 shrink-0 text-[12px] leading-snug" style={{ color: 'var(--ui-text-muted)' }}>
        If the preview is blank, use Download — some browsers do not embed PDFs here.
      </p>
      <a
        href={RESUME_URL}
        download
        className="inline-flex w-fit shrink-0 cursor-pointer rounded-xl px-4 py-2 text-[13px] font-semibold no-underline ui-pressable ui-cta"
      >
        Download PDF
      </a>
    </div>
  );
}
