import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import { IconBlossom, IconRose } from "./Florals";

type FoodCardProps = {
  id: string;
  title: string;
  category: string;
  summary: string;
  href: string;
  imageUrl: string;
  youtubeId: string;
};

const GOLD_HINTS = ["حلو", "مشروب", "شاي", "قهوة", "عسل", "تمر"];

function categoryTone(category: string): "sage" | "gold" {
  return GOLD_HINTS.some((hint) => category.includes(hint)) ? "gold" : "sage";
}

export function FoodCard({
  id,
  title,
  category,
  summary,
  href,
  imageUrl,
  youtubeId,
}: FoodCardProps) {
  const photo = imageUrl || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <Link
      id={id}
      to={href}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-sand bg-paper/70 shadow-[0_8px_30px_rgba(44,36,32,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(44,36,32,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img
          src={photo}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink/10 transition group-hover:bg-ink/20"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose text-cream shadow-[0_8px_24px_rgba(224,122,144,0.45)]"
        >
          <svg viewBox="0 0 24 24" className="ms-0.5 h-5 w-5 fill-current" aria-hidden="true">
            <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
          </svg>
        </span>
        <Badge tone={categoryTone(category)} className="absolute bottom-3 start-3 bg-cream/90">
          {category}
        </Badge>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-3 end-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cream/85 text-rose"
        >
          <IconRose className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="inline-flex items-center gap-1.5 font-display text-xl font-bold text-ink group-hover:text-rose-deep">
          <IconBlossom className="h-3.5 w-3.5 shrink-0 text-rose" />
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
        <span className="mt-4 inline-flex w-fit items-center rounded-[1.5rem] bg-rose px-4 py-2 text-sm font-semibold text-cream">
          شاهدي الوصفة
        </span>
      </div>
    </Link>
  );
}
