import { FloralDivider, IconBlossom } from "./Florals";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 inline-flex items-center gap-1.5 font-sans text-sm font-medium tracking-wide text-rose">
          <IconBlossom className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[1.65rem] font-semibold leading-snug text-ink sm:text-3xl md:text-[2.35rem] md:leading-relaxed">
        {title}
      </h2>
      <FloralDivider />
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
