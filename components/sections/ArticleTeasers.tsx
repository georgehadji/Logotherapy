import Link from "next/link";
import { articles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { ArrowRightIcon } from "@/components/Icon";

/** The three latest pieces, dated in the margin. The whole archive is on /arthra. */
export default function ArticleTeasers({ limit }: { limit?: number }) {
  const items = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit ?? articles.length);

  return (
    <section className="shell grid gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
      <div className="md:col-span-4 md:col-start-9">
        <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">Άρθρα για γονείς που ψάχνουν</h2>
        {/* Not the lede /arthra uses: two pages that open with the same
            sentence make the second one read as boilerplate. */}
        <p className="mt-5 leading-relaxed text-ink-2">
          Ό,τι δεν προλαβαίνει να ρωτηθεί στο πρώτο τηλεφώνημα, γραμμένο για να
          διαβαστεί με την ησυχία σας. Χωρίς διάγνωση από απόσταση και χωρίς
          υποσχέσεις.
        </p>
        <Link
          href="/arthra"
          className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
        >
          Όλα τα άρθρα
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <ul className="border-t border-line md:col-span-7 md:col-start-1 md:row-start-1">
        {items.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/arthra/${a.slug}`}
              className="row-link press-sm grid gap-2 border-b border-line py-5 transition-colors t-quick hover:bg-paper-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
            >
              <span className="text-xs uppercase tracking-[0.14em] text-ink-3 sm:pt-1.5">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span className="block normal-case tracking-normal">{a.readingMinutes} λεπτά</span>
              </span>
              <span>
                <span className="display block text-xl md:text-2xl">{a.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-2">{a.excerpt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
