import Link from "next/link";

import { HeroBackdrop } from "@/components/hero-backdrop";
import { PressCard } from "@/components/press-card";
import {
  ArrowLink,
  ButtonLink,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { RadarHeadline } from "@/components/radar-headline";
import { Reveal } from "@/components/reveal";
import { TransactionCard } from "@/components/transaction-card";
import { VideoCard } from "@/components/video-card";
import { clients, highlightedClients } from "@/content/clients";
import { method, services, stats } from "@/content/firm";
import { featuredPress } from "@/content/press";
import { site, socialLabels } from "@/content/site";
import { featuredTransactions, transactions } from "@/content/transactions";
import { featuredVideos } from "@/content/videos";
import { getRadarItems } from "@/lib/radar";
import { formatDateTime } from "@/lib/utils";

export const revalidate = 1800;

export default async function HomePage() {
  const { items, updatedAt } = await getRadarItems();
  const headlines = items.slice(0, 6);

  return (
    <>
      <Hero />
      <ClientStrip />
      <RadarSection headlines={headlines} updatedAt={updatedAt} />
      <TransactionsSection />
      <ServicesSection />
      <PressSection />
      <VideoSection />
      <ClosingCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden -mt-[var(--header-h)] pt-[var(--header-h)]">
      <HeroBackdrop />

      <div className="shell relative z-10 py-24">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise text-sand-400">
            Fusões e aquisições · Middle market brasileiro
          </p>

          <h1 className="animate-rise mt-8 text-[2.5rem] leading-[1.04] text-sand-50 sm:text-6xl lg:text-[4.25rem]">
            A venda da sua empresa
            <br />
            <span className="italic text-brass-300">acontece uma vez.</span>
            <br />
            Nós fazemos isso desde 2010.
          </h1>

          <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-sand-300 [animation-delay:120ms]">
            Boutique independente de M&amp;A. Assessoramos empresários na venda,
            na compra e na capitalização de seus negócios — com os sócios na mesa
            do primeiro café ao closing.
          </p>

          <div className="animate-rise mt-11 flex flex-wrap gap-4 [animation-delay:200ms]">
            <ButtonLink href="/contato" tone="brass">
              Quero avaliar minha empresa
            </ButtonLink>
            <ButtonLink href="/transacoes" tone="light">
              Ver transações
            </ButtonLink>
          </div>
        </div>

        <dl className="animate-rise mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden border border-sand-100/12 bg-sand-100/12 md:grid-cols-4 [animation-delay:280ms]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-950/70 px-6 py-7 backdrop-blur-sm">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl text-sand-50">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sand-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* Logos logo abaixo da dobra: é o que dá credibilidade a quem chega do Google. */
function ClientStrip() {
  const marquee = [...highlightedClients, ...highlightedClients];

  return (
    <section className="border-b border-sand-200 bg-sand-100 py-14">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="eyebrow">Empresas que confiaram na Target</p>
          <ArrowLink href="/clientes" className="text-sand-500 hover:text-ink-900">
            Ver todos os {clients.length} clientes
          </ArrowLink>
        </div>
      </div>

      <div className="marquee-mask mt-10 overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-14 px-6">
          {marquee.map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              aria-hidden={index >= highlightedClients.length}
              className="shrink-0"
            >
              <span className="font-display text-xl whitespace-nowrap text-ink-800/55 transition-colors duration-300 hover:text-ink-900">
                {client.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* O compilador de manchetes — motor de tráfego recorrente do domínio. */
async function RadarSection({
  headlines,
  updatedAt,
}: {
  headlines: Awaited<ReturnType<typeof getRadarItems>>["items"];
  updatedAt: string;
}) {
  return (
    <Section tone="dark">
      <div className="shell">
        <SectionHeading
          tone="dark"
          eyebrow="Radar M&A"
          title={
            <>
              O mercado de fusões e aquisições
              <br />
              <span className="italic text-brass-300">compilado todo dia.</span>
            </>
          }
          lede="Reunimos as manchetes de M&A dos principais veículos do país em um só lugar. Clique e você vai direto para a matéria original — sem intermediários."
          action={
            <ArrowLink href="/radar" className="text-brass-300">
              Abrir o Radar completo
            </ArrowLink>
          }
        />

        <div className="mt-14">
          {headlines.map((item) => (
            <RadarHeadline key={item.id} item={item} tone="dark" compact />
          ))}
        </div>

        <p className="mt-8 text-xs text-sand-500">
          Atualizado automaticamente a cada 30 minutos ·{" "}
          {formatDateTime(updatedAt)}
        </p>
      </div>
    </Section>
  );
}

/* Transações como listagem clicável — sem linha do tempo com buracos. */
function TransactionsSection() {
  return (
    <Section>
      <div className="shell">
        <SectionHeading
          eyebrow="Transações"
          title="Operações assessoradas"
          lede="Cada empresa abre o tombstone da operação: o que era o negócio, quem comprou, como foi estruturado."
          action={
            <ArrowLink href="/transacoes">
              Ver as {transactions.length} transações
            </ArrowLink>
          }
        />

        <ul className="mt-14 grid gap-px bg-sand-200 md:grid-cols-3">
          {featuredTransactions.map((transaction, index) => (
            <Reveal as="li" key={transaction.slug} delay={index * 90}>
              <TransactionCard transaction={transaction} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function ServicesSection() {
  return (
    <Section tone="paper">
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Como trabalhamos"
            title="Processo competitivo, execução sênior"
            lede="Um mandato de M&A não se ganha no preço da proposta: se ganha no número de interessados que chegam à mesa e na disciplina de conduzir todos até o fim."
          />

          <ol className="mt-12 space-y-8">
            {method.map((item) => (
              <li key={item.step} className="flex gap-6">
                <span className="font-display text-2xl text-brass-500">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-xl">{item.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-sand-500">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="grid gap-px self-start bg-sand-300 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug} className="bg-sand-100 p-8">
              <h3 className="text-2xl">{service.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-sand-500">
                {service.summary}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-800">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden className="mt-2 block size-1 shrink-0 bg-brass-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function PressSection() {
  return (
    <Section>
      <div className="shell">
        <SectionHeading
          eyebrow="Na imprensa"
          title="O que dizem sobre a Target"
          lede="Todo registro de imprensa da casa, organizado por ano — do primeiro ao mais recente."
          action={<ArrowLink href="/imprensa">Ver todo o histórico</ArrowLink>}
        />

        <ul className="mt-14 grid gap-px bg-sand-200 md:grid-cols-3">
          {featuredPress.map((item, index) => (
            <Reveal as="li" key={item.id} delay={index * 90}>
              <PressCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function VideoSection() {
  const [lead, ...rest] = featuredVideos;
  if (!lead) return null;

  return (
    <Section tone="paper">
      <div className="shell">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Vídeos, análises e bastidores"
          lede="O canal do YouTube com uma casa: cada vídeo tem página própria, contexto e link — para o Google achar e para o LinkedIn e o Instagram apontarem."
          action={<ArrowLink href="/conteudo">Ver todo o conteúdo</ArrowLink>}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <VideoCard video={lead} featured />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((video) => (
              <li key={video.title}>
                <VideoCard video={video} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-sand-300 pt-8">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-500">
            Acompanhe a Target
          </span>
          {Object.entries(site.social).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium"
            >
              {socialLabels[key as keyof typeof socialLabels]}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <section className="bg-ink-950 py-24 text-sand-100 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow text-sand-400">Conversa confidencial</p>
          <h2 className="mt-6 max-w-2xl text-4xl leading-[1.08] text-sand-50 md:text-5xl">
            Não precisa estar decidido a vender
            <span className="italic text-brass-300"> para conversar.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand-400">
            A primeira conversa é sempre sob sigilo e sem compromisso. Se a hora
            não for agora, dizemos isso — e apontamos o que preparar até lá.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <ButtonLink href="/contato" tone="brass">
            Falar com um sócio
          </ButtonLink>
          <Link
            href={`mailto:${site.contact.email}`}
            className="text-center text-sm text-sand-400 hover:text-sand-100"
          >
            {site.contact.email}
          </Link>
        </div>
      </div>
    </section>
  );
}
