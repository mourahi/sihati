export function Footer() {
  return (
    <footer className="mt-auto border-t border-sand/80 bg-sand/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-center md:px-6">
        <p className="font-brand text-[1.95rem] font-bold text-rose-deep">صحتي</p>
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
