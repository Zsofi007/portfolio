import { useShellUiStore } from '@/store/shellUiStore';
import type { AppChromeVariant } from '@/types/app-chrome';
import { useState } from 'react';

const iosField =
  'rounded-xl border border-black/10 bg-zinc-50 px-3 py-2.5 text-[16px] text-black outline-none ' +
  'placeholder:text-black/35 focus:border-[#007aff] focus:ring-1 focus:ring-[#007aff]';

const iosBtn =
  'rounded-xl bg-[#007aff] px-5 py-3 text-[16px] font-semibold text-white outline-none ' +
  'hover:bg-[#0066d6] focus-visible:ring-2 focus-visible:ring-[#007aff]';

type ContactExeFormProps = { variant?: AppChromeVariant };

export function ContactExeForm({ variant = 'xp' }: ContactExeFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const ios = variant === 'ios';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
    useShellUiStore.getState().pushToast('Message queued (demo — wire your API later).');
  };

  if (sent && ios) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 bg-white p-6 font-sans text-black"
      >
        <p className="m-0 text-xl font-semibold">Thanks, {name}.</p>
        <p className="m-0 text-center text-[15px] text-black/55">Message received. I’ll probably reply faster than a recruiter.</p>
        <button type="button" className={iosBtn} onClick={() => { setSent(false); setName(''); setMessage(''); }}>
          Send another
        </button>
      </div>
    );
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 p-6 font-retro text-retro-ink"
      >
        <p className="m-0 text-2xl">Thanks, {name}.</p>
        <p className="m-0 text-lg text-black/70">Message received. I’ll probably reply faster than a recruiter.</p>
        <button
          type="button"
          className="border-2 border-black bg-xp-panel px-3 py-1 text-lg hover:bg-white"
          onClick={() => {
            setSent(false);
            setName('');
            setMessage('');
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  if (ios) {
    return (
      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto bg-white p-4 font-sans">
        <h2 className="m-0 text-lg font-semibold text-black">New message</h2>
        <label className="flex flex-col gap-1.5 text-[13px] font-medium text-black/55">
          Name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={iosField} />
        </label>
        <label className="flex min-h-0 flex-1 flex-col gap-1.5 text-[13px] font-medium text-black/55">
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className={`min-h-0 flex-1 resize-none ${iosField}`}
          />
        </label>
        <button type="submit" className={`mt-1 w-full ${iosBtn}`}>
          Send
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4 font-retro text-retro-ink"
    >
      <h2 className="font-pixel m-0 text-[0.55rem] text-retro-titlebar-mid">Contact.exe</h2>
      <label className="flex flex-col gap-1 text-lg">
        Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black/30 bg-white px-2 py-1 text-lg outline-none focus:border-black"
        />
      </label>
      <label className="flex min-h-0 flex-1 flex-col gap-1 text-lg">
        Message
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="min-h-0 flex-1 resize-none border-2 border-black/30 bg-white px-2 py-1 text-lg outline-none focus:border-black"
        />
      </label>
      <button
        type="submit"
        className="font-pixel w-fit border-2 border-black bg-xp-teal px-4 py-2 text-[0.5rem] text-white hover:bg-xp-teal-dark"
      >
        Submit
      </button>
    </form>
  );
}
