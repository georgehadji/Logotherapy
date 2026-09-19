import { ogImage, size, contentType } from "@/lib/og";
import { services } from "@/lib/site";

export const alt = "Υπηρεσία — Λογοθεραπεία Νέα Μηχανιώνα";
export { size, contentType };
export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);

  return ogImage({
    eyebrow: "Υπηρεσίες",
    title: s?.title ?? "Υπηρεσίες",
    subtitle: s?.text,
  });
}
