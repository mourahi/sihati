import { Link } from "react-router-dom";

type ZoneCardProps = {
  id: string;
  label: string;
  description: string;
  href: string;
  emoji?: string;
};

export function ZoneCard({ id, label, description, href, emoji }: ZoneCardProps) {
  return (
    <Link
      id={id}
      to={href}
      className="group flex flex-col rounded-[1.5rem] border border-sand bg-white/70 p-6 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      {emoji ? (
        <span className="mb-4 text-2xl" aria-hidden="true">
          {emoji}
        </span>
      ) : null}
      <h3 className="font-display text-xl font-bold text-ink group-hover:text-rose-deep">
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </Link>
  );
}
