export function SiriApp() {
  return (
    <div
      className={
        'flex min-h-0 flex-1 flex-col items-center justify-center gap-8 bg-gradient-to-b ' +
        'from-[#1c1c1e] via-[#0f0f10] to-black px-6 pb-10 text-center font-sans text-white'
      }
    >
      <div
        className={
          'h-28 w-28 shrink-0 rounded-full bg-gradient-to-br from-[#6366f1] via-[#c084fc] ' +
          'to-[#22d3ee] shadow-[0_0_80px_rgb(168_85_247/0.55)]'
        }
        aria-hidden
      />
      <div className="space-y-2">
        <p className="m-0 text-lg font-semibold tracking-tight">Hey Siri</p>
        <p className="m-0 max-w-xs text-sm leading-relaxed text-white/65">
          There is no shell on iPhone — this is a playful stand-in. Wire voice or search here when you
          want a real assistant.
        </p>
      </div>
      <label className="sr-only" htmlFor="siri-demo-field">
        Siri search (demo)
      </label>
      <input
        id="siri-demo-field"
        readOnly
        className={
          'w-full max-w-sm rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-center ' +
          'text-sm text-white/90 outline-none ring-0 placeholder:text-white/40'
        }
        placeholder="What can I help you find?"
      />
    </div>
  );
}
