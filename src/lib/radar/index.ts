import "server-only";

import { parseFeed, toPlainText } from "./parse";
import {
  dealTerms,
  sectorRules,
  sources,
  type RadarSource,
} from "./sources";
import { radarSeed } from "./seed";

export type RadarItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  /** ISO string. */
  publishedAt: string;
  excerpt?: string;
  sector: string;
  paywall: boolean;
};

export const RADAR_REVALIDATE_SECONDS = 60 * 30; // 30 min

const MAX_AGE_DAYS = 21;
const FETCH_TIMEOUT_MS = 6000;

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const normalizedDealTerms = dealTerms.map(normalize);

function isDealHeadline(text: string) {
  const haystack = normalize(text);
  return normalizedDealTerms.some((term) => haystack.includes(term));
}

function classifySector(text: string): string {
  const haystack = normalize(text);
  for (const rule of sectorRules) {
    if (rule.terms.some((term) => haystack.includes(normalize(term)))) {
      return rule.sector;
    }
  }
  return "Multissetorial";
}

/**
 * Links do Google Notícias vêm embrulhados. Guardamos a URL como veio (o
 * redirecionamento funciona), mas extraímos o veículo real do título, que o
 * Google entrega no formato "Manchete - Veículo".
 */
function splitGoogleTitle(title: string) {
  const idx = title.lastIndexOf(" - ");
  if (idx > 20 && idx > title.length - 45) {
    return { title: title.slice(0, idx).trim(), outlet: title.slice(idx + 3).trim() };
  }
  return { title, outlet: undefined };
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Chave de deduplicação: manchetes iguais em veículos diferentes viram uma só. */
function dedupeKey(title: string) {
  return normalize(title)
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 8)
    .join(" ");
}

async function fetchSource(source: RadarSource): Promise<RadarItem[]> {
  const response = await fetch(source.feed, {
    headers: {
      "User-Agent": "TargetAdvisorRadar/1.0 (+https://www.targetadvisor.com.br)",
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    next: { revalidate: RADAR_REVALIDATE_SECONDS },
  });

  if (!response.ok) throw new Error(`${source.id}: HTTP ${response.status}`);

  const entries = parseFeed(await response.text());
  const items: RadarItem[] = [];

  for (const entry of entries) {
    const isGoogle = source.feed.includes("news.google.com");
    const { title, outlet } = isGoogle
      ? splitGoogleTitle(entry.title)
      : { title: entry.title, outlet: undefined };

    if (source.kind === "general" && !isDealHeadline(title)) continue;
    if (title.length < 15) continue;

    const published = entry.pubDate ? new Date(toPlainText(entry.pubDate)) : null;
    const publishedAt =
      published && !Number.isNaN(published.valueOf())
        ? published
        : new Date();

    const excerpt = entry.description
      ? toPlainText(entry.description).slice(0, 220)
      : undefined;

    items.push({
      id: `${source.id}:${entry.link}`,
      title,
      url: entry.link,
      source: outlet ?? entry.sourceName ?? source.name,
      publishedAt: publishedAt.toISOString(),
      excerpt: excerpt && excerpt.length > 40 ? excerpt : undefined,
      sector: classifySector(`${title} ${excerpt ?? ""}`),
      paywall: source.paywall ?? /valor\.globo|estadao|folha|oglobo/.test(hostOf(entry.link)),
    });
  }

  return items;
}

/**
 * Compila as manchetes de todas as fontes.
 * Nunca lança: se a rede falhar, cai no seed local para a página nunca quebrar.
 */
export async function getRadarItems(): Promise<{
  items: RadarItem[];
  updatedAt: string;
  degraded: boolean;
}> {
  const settled = await Promise.allSettled(sources.map(fetchSource));

  const collected = settled.flatMap((result) =>
    result.status === "fulfilled" ? result.value : [],
  );
  const failures = settled.filter((r) => r.status === "rejected").length;

  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const seen = new Set<string>();
  const items = collected
    .filter((item) => new Date(item.publishedAt).valueOf() >= cutoff)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((item) => {
      const key = dedupeKey(item.title);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 120);

  if (items.length === 0) {
    return {
      items: radarSeed,
      updatedAt: new Date().toISOString(),
      degraded: true,
    };
  }

  return {
    items,
    updatedAt: new Date().toISOString(),
    degraded: failures > sources.length / 2,
  };
}

export function radarSectors(items: RadarItem[]) {
  return Array.from(new Set(items.map((i) => i.sector))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

export function radarSources(items: RadarItem[]) {
  return Array.from(new Set(items.map((i) => i.source))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
