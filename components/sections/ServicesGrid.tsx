import Link from "next/link";
import { services } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icon";

/**
 * Soft cards in two columns, each a door to one service. Cards, not rows: the
 * homepage already uses hairline rows for the credentials and the FAQ, and a
 * list of what a practice does should feel like something you can pick up.
 */
export default function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section id="ypiresies" className="shell py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <h2 className="display text-[clamp(1.75rem,2.5vw+0.5rem,2.75rem)]">
            Πού μπορούμε να βοηθήσουμε
          </h2>
          {/* Not the lede /ypiresies uses: the index page already says what a
              service page contains, and repeating it here wastes the one
              paragraph the homepage gets. */}
          <p className="mt-5 leading-relaxed text-ink-2">
            Βρέφη, παιδιά και έφηβοι· λόγος και άρθρωση, σίτιση και κατάποση,
            νευροαποκατάσταση. Διαλέξτε ό,τι μοιάζει πιο κοντά σε αυτό που ζείτε —
            η σελίδα του το εξηγεί χωρίς όρους που χρειάζονται μετάφραση.
          </p>
          {limit && (
            <Link
              href="/ypiresies"
              className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent link-line-on link-line"
            >
              Όλες οι υπηρεσίες
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </div>

        {/* No numerals: eight services are a set, not a sequence. The card is
            the link, so it carries no second "read more" affordance. */}
        <ul className="reveal grid gap-4 sm:grid-cols-2 md:col-span-8 md:gap-5">
          {items.map((s) => (
            <li key={s.slug} className="min-w-0">
              <Link href={`/ypiresies/${s.slug}`} className="card card-link group flex h-full flex-col p-5 md:p-6">
                <span className="display block text-lg leading-snug transition-colors t-quick group-hover:text-accent md:text-xl">
                  {s.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-2">{s.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
