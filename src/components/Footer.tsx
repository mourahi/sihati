import { FloralDivider, FloralIllustration, IconRose } from "./Florals";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto overflow-hidden border-t border-sand/80 bg-sand/40 pb-[env(safe-area-inset-bottom)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <FloralIllustration
          name="corner"
          alt=""
          className="absolute -end-10 -bottom-8 h-36 w-36 mix-blend-multiply opacity-30"
        />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center md:px-6">
        <p className="inline-flex items-center gap-2 font-brand text-[1.95rem] font-bold text-rose-deep">
          <IconRose className="h-6 w-6 text-rose" />
          صحتي
        </p>
        <FloralDivider />
        <p className="text-sm leading-relaxed text-ink">
          اعتني بجسدكِ بلطف، فهو بيتكِ الأول.
        </p>
        <p className="text-xs leading-relaxed text-muted">
          المحتويات إرشادية للوعي والعناية اليومية، وليست بديلاً عن استشارة طبية
          مختصّة.
        </p>
        <p className="text-xs text-muted">© 2026 صحتي</p>
      </div>
    </footer>
  );
}
