import { ogImage, size, contentType } from "@/lib/og";
import { services } from "@/lib/site";

export const alt = "Υπηρεσίες λογοθεραπείας — Νέα Μηχανιώνα Θεσσαλονίκης";
export { size, contentType };
export const dynamic = "force-static";

export default function Image() {
  return ogImage({
    eyebrow: "Υπηρεσίες",
    title: "Υπηρεσίες λογοθεραπείας",
    subtitle: `${services.length} υπηρεσίες για βρέφη, παιδιά και εφήβους, από την πρώτη αξιολόγηση έως τη νευροαποκατάσταση.`,
  });
}
