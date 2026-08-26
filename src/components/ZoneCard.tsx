import { Link } from "react-router-dom";
import { IconBlossom, IconLeaf, IconRose } from "./Florals";

type ZoneCardProps = {
  id: string;
  label: string;
  description: string;
  href: string;
};

function ZoneFloralIcon({ id, className }: { id: string; className?: string }) {
  if (id === "belly" || id === "hips") {
    return <IconRose className={className} />;
  }
  if (id === "waist" || id === "arms") {
    return <IconBlossom className={className} />;
  }
  return <IconLeaf className={className} />;
}

function zoneFloralTone(id: string) {
  if (id === "belly" || id === "hips") return "text-rose-deep";
  if (id === "waist" || id === "arms") return "text-rose";
  return "text-sage";
}

export function ZoneCard({ id, label, description, href }: ZoneCardProps) {
  return (
    <Link
      id={id}
      to={href}
      className="group relative flex flex-col rounded-[1.5rem] border border-sand bg-paper/70 p-6 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <IconBlossom className="pointer-events-none absolute top-3 end-3 h-3.5 w-3.5 text-rose/30" />
      <span
        aria-hidden="true"
        className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sand ${zoneFloralTone(id)}`}
      >
        <ZoneFloralIcon id={id} className="h-5 w-5" />
      </span>
      <h3 className="font-display text-xl font-bold text-ink group-hover:text-rose-deep">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </Link>
  );
}
