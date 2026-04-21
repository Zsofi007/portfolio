export type NoteId = 'built' | 'ideas' | 'why' | 'random';

export type Note = {
  id: NoteId;
  title: string;
  body: string;
  updatedAt: string;
};

export const NOTES: Note[] = [
  {
    id: 'built',
    title: "Things I've built",
    updatedAt: 'Yesterday',
    body:
      '- AI travel planner\n' +
      '- OS-style portfolio\n' +
      '- Finance tracker\n' +
      '- PDF → XML converter\n',
  },
  {
    id: 'ideas',
    title: 'Ideas I might actually finish',
    updatedAt: '2 days ago',
    body:
      '- Auto social media tool for small businesses\n' +
      '- AI-powered personal dashboards\n',
  },
  {
    id: 'why',
    title: 'Why this portfolio exists',
    updatedAt: 'Last week',
    body: 'Most portfolios are boring.\nThis one isn’t.\n',
  },
  {
    id: 'random',
    title: 'Random thoughts',
    updatedAt: 'Last week',
    body:
      '- add tiny easter eggs\n' +
      '- ship it, then polish it\n' +
      '- make the UI feel “real”\n',
  },
];

export function getNote(id: NoteId): Note | undefined {
  return NOTES.find((n) => n.id === id);
}

