import { useTheme } from "../lib/theme.tsx";

const LABELS = {
  light: "الثيم الفاتح. اضغطي للداكن",
  dark: "الثيم الداكن. اضغطي للثلاثي الأبعاد",
  three: "الثيم الثلاثي الأبعاد. اضغطي للفاتح",
} as const;

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={LABELS[theme]}
      title={LABELS[theme]}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand bg-canvas text-ink transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
    >
      {theme === "light" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-deep" aria-hidden="true" fill="currentColor">
          <path d="M14.2 3.2a8.8 8.8 0 1 0 6.4 14.6 7.2 7.2 0 0 1-6.4-14.6Z" />
        </svg>
      ) : null}
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" aria-hidden="true" fill="none">
          <path
            d="M12 4.2 19.5 8.4v7.2L12 19.8 4.5 15.6V8.4L12 4.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 4.2v8.4m0 0 7.5-4.2M12 12.6 4.5 8.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {theme === "three" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </button>
  );
}
