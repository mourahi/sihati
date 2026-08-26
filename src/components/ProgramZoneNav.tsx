import { Link } from "react-router-dom";
import { programs } from "../data/content";
import type { BodyZone } from "../data/content";
import { getZoneLabel } from "../lib/zones";

type ProgramZoneNavProps = {
  currentZone: BodyZone;
};

export function ProgramZoneNav({ currentZone }: ProgramZoneNavProps) {
  const others = programs.filter((item) => item.zone !== currentZone);

  return (
    <nav
      aria-label="باقي الأعضاء"
      className="rounded-[1.5rem] border border-sand bg-white/70 p-4 shadow-[0_8px_30px_rgba(44,36,32,0.06)]"
    >
      <h2 className="border-b border-sand pb-3 font-display text-lg font-bold text-ink">
        باقي الأعضاء
      </h2>
      <ul className="mt-2">
        {others.map((item) => (
          <li key={item.id}>
            <Link
              to={`/programs/${item.id}`}
              className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium text-ink/85 transition hover:bg-sand hover:text-rose-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              <span aria-hidden="true">{item.imageEmoji}</span>
              <span>{getZoneLabel(item.zone)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
