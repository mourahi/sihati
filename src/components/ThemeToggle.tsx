import { useTheme } from "../lib/theme.tsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "التبديل إلى الثيم الفاتح" : "التبديل إلى الثيم الداكن"}
      title={isDark ? "ثيم فاتح" : "ثيم داكن"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand bg-canvas text-ink transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" aria-hidden="true" fill="none">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <path
            d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-deep" aria-hidden="true" fill="currentColor">
          <path d="M14.2 3.2a8.8 8.8 0 1 0 6.4 14.6 7.2 7.2 0 0 1-6.4-14.6Z" />
        </svg>
      )}
    </button>
  );
}
