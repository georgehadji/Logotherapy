import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, services, therapist } from "@/lib/site";
import { articles, type Article, type Block } from "@/lib/articles";
import { formatDate } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};

  return {
    // No brand suffix: Greek article titles already run long.
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `${SITE_URL}/arthra/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      publishedTime: a.date,
      authors: [therapist.name],
    },
  };
}

const inlineLink = "font-semibold text-accent link-line-on link-line";

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const related = services.filter((s) => a.related.includes(s.slug));

  /*
   * Newest first, the order /arthra publishes, so the two pages agree on what
   * "next" means. No wrap-around: at either end of the archive the reader gets
   * one neighbour rather than being sent round the loop and told the oldest
   * piece is the newer one.
   */
  const ordered = [...articles].sort((x, y) => y.date.localeCompare(x.date));
  const idx = ordered.findIndex((x) => x.slug === slug);
  const more: { label: string; article: Article }[] = [];
  if (ordered[idx - 1]) more.push({ label: "Νεότερο άρθρο", article: ordered[idx - 1] });
  if (ordered[idx + 1]) more.push({ label: "Παλαιότερο άρθρο", article: ordered[idx + 1] });

  /* Every `h` block, keyed by its position in the body: the ids the section
     heads carry and the contents list points at are the same string. */
  const heads = a.body.flatMap((b, i) => (b.t === "h" ? [{ id: `t${i}`, text: b.text }] : []));

  const crumbs: Crumb[] = [
    { label: "Άρθρα", href: "/arthra" },
    { label: a.title, href: `/arthra/${a.slug}` },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    url: `${SITE_URL}/arthra/${a.slug}`,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "el",
    articleSection: a.category,
    wordCount: a.body.reduce(
      (n, b) => n + (b.t === "ul" ? b.items.join(" ").split(/\s+/).length : b.text.split(/\s+/).length),
      0
    ),
    author: { "@id": `${SITE_URL}/#therapist` },
    image: `${SITE_URL}/arthra/${a.slug}/opengraph-image.png`,
    publisher: { "@id": `${SITE_URL}/#practice` },
    audience: { "@type": "Audience", audienceType: "Γονείς βρεφών, παιδιών και εφήβων" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/arthra/${a.slug}` },
  };

  return (
    <>
      <Nav />
      <main id="main">
        <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />
        <JsonLd data={schema} />

        <PageHero
          title={a.title}
          dateline={
            <>
              {a.category} · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingMinutes} λεπτά
              ανάγνωσης · {therapist.name}
            </>
          }
          lead={a.excerpt}
          crumbs={crumbs}
        />

        <article className="shell py-10 md:py-14">
          <div className="max-w-[65ch] space-y-6 text-lg leading-[1.75] text-ink-2">
            {/* Three sections is the point where a reader wants to know the
                shape of the piece before committing seven minutes to it. */}
            {heads.length >= 3 && (
              <nav aria-label="Περιεχόμενα" className="note px-5 py-4">
                <p className="eyebrow">Τι θα διαβάσετε</p>
                <ol className="mt-3 space-y-1 text-base">
                  {heads.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="inline-block py-1 text-ink-2 transition-colors t-quick hover:text-accent link-line">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {a.body.map((b, i) => (
              <Prose key={i} block={b} id={`t${i}`} />
            ))}

            {related.length > 0 && (
              <p className="border-t border-line pt-6 text-base">
                Σχετικές υπηρεσίες:{" "}
                {related.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && " · "}
                    <Link href={`/ypiresies/${s.slug}`} className={inlineLink}>
                      {s.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            {more.length > 0 && (
              <nav aria-label="Περισσότερα άρθρα" className="border-t border-line">
                {more.map(({ label, article }) => (
                  <Link
                    key={article.slug}
                    href={`/arthra/${article.slug}`}
                    className="row-link press-sm group block border-b border-line py-4 transition-colors t-quick hover:bg-paper-2"
                  >
                    <span className="eyebrow block">{label}</span>
                    <span className="display mt-1.5 block text-lg transition-colors t-quick group-hover:text-accent md:text-xl">
                      {article.title}
                    </span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </article>

        <ContactBlock />
      </main>
      <Footer />
    </>
  );
}

function Prose({ block, id }: { block: Block; id: string }) {
  switch (block.t) {
    /*
     * Articles take the display face here, not the `.head-inline` label the
     * service and legal pages use. Those run to a handful of short sections
     * where a tracked phrase is enough; an article is six sections and seven
     * minutes, and a 13px label is not structure the eye can navigate by.
     * The size is the anchor the article rows and the FAQ questions already
     * use, so no new step enters the scale.
     */
    case "h":
      return (
        <h2 id={id} className="display scroll-mt-24 pt-5 text-xl text-ink md:text-2xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="border-t border-line">
          {block.items.map((item) => (
            <li key={item} className="border-b border-line py-3 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "note":
      return <p className="note px-5 py-4 text-base leading-relaxed">{block.text}</p>;
    default:
      return <p>{block.text}</p>;
  }
}
