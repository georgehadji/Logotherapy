import { ogImage, size, contentType } from "@/lib/og";
import { location, therapist } from "@/lib/site";

export const alt = `${therapist.name} — ${therapist.title}, ${location.area} Θεσσαλονίκης`;
export { size, contentType };
// Required by output: "export" — the PNG is rendered once at build time.
export const dynamic = "force-static";

export default function Image() {
  return ogImage({
    eyebrow: `Λογοθεραπεία · ${location.area}`,
    title: therapist.name,
    subtitle:
      "Λογοθεραπεία και θεραπεία σίτισης για βρέφη, παιδιά και εφήβους. Αξιολόγηση, καθυστέρηση λόγου, άρθρωση, τραυλισμός, δυσφαγία, Bobath.",
  });
}
