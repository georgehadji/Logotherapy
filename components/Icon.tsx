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
 * The wordmark's mark: a rounded speech bubble with a single dot — a word on
 * its way. Filled, so it reads at 20px; the same shape is the favicon.
 */
export function MarkIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M12 3C6.9 3 3 6.5 3 11c0 2.4 1.1 4.5 2.9 6l-.8 3.4a.6.6 0 0 0 .9.7l3.8-2.3c.7.1 1.4.2 2.2.2 5.1 0 9-3.5 9-8s-3.9-8-9-8z"
      />
      <circle cx="12" cy="11" r="1.8" fill="var(--color-paper)" />
    </svg>
  );
}
