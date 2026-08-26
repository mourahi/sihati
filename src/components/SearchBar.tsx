import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchSite } from "../lib/search";
import type { SearchHit } from "../lib/search";

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = query.trim() ? searchSite(query) : [];

  useEffect(() => {
    setQuery("");
    setOpen(false);
    setActive(0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(hit: SearchHit) {
    setQuery("");
    setOpen(false);
    navigate(hit.href);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (value + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (value - 1 + results.length) % results.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      go(results[active] ?? results[0]);
    }
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        البحث في صحتي
      </label>
      <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-rose">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16.2 16.2 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id={inputId}
        type="search"
        value={query}
        placeholder="ابحثي عن وصفة، برنامج، تمرين أو الدورة…"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-11 w-full rounded-[1.25rem] border border-sand bg-white/80 pe-4 ps-10 text-sm text-ink outline-none placeholder:text-muted/80 transition focus:border-rose/50 focus:bg-white focus:shadow-[0_8px_24px_rgba(224,122,144,0.12)]"
      />

      {open && query.trim() ? (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-50 overflow-hidden rounded-[1.25rem] border border-sand bg-cream/95 shadow-[0_16px_40px_rgba(44,36,32,0.12)] backdrop-blur-md"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">لا توجد نتائج لهذا البحث.</p>
          ) : (
            <ul className="max-h-80 overflow-auto py-1">
              {results.map((hit, index) => (
                <li key={hit.id}>
                  <Link
                    to={hit.href}
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => {
                      setQuery("");
                      setOpen(false);
                    }}
                    className={`flex items-start gap-3 px-4 py-2.5 text-start transition ${
                      index === active ? "bg-sand/90" : "hover:bg-sand/60"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 rounded-full bg-rose/12 px-2 py-0.5 text-[0.65rem] font-medium text-rose-deep">
                      {hit.kind}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{hit.title}</span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-muted">{hit.hint}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
