import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, pageMetadata, services } from "@/lib/site";
import { ArrowRightIcon } from "@/components/Icon";

export const metadata: Metadata = pageMetadata({
  title: "Υπηρεσίες Λογοθεραπείας | Νέα Μηχανιώνα Θεσσαλονίκης",
  description:
    "Αξιολόγηση λόγου και ομιλίας, καθυστέρηση λόγου, άρθρωση και φωνολογία, διαταραχές σίτισης και κατάποσης, νευροαποκατάσταση Bobath, αυτισμός και επικοινωνία, τραυλισμός, μαθησιακές δυσκολίες. Οκτώ υπηρεσίες για βρέφη, παιδιά και εφήβους.",
  path: "/ypiresies",
});

const crumbs: Crumb[] = [{ label: "Υπηρεσίες", href: "/ypiresies" }];

/** The page is the list: eight cards, one tap each. */
export default function YpiresiesPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Υπηρεσίες λογοθεραπείας",
    url: `${SITE_URL}/ypiresies`,
    inLanguage: "el",
    about: { "@id": `${SITE_URL}/#practice` },
    hasPart: services.map((s) => ({
      "@type": "WebPage",
      name: s.title,
      url: `${SITE_URL}/ypiresies/${s.slug}`,
      description: s.text,
    })),
  };

  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <JsonLd data={collection} />

        <PageHero
          index
          title="Υπηρεσίες για βρέφη, παιδιά και εφήβους"
          lead="Οκτώ υπηρεσίες, από την πρώτη αξιολόγηση έως τη νευροαποκατάσταση. Κάθε σελίδα εξηγεί τι περιλαμβάνει, πότε χρειάζεται και πώς δουλεύουμε, ώστε να ξέρετε τι να περιμένετε πριν καλέσετε."
          crumbs={crumbs}
        />

        <section className="shell py-10 md:py-14">
          <ol className="grid max-w-[64rem] gap-4 sm:grid-cols-2 md:gap-5">
            {services.map((s) => (
              <li key={s.slug} className="min-w-0">
                <Link href={`/ypiresies/${s.slug}`} className="card card-link group flex h-full flex-col p-5 md:p-6">
                  <span className="numeral text-xs font-semibold text-ink-3">{s.n}</span>
                  <span className="display mt-2 block text-lg leading-snug transition-colors t-quick group-hover:text-accent md:text-xl">
                    {s.title}
                  </span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-2">{s.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Περισσότερα
                    <ArrowRightIcon className="size-4 transition-transform t-base group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
