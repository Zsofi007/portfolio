import { GUIDANCE_KEYS, readLocalString } from '@/features/guidance/guidanceStorage';
import { getHints, patchHints } from '@/features/guidance/onboardingFlags';
import { runTerminalLine } from '@/features/terminal/runCommand';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_LINE = 'Portfolio OS — type `help` for commands.';

function readGuidedDefaultOn(): boolean {
  const gm = readLocalString(GUIDANCE_KEYS.guidedMode);
  return gm === null || gm === '1' || gm === 'true';
}

function readInitialTerminalLines(): string[] {
  const base = [DEFAULT_LINE];
  if (typeof window === 'undefined') return base;
  if (!readGuidedDefaultOn()) return base;
  if (getHints().terminalWelcomeSeen) {
    return ['Welcome.', 'Try:  about    projects    contact', '', ...base];
  }
  return base;
}

export function TerminalApp() {
  const [lines, setLines] = useState<string[]>(readInitialTerminalLines);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!readGuidedDefaultOn()) return;
    if (getHints().terminalWelcomeSeen) return;
    patchHints({ terminalWelcomeSeen: true });
    setLines(['Welcome.', 'Try:  about    projects    contact', '', DEFAULT_LINE]);
  }, []);

  const submit = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    const cmd = el.value.trim();
    el.value = '';
    if (!cmd) return;
    setLines((prev) => [...prev, `> ${cmd}`, ...runTerminalLine(cmd)]);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-black font-mono text-sm text-green-400">
      <div
        className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-3"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {lines.join('\n')}
      </div>
      <div className="flex shrink-0 gap-2 border-t border-green-800 p-2">
        <span className="text-green-500" aria-hidden>
          {'>'}
        </span>
        <input
          ref={inputRef}
          type="text"
          aria-label="Terminal command"
          className="min-w-0 flex-1 bg-transparent text-green-300 outline-none focus:ring-0"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          type="button"
          className="rounded border border-green-700 px-2 py-0.5 text-xs text-green-300 hover:bg-green-900"
          onClick={submit}
        >
          Run
        </button>
      </div>
    </div>
  );
}
