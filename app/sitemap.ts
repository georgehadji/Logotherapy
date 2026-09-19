import type { MetadataRoute } from "next";
import { SITE_URL, services } from "@/lib/site";
import { articles } from "@/lib/articles";

export const dynamic = "force-static";

/**
 * Bump this when the site's static copy actually changes. Using the build clock
 * moves `lastmod` on every deploy even for pages that were untouched, which
 * search engines discount as noise.
 */
const CONTENT_UPDATED = new Date("2026-09-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = CONTENT_UPDATED;

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
      { url: `${SITE_URL}/logotherapeftria`, changeFrequency: "yearly", priority: 0.9 },
      { url: `${SITE_URL}/ypiresies`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE_URL}/to-kentro`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${SITE_URL}/arthra`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/epikoinonia`, changeFrequency: "yearly", priority: 0.9 },
      { url: `${SITE_URL}/politiki-aporritou`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${SITE_URL}/oroi-chrisis`, changeFrequency: "yearly", priority: 0.2 },
    ] as const
  ).map((p) => ({ ...p, lastModified: now }));

  return [
    ...staticPages,
    ...services.map((s) => ({
      url: `${SITE_URL}/ypiresies/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/arthra/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
