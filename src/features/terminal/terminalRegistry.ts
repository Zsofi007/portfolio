import type { TerminalCommandFn } from '@/features/terminal/commandTypes';
import {
  aboutCommand,
  contactCommand,
  developerSpecsCommand,
  meCommand,
  projectsCommand,
  resumeCommand,
  terminalCommand,
} from '@/features/terminal/commands/navCommands';
import { appsCommand, githubCommand, helpCommand, listCommand, openCommand } from '@/features/terminal/commands/infoCommands';

export const TERMINAL_COMMANDS: Record<string, TerminalCommandFn> = {
  help: helpCommand,
  list: listCommand,
  apps: appsCommand,
  open: openCommand,
  github: githubCommand,
  about: aboutCommand,
  me: meCommand,
  projects: projectsCommand,
  contact: contactCommand,
  resume: resumeCommand,
  specs: developerSpecsCommand,
  'developer-specs': developerSpecsCommand,
  terminal: terminalCommand,
};
