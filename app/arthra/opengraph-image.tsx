import { ogImage, size, contentType } from "@/lib/og";

export const alt = "Άρθρα για γονείς — Λογοθεραπεία Νέα Μηχανιώνα";
export { size, contentType };
export const dynamic = "force-static";

export default function Image() {
  return ogImage({
    eyebrow: "Άρθρα",
    title: "Άρθρα για γονείς",
    subtitle: "Ορόσημα ομιλίας, σίτιση, τραυλισμός, διγλωσσία, η πρώτη επίσκεψη και τι βοηθά στο σπίτι.",
  });
}
