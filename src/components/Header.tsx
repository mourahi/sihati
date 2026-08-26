import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconBlossom, IconLeaf, IconMoon, IconRose } from "./Florals";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "الرئيسية", end: true, Icon: IconRose },
  { to: "/programs", label: "البرامج", end: false, Icon: IconBlossom },
  { to: "/classes", label: "حصة رياضية", end: false, Icon: IconLeaf },
  { to: "/nutrition", label: "المطبخ", end: false, Icon: IconRose },
  { to: "/cycle", label: "خاص بالمرأة", end: false, Icon: IconMoon },
  { to: "/about", label: "عن صحتي", end: false, Icon: IconBlossom },
] as const;

function linkClass(isActive: boolean, compact: boolean) {
  const base = compact
    ? "block rounded-2xl px-4 py-3 text-base"
    : "relative py-1 text-[0.95rem]";
  const idle = "font-medium text-ink/80 transition hover:text-rose";
  const active = compact
    ? "font-semibold text-rose bg-sand/80"
    : "font-semibold text-rose after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-rose";
  return `${base} ${isActive ? active : idle}`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/90 bg-canvas/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 md:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-brand text-[1.5rem] font-bold leading-none text-rose-deep transition hover:text-rose focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose sm:gap-2 sm:text-[1.95rem]"
          aria-label="صحتي — الصفحة الرئيسية"
        >
          <IconRose className="h-6 w-6 text-rose" />
          صحتي
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-3 lg:gap-5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 ${linkClass(isActive, false)}`
              }
            >
              <item.Icon className="h-3.5 w-3.5 text-rose/80" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-sand bg-canvas text-ink transition hover:bg-sand lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute start-0 h-0.5 w-6 rounded-full bg-ink transition duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute start-0 top-1.5 h-0.5 w-6 rounded-full bg-ink transition duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute start-0 h-0.5 w-6 rounded-full bg-ink transition duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-3 pb-2.5 sm:px-4 md:px-6">
        <SearchBar />
      </div>

      <div
        id={menuId}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav
          aria-label="التنقل للجوال"
          aria-hidden={!open}
          className={`min-h-0 space-y-1 border-t border-sand/80 px-4 py-3 ${
            open ? "" : "pointer-events-none"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 ${linkClass(isActive, true)}`
              }
            >
              <item.Icon className="h-4 w-4 text-rose/80" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
