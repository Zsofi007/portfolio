/** Display name from `VITE_DEVELOPER_NAME` (set in `.env`). */
export function getDeveloperName(): string {
  const v = import.meta.env.VITE_DEVELOPER_NAME;
  if (v == null || typeof v !== 'string') return '';
  return v.trim();
}

/** Short line for landing screens: whose machine this is. */
export function getLandingComputerTagline(): string {
  const name = getDeveloperName();
  if (name) return `${name}'s computer`;
  return "A developer's personal machine";
}
