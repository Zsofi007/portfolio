import { TERMINAL_COMMANDS } from '@/features/terminal/terminalRegistry';

export function runTerminalLine(input: string): string[] {
  const line = input.trim();
  if (!line) return [];
  const [name, ...args] = line.split(/\s+/);
  const fn = TERMINAL_COMMANDS[name.toLowerCase()];
  if (!fn) return [`Unknown command: ${name}. Type help.`];
  return fn(args);
}
