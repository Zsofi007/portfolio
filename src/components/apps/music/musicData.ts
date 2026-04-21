export type Track = { id: string; title: string; artist: string; durMs: number };

export const TRACKS: Track[] = [
  { id: 't1', title: 'Debugging at 2AM', artist: 'Unknown Developer', durMs: 2 * 60_000 + 24_000 },
  { id: 't2', title: 'Deploy Anxiety', artist: 'Unknown Developer', durMs: 2 * 60_000 + 5_000 },
  { id: 't3', title: 'It works on my machine', artist: 'Unknown Developer', durMs: 1 * 60_000 + 58_000 },
  { id: 't4', title: 'Hotfix in production', artist: 'Unknown Developer', durMs: 2 * 60_000 + 41_000 },
];

