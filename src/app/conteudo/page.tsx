import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/primitives";
import { VideoCard } from "@/components/video-card";
import { site } from "@/content/site";
import { videos, videosBySeries } from "@/content/videos";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conteúdo — vídeos e análises de M&A",
  description:
    "Vídeos, séries e análises da Target Advisor sobre venda de empresas, valuation e o mercado de fusões e aquisições no Brasil.",
  alternates: { canonical: "/conteudo" },
};

const channels = [
  {
    key: "youtube" as const,
    name: "YouTube",
    role: "Casa dos vídeos",
    text: "Séries completas e explicações longas. Cada vídeo tem página própria aqui no site — é assim que o Google encontra o conteúdo e que o canal deixa de depender de quem já conhece a Target.",
  },
  {
    key: "linkedin" as const,
    name: "LinkedIn",
    role: "Onde a audiência já está",
    text: "É o canal que performa. Cada post comenta uma manchete do Radar e leva para a página da Target — o tráfego volta para o domínio em vez de ficar na rede social.",
  },
  {
    key: "instagram" as const,
    name: "Instagram",
    role: "Cortes e bastidores",
    text: "Recortes verticais dos mesmos vídeos, com o link na bio apontando para a página da série aqui no site.",
  },
];

export default function ContentPage() {
  const series = videosBySeries();

  return (
    <>
      <PageHeader
        eyebrow="Conteúdo"
        title={
          <>
            Vídeo que circula precisa de
            <span className="italic text-brass-300"> um endereço.</span>
          </>
        }
        lede="Cada vídeo publicado ganha aqui uma página com título, resumo e série. O LinkedIn e o Instagram apontam para cá, o Google indexa e o canal para de viver só de quem já conhece a Target."
        meta={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-invert">
            <span>{videos.length} vídeos</span>
            <span aria-hidden>·</span>
            <span>{series.length} séries</span>
          </div>
        }
      />

      <section className="py-16 md:py-24">
        <div className="shell space-y-20">
          {series.map((group) => (
            <div key={group.slug} id={group.slug}>
              <div className="flex flex-col gap-3 border-b border-sand-200 pb-8 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-3xl">{group.name}</h2>
                  <p className="mt-3 text-muted">{group.description}</p>
                </div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "episódio" : "episódios"}
                </span>
              </div>

              {group.items.length === 0 ? (
                <p className="py-12 text-muted">
                  Novos episódios em produção.
                </p>
              ) : (
                <ul className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((video) => (
                    <li key={`${video.youtubeId}-${video.title}`}>
                      <VideoCard video={video} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* A resposta à pergunta do Douglas: como conectar os canais ao site. */}
      <section className="border-t border-sand-200 bg-sand-100 py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Canais conectados</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            Um circuito só: rede social leva ao site, site leva ao vídeo,
            vídeo leva ao contato.
          </h2>

          <ul className="mt-14 grid gap-px bg-sand-300 md:grid-cols-3">
            {channels.map((channel) => (
              <li key={channel.key} className="flex flex-col bg-sand-100 p-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brass-600">
                  {channel.role}
                </p>
                <h3 className="mt-4 text-2xl">{channel.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {channel.text}
                </p>
                <a
                  href={site.social[channel.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-7 self-start text-[0.75rem] font-semibold uppercase tracking-[0.12em]"
                >
                  Seguir no {channel.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-col items-start gap-6 border-t border-sand-300 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-ink-800">
              Quer receber as manchetes do Radar M&amp;A e os novos vídeos?
              Fale com a gente e entramos em contato.
            </p>
            <ButtonLink href="/contato" tone="outline">
              Entrar em contato
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Conteúdo", url: "/conteudo" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Vídeos da Target Advisor",
          itemListElement: videos.map((video, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: video.title,
            url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
          })),
        }}
      />
    </>
  );
}
