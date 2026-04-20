import { GUIDANCE_KEYS, readLocalJson, readLocalString, writeLocalJson, writeLocalString } from './guidanceStorage';

export type HintsJson = {
  firstLaunchHintDone?: boolean;
  terminalWelcomeSeen?: boolean;
};

export function getDesktopWelcomeSeen(): boolean {
  return readLocalString(GUIDANCE_KEYS.desktopWelcomeSeen) === '1';
}

export function setDesktopWelcomeSeen(): void {
  writeLocalString(GUIDANCE_KEYS.desktopWelcomeSeen, '1');
}

export function getMobileWelcomeSeen(): boolean {
  return readLocalString(GUIDANCE_KEYS.mobileWelcomeSeen) === '1';
}

export function setMobileWelcomeSeen(): void {
  writeLocalString(GUIDANCE_KEYS.mobileWelcomeSeen, '1');
}

export function getHints(): HintsJson {
  return readLocalJson<HintsJson>(GUIDANCE_KEYS.hints) ?? {};
}

export function patchHints(patch: Partial<HintsJson>): void {
  writeLocalJson(GUIDANCE_KEYS.hints, { ...getHints(), ...patch });
}
