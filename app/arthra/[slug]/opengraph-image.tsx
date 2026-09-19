import { ogImage, size, contentType } from "@/lib/og";
import { articles } from "@/lib/articles";

export const alt = "Άρθρο — Λογοθεραπεία Νέα Μηχανιώνα";
export { size, contentType };
export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);

  return ogImage({
    eyebrow: a?.category ?? "Άρθρα",
    title: a?.title ?? "Άρθρα για γονείς",
    subtitle: a?.excerpt,
  });
}
