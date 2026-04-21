import { getDesktopAppById } from '@/features/desktop-system/desktopApps';
import { formatElapsed, useMobileUsageStore } from '@/store/mobileUsageStore';
import { useEffect, useMemo, useState } from 'react';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-black/[0.06] bg-white p-4 shadow-[0_18px_50px_rgb(0_0_0/0.10)]">
      <p className="m-0 text-[12px] font-semibold uppercase tracking-wide text-black/45">{title}</p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function curiosityLabel(ms: number, opens: number): 'Low' | 'Medium' | 'High' {
  if (ms > 3 * 60_000 || opens >= 8) return 'High';
  if (ms > 60_000 || opens >= 4) return 'Medium';
  return 'Low';
}

export function UsageStatsApp() {
  const sessionStartMs = useMobileUsageStore((s) => s.sessionStartMs);
  const appOpens = useMobileUsageStore((s) => s.appOpens);
  const totalOpens = useMobileUsageStore((s) => s.totalOpens);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const elapsedMs = sessionStartMs ? now - sessionStartMs : 0;
  const { min, sec } = formatElapsed(elapsedMs);

  const mostOpened = useMemo(() => {
    const entries = Object.entries(appOpens);
    if (!entries.length) return null;
    entries.sort((a, b) => b[1] - a[1]);
    const [id, count] = entries[0];
    const label = getDesktopAppById(id)?.label ?? id;
    return { id, label, count };
  }, [appOpens]);

  const top = useMemo(() => {
    const entries = Object.entries(appOpens)
      .map(([id, count]) => ({ id, count, label: getDesktopAppById(id)?.label ?? id }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
    const max = Math.max(1, ...entries.map((e) => e.count));
    return { entries, max };
  }, [appOpens]);

  const curiosity = curiosityLabel(elapsedMs, totalOpens);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f2f2f7] p-4 font-sans text-black">
      <header className="mb-4">
        <p className="m-0 text-[22px] font-bold tracking-tight">Screen Time</p>
        <p className="m-0 mt-1 text-[13px] font-medium text-black/55">We’ve been tracking you 👀</p>
      </header>

      <div className="grid gap-3">
        <Card title="Time spent exploring">
          <p className="m-0 text-[28px] font-bold tabular-nums tracking-tight">
            {min}m {String(sec).padStart(2, '0')}s
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card title="Apps opened">
            <p className="m-0 text-[24px] font-bold tabular-nums">{totalOpens}</p>
          </Card>
          <Card title="Curiosity level">
            <p className="m-0 text-[24px] font-bold">{curiosity}</p>
          </Card>
        </div>

        <Card title="Most opened app">
          <p className="m-0 text-[18px] font-semibold">{mostOpened ? mostOpened.label : '—'}</p>
          <p className="m-0 mt-1 text-[13px] font-medium text-black/55">
            {mostOpened ? `${mostOpened.count} opens` : 'Open a few apps first.'}
          </p>
        </Card>

        <Card title="Top apps">
          <div className="space-y-2">
            {top.entries.length ? (
              top.entries.map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-[13px] font-semibold text-black/80">{e.label}</p>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#007aff]"
                        style={{ width: `${Math.round((e.count / top.max) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="shrink-0 text-[12px] font-semibold tabular-nums text-black/45">{e.count}</div>
                </div>
              ))
            ) : (
              <p className="m-0 text-[13px] font-medium text-black/55">No data yet. Start snooping.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

