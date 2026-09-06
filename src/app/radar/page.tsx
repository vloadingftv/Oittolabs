import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { RadarBrowser } from "@/components/radar-browser";
import { Chip } from "@/components/primitives";
import { JsonLd } from "@/lib/seo";
import {
  getRadarItems,
  radarSectors,
  radarSources,
} from "@/lib/radar";
import { sources } from "@/lib/radar/sources";
import { site } from "@/content/site";
import { formatDateTime } from "@/lib/utils";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Radar M&A — as manchetes de fusões e aquisições, todo dia",
  description:
    "Compilado diário das notícias de fusões e aquisições no Brasil. Manchetes dos principais veículos, com link direto para a matéria original.",
  alternates: { canonical: "/radar" },
  openGraph: {
    title: "Radar M&A · Target Advisor",
    description:
      "Compilado diário das notícias de fusões e aquisições no Brasil, com link para a fonte original.",
    url: `${site.url}/radar`,
  },
};

export default async function RadarPage() {
  const { items, updatedAt, degraded } = await getRadarItems();
  const sectors = radarSectors(items);
  const outlets = radarSources(items);

  return (
    <>
      <PageHeader
        eyebrow="Radar M&A"
        title={
          <>
            Tudo o que o mercado de M&amp;A publicou{" "}
            <span className="italic text-brass-300">nos últimos dias.</span>
          </>
        }
        lede="Compilamos as manchetes de fusões e aquisições dos principais veículos do país. Nada é hospedado aqui: você clica e vai direto para a matéria original, no site de quem publicou."
        meta={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-invert">
            <span>{items.length} manchetes</span>
            <span aria-hidden>·</span>
            <span>{sources.length} fontes monitoradas</span>
            <span aria-hidden>·</span>
            <span>Atualizado {formatDateTime(updatedAt)}</span>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="shell">
          {degraded ? (
            <p className="mb-8 border border-brass-400/50 bg-brass-300/10 px-5 py-4 text-sm text-ink-800">
              Algumas fontes não responderam nesta atualização. A lista abaixo
              pode estar incompleta e se completa sozinha na próxima carga.
            </p>
          ) : null}

          <RadarBrowser items={items} sectors={sectors} sources={outlets} />

          <div className="mt-20 border-t border-sand-200 pt-10">
            <h2 className="text-2xl">Fontes monitoradas</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              O Radar lê os feeds públicos abaixo, filtra o que é pauta de
              fusões, aquisições e capitalização, remove manchetes repetidas e
              ordena por data. Os direitos de cada matéria são do veículo de
              origem.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {Array.from(new Set(sources.map((s) => s.name))).map((name) => (
                <li key={name}>
                  <Chip>{name}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Radar M&A",
          url: `${site.url}/radar`,
          description:
            "Compilado diário das notícias de fusões e aquisições no Brasil.",
          isPartOf: { "@id": `${site.url}/#organization` },
          dateModified: updatedAt,
        }}
      />
    </>
  );
}
