import type { MetadataRoute } from "next";

import { site, primaryNav } from "@/content/site";
import { transactions } from "@/content/transactions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...primaryNav.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified: now,
      changeFrequency:
        item.href === "/radar" ? ("daily" as const) : ("monthly" as const),
      priority: item.href === "/radar" ? 0.9 : 0.7,
    })),
    {
      url: `${site.url}/contato`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const dealRoutes: MetadataRoute.Sitemap = transactions.map((t) => ({
    url: `${site.url}/transacoes/${t.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...dealRoutes];
}
