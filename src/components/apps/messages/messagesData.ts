export type ChatId = 'recruiter' | 'friend' | 'me';

export type ChatMessage = {
  id: string;
  from: 'them' | 'me';
  text: string;
  at: string; // display-only, not parsed
};

export type ChatThread = {
  id: ChatId;
  title: string;
  messages: ChatMessage[];
};

export const THREADS: ChatThread[] = [
  {
    id: 'recruiter',
    title: 'Recruiter',
    messages: [
      { id: 'r1', from: 'them', text: 'So what do you actually do?', at: '10:12' },
      { id: 'r2', from: 'me', text: 'Mostly frontend. React, TypeScript, performance-focused stuff.', at: '10:13' },
      { id: 'r3', from: 'them', text: 'Built this whole thing just for fun?', at: '10:14' },
      { id: 'r4', from: 'me', text: 'Yeah. Wanted something different.', at: '10:14' },
    ],
  },
  {
    id: 'friend',
    title: 'Friend',
    messages: [
      { id: 'f1', from: 'them', text: 'girl this portfolio is insane', at: 'Yesterday' },
      { id: 'f2', from: 'me', text: 'thanks 😄', at: 'Yesterday' },
      { id: 'f3', from: 'them', text: 'do you ever go outside', at: 'Yesterday' },
      { id: 'f4', from: 'me', text: 'once a', at: 'Yesterday' },
    ],
  },
];

export function getThread(id: ChatId): ChatThread | undefined {
  return THREADS.find((t) => t.id === id);
}

