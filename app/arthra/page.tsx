import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, pageMetadata, therapist } from "@/lib/site";
import { articles } from "@/lib/articles";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Άρθρα για γονείς | Λογοθεραπεία Νέα Μηχανιώνα Θεσσαλονίκης",
  description:
    "Άρθρα για τα ορόσημα της ομιλίας, την επιλεκτική σίτιση, τον παιδικό τραυλισμό, τη διγλωσσία, την πρώτη επίσκεψη λογοθεραπείας και τι μπορούν να κάνουν οι γονείς στο σπίτι.",
  path: "/arthra",
});

const crumbs: Crumb[] = [{ label: "Άρθρα", href: "/arthra" }];

/** The archive, newest first. A date column, a title, a line — an index, not a magazine cover. */
export default function ArthraPage() {
  const items = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  const blog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Άρθρα — ${therapist.brand}`,
    url: `${SITE_URL}/arthra`,
    inLanguage: "el",
    author: { "@id": `${SITE_URL}/#therapist` },
    publisher: { "@id": `${SITE_URL}/#practice` },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/arthra/${a.slug}`,
      datePublished: a.date,
      description: a.excerpt,
    })),
  };

  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <JsonLd data={blog} />

        <PageHero
          index
          title="Άρθρα για γονείς"
          lead="Απαντήσεις στα ερωτήματα που ακούγονται συχνότερα στο τηλέφωνο, γραμμένες για να διαβάζονται το βράδυ, όταν το παιδί κοιμήθηκε και η ανησυχία έμεινε."
          crumbs={crumbs}
        />

        <section className="shell py-10 md:py-14">
          <ul className="max-w-[60rem] border-t border-line">
            {items.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/arthra/${a.slug}`}
                  className="row-link press-sm grid gap-2 border-b border-line py-5 transition-colors t-quick hover:bg-paper-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-ink-3 sm:pt-2">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span className="block normal-case tracking-normal">
                      {a.category} · {a.readingMinutes} λεπτά
                    </span>
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

        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
