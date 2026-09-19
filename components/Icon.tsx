/**
 * The handful of icons the site needs, drawn inline (1.5 stroke). Inline SVG
 * inherits `currentColor`, so every icon follows the text it sits next to.
 */
type Props = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" />
    </svg>
  );
}

export function MapPinIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/** Arrow out of a box: the link leaves the site. */
export function ExternalIcon({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17L17 7M17 7H8m9 0v9" />
    </svg>
  );
}

/**
 * The practice's own mark, at the sizes the wordmark and the footer use.
 *
 * Not an icon, and nothing here is drawn: the full logo is a hairline profile
 * whose stroke disappears below about 40px, so the small lockup takes the
 * three petals from it — the one part of the mark that still reads at 20px.
 * The file is the logo's own pixels, cropped, with its white field keyed to
 * alpha. The whole mark keeps the hero plate, where it has the room it needs.
 */
export function MarkIcon({ className }: Props) {
  return (
    <img
      src="/images/logo-petals.png"
      alt=""
      aria-hidden
      width={96}
      height={96}
      decoding="async"
      className={className}
    />
  );
}
