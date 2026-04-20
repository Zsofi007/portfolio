import { openAppByIdMessage } from '@/features/terminal/commandHelpers';
import type { TerminalCommandFn } from '@/features/terminal/commandTypes';

export const aboutCommand: TerminalCommandFn = () => openAppByIdMessage('about');

export const contactCommand: TerminalCommandFn = () => openAppByIdMessage('contact');

export const projectsCommand: TerminalCommandFn = () => openAppByIdMessage('folder-projects');

export const meCommand: TerminalCommandFn = () => openAppByIdMessage('folder-system');

export const resumeCommand: TerminalCommandFn = () => openAppByIdMessage('resume');

export const terminalCommand: TerminalCommandFn = () => openAppByIdMessage('terminal');

export const developerSpecsCommand: TerminalCommandFn = () => openAppByIdMessage('system');
