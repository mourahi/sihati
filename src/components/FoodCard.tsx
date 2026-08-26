import { Link } from "react-router-dom";
import { Badge } from "./Badge";

type FoodCardProps = {
  id: string;
  title: string;
  category: string;
  summary: string;
  href: string;
};

const GOLD_HINTS = ["حلو", "مشروب", "شاي", "قهوة", "عسل", "تمر"];

function categoryTone(category: string): "sage" | "gold" {
  return GOLD_HINTS.some((hint) => category.includes(hint)) ? "gold" : "sage";
}

export function FoodCard({ id, title, category, summary, href }: FoodCardProps) {
  return (
    <Link
      id={id}
      to={href}
      className="group flex flex-col rounded-[1.5rem] border border-sand bg-white/70 p-6 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <Badge tone={categoryTone(category)}>{category}</Badge>
      <h3 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-rose-deep">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
    </Link>
  );
}
