import Link from "next/link";

export type Crumb = { label: string; href: string };

/**
 * Opener for the inner pages: the trail, the title, an optional running line
 * beneath it, and a lede at reading width.
 *
 * Index pages (`index`) are quieter, but not silent: they set the title at the
 * section-h2 anchor rather than the h1 one. A list page's rows are already
 * display type at `text-xl md:text-2xl`, so a title below that size is
 * outranked by its own contents.
 */
export default function PageHero({
  title,
  lead,
  dateline,
  crumbs = [],
  index = false,
}: {
  title: React.ReactNode;
  lead?: string;
  dateline?: React.ReactNode;
  crumbs?: Crumb[];
  index?: boolean;
}) {
  return (
    <header className="shell pt-10 md:pt-14">
      <div className="max-w-[65ch]">
        {crumbs.length > 0 && (
          <nav aria-label="Διαδρομή">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-ink-3">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center transition-colors t-quick hover:text-accent">
                  Αρχική
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {i === crumbs.length - 1 ? (
                    <span className="text-ink-2" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="inline-flex min-h-11 items-center transition-colors t-quick hover:text-accent">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {index ? (
          <h1 className="display mt-4 text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">{title}</h1>
        ) : (
          <h1 className="display display-hero mt-4 text-[clamp(2.1rem,3.6vw+0.5rem,3.6rem)]">{title}</h1>
        )}

        {dateline && <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink-3">{dateline}</p>}

        {lead && (
          <p
            className={`mt-6 text-ink-2 ${
              index ? "text-lg leading-relaxed" : "text-[clamp(1.15rem,1.1vw+0.9rem,1.4rem)] leading-[1.55]"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}

/** BreadcrumbList JSON-LD; `crumbs` must be the same list the UI renders. */
export function breadcrumbJsonLd(crumbs: Crumb[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Αρχική", href: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${baseUrl}${c.href === "/" ? "" : c.href}`,
    })),
  };
}
