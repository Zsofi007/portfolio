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
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto bg-white p-4 font-retro text-retro-ink">
      <section
        aria-label="Resume preview"
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded border-2 border-black/20 bg-zinc-100 shadow-inner"
      >
        {preview}
      </section>
      <p className="m-0 shrink-0 font-pixel text-[0.42rem] leading-snug text-black/55">
        If the preview is blank, use Download — some browsers do not embed PDFs here.
      </p>
      <a
        href={RESUME_URL}
        download
        className="font-pixel inline-flex w-fit shrink-0 border-2 border-black bg-xp-teal px-3 py-2 text-[0.5rem] text-white hover:bg-xp-teal-dark"
      >
        Download PDF
      </a>
    </div>
  );
}
