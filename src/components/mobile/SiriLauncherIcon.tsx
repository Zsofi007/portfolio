/** Squircle-style Siri orb for the home screen (no bundled PNG in the icon pack). */
export function SiriLauncherIcon() {
  return (
    <span
      aria-hidden
      className={
        'block h-12 w-12 rounded-[22%] bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#22d3ee] ' +
        'shadow-[0_6px_20px_rgb(99_102_241/0.65)]'
      }
    />
  );
}
