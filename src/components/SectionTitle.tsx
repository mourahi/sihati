type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 font-sans text-sm font-medium tracking-wide text-rose">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold leading-relaxed text-ink md:text-[2.35rem]">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-4 block h-px w-16 bg-gold/70"
      />
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
