import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, serviceAreas, services, therapist } from "@/lib/site";
import { articles } from "@/lib/articles";
import { PhoneIcon } from "@/components/Icon";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};

  return {
    title: `${s.title} — Λογοθεραπεία Νέα Μηχανιώνα`,
    description: s.text,
    alternates: { canonical: `${SITE_URL}/ypiresies/${s.slug}` },
    openGraph: {
      type: "article",
      title: `${s.title} | ${therapist.brand}`,
      description: s.text,
    },
  };
}

const inlineLink = "font-semibold text-accent link-line-on link-line";

/** One reading column. The service is explained the way it is explained in the room: what, when, how. */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];
  const relatedArticles = articles.filter((a) => a.related.includes(s.slug));
  const crumbs: Crumb[] = [
    { label: "Υπηρεσίες", href: "/ypiresies" },
    { label: s.title, href: `/ypiresies/${s.slug}` },
  ];

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/ypiresies/${s.slug}#service`,
    name: s.title,
    description: s.text,
    url: `${SITE_URL}/ypiresies/${s.slug}`,
    serviceType: "Λογοθεραπεία",
    provider: { "@id": `${SITE_URL}/#practice` },
    areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
    audience: { "@type": "Audience", audienceType: "Γονείς βρεφών, παιδιών και εφήβων" },
  };

  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <JsonLd data={service} />

        <PageHero
          title={s.title}
          dateline={`Υπηρεσία ${s.n} από ${services.length} · Βρέφη, παιδιά, έφηβοι`}
          lead={s.intro}
          crumbs={crumbs}
        />

        <article className="shell py-10 md:py-14">
          <div className="max-w-[65ch] text-lg leading-[1.75] text-ink-2">
            <h2 className="head-inline">Τι περιλαμβάνει</h2>
            <ul className="mt-3 border-t border-line">
              {s.includes.map((item) => (
                <li key={item} className="border-b border-line py-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="head-inline mt-8">Πότε χρειάζεται</h2>
            <ul className="mt-3 border-t border-line">
              {s.whenNeeded.map((item) => (
                <li key={item} className="border-b border-line py-3 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="head-inline mt-8">Πώς δουλεύουμε</h2>
            <p className="mt-3">{s.approach}</p>

            <div className="note mt-10 flex flex-wrap items-center justify-between gap-4 px-5 py-5">
              <p className="text-base leading-relaxed text-ink">
                Αναγνωρίζετε το παιδί σας σε αυτή τη σελίδα; Ένα τηλεφώνημα αρκεί για να
                ξεκινήσουμε από την αξιολόγηση.
              </p>
              <a href={`tel:${therapist.phone}`} className="pill">
                <PhoneIcon className="size-4" />
                {therapist.phoneDisplay}
              </a>
            </div>

            <p className="mt-8 text-base leading-relaxed text-ink-3">
              Οι πληροφορίες αυτής της σελίδας έχουν ενημερωτικό χαρακτήρα και δεν
              υποκαθιστούν τη λογοθεραπευτική αξιολόγηση. Η παρέμβαση εξατομικεύεται σε
              κάθε παιδί.
            </p>

            {relatedArticles.length > 0 && (
              <p className="mt-10 border-t border-line pt-6 text-base">
                Διαβάστε επίσης:{" "}
                {relatedArticles.map((a, i) => (
                  <span key={a.slug}>
                    {i > 0 && " · "}
                    <Link href={`/arthra/${a.slug}`} className={inlineLink}>
                      {a.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            <p className={`${relatedArticles.length > 0 ? "mt-4" : "mt-10 border-t border-line pt-6"} text-base`}>
              Επόμενη υπηρεσία:{" "}
              <Link href={`/ypiresies/${next.slug}`} className={inlineLink}>
                {next.title} →
              </Link>
            </p>
          </div>
        </article>

        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}
