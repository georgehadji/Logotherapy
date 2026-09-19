import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero, { breadcrumbJsonLd, type Crumb } from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactBlock from "@/components/sections/ContactBlock";
import { SITE_URL, services, therapist } from "@/lib/site";
import { articles, type Block } from "@/lib/articles";
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

  const idx = articles.findIndex((x) => x.slug === slug);
  const next = articles[(idx + 1) % articles.length];
  const related = services.filter((s) => a.related.includes(s.slug));

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
            {a.body.map((b, i) => (
              <Prose key={i} block={b} />
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

            <p className="text-base">
              Επόμενο άρθρο:{" "}
              <Link href={`/arthra/${next.slug}`} className={inlineLink}>
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

function Prose({ block }: { block: Block }) {
  switch (block.t) {
    case "h":
      return <h2 className="head-inline">{block.text}</h2>;
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
