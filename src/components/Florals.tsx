const asset = (file: string) => `${import.meta.env.BASE_URL}florals/${file}`

type IconProps = {
  className?: string
}

export function IconRose({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 20c-2.6-1.4-4.8-3.6-5.6-6.4-.7-2.4.1-4.6 2-5.6 1.1 1.8 2.8 2.6 3.6 2.8.8-.2 2.5-1 3.6-2.8 1.9 1 2.7 3.2 2 5.6-.8 2.8-3 5-5.6 6.4Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M12 11.2c-.6-1.8-2.1-3.2-3.8-3.8 1.4-1.5 3.2-2.2 3.8-2.4.6.2 2.4.9 3.8 2.4-1.7.6-3.2 2-3.8 3.8Z"
        fill="#fff6f5"
        opacity="0.55"
      />
      <circle cx="12" cy="10.2" r="1.15" fill="#d4a07a" />
    </svg>
  )
}

export function IconBlossom({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <circle cx="12" cy="6.2" r="2.2" opacity="0.95" />
      <circle cx="17.4" cy="9.4" r="2.2" opacity="0.85" />
      <circle cx="16.4" cy="15.2" r="2.2" opacity="0.9" />
      <circle cx="7.6" cy="15.2" r="2.2" opacity="0.9" />
      <circle cx="6.6" cy="9.4" r="2.2" opacity="0.85" />
      <circle cx="12" cy="11.4" r="2" fill="#d4a07a" />
    </svg>
  )
}

export function IconLeaf({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M5 18.5c6.2-1.2 10.4-5 12.8-11.6-4.8 1-9.4 4.2-12.8 11.6Z" opacity="0.9" />
      <path d="M6.2 17.4c3.6-2.4 6.8-6 8.6-10.2" stroke="#fff6f5" strokeWidth="1.1" fill="none" />
    </svg>
  )
}

export function FloralDivider() {
  return (
    <span className="mx-auto mt-3 flex items-center justify-center gap-2 text-rose" aria-hidden="true">
      <IconLeaf className="h-3.5 w-3.5 text-sage" />
      <span className="h-px w-8 bg-gold/70" />
      <IconRose className="h-4 w-4 text-rose" />
      <span className="h-px w-8 bg-gold/70" />
      <IconBlossom className="h-3.5 w-3.5 text-rose-deep" />
    </span>
  )
}

export function FloralMark({ className = "h-8 w-8" }: IconProps) {
  return (
    <span className={`inline-flex items-center justify-center text-rose ${className}`} aria-hidden="true">
      <IconRose className="h-full w-full" />
    </span>
  )
}

type IllustrationProps = {
  name: "roses" | "sprig" | "corner"
  className?: string
  alt?: string
}

export function FloralIllustration({ name, className = "", alt = "" }: IllustrationProps) {
  return (
    <img
      src={asset(`${name}.png`)}
      alt={alt}
      className={className}
      draggable={false}
    />
  )
}
