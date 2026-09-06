import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PressCard } from "@/components/press-card";
import { Chip, ExternalIcon } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import {
  featuredPress,
  press,
  pressByYear,
  pressOutlets,
} from "@/content/press";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A Target na imprensa",
  description:
    "Matérias, entrevistas e artigos em que a Target Advisor foi citada — organizados por ano, com link para a publicação original.",
  alternates: { canonical: "/imprensa" },
};

export default function PressPage() {
  const byYear = pressByYear();
  const years = byYear.map(([year]) => year);

  return (
    <>
      <PageHeader
        eyebrow="Imprensa"
        title={
          <>
            O histórico de exposição da Target,
            <span className="italic text-brass-300"> ano a ano.</span>
          </>
        }
        lede="Todo registro de imprensa da casa em um só lugar. Cada item leva à matéria original no veículo que a publicou."
        meta={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-invert">
            <span>{press.length} registros</span>
            <span aria-hidden>·</span>
            <span>{pressOutlets.length} veículos</span>
            <span aria-hidden>·</span>
            <span>
              {Math.min(...years)}–{Math.max(...years)}
            </span>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="shell">
          <h2 className="eyebrow">Destaques</h2>
          <ul className="mt-8 grid gap-px bg-sand-200 md:grid-cols-3">
            {featuredPress.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 80}>
                <PressCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100 py-16 md:py-20">
        <div className="shell">
          <h2 className="eyebrow">Arquivo completo</h2>

          <div className="mt-10 space-y-16">
            {byYear.map(([year, items]) => (
              <div key={year}>
                <div className="flex items-baseline gap-6">
                  <h3 className="font-display text-4xl text-ink-900/50">
                    {year}
                  </h3>
                  <span className="h-px flex-1 bg-sand-300" />
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {items.length}{" "}
                    {items.length === 1 ? "registro" : "registros"}
                  </span>
                </div>

                <ul className="mt-4">
                  {items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-3 border-b border-sand-300 py-5 transition-colors hover:bg-sand-50 sm:flex-row sm:items-center sm:gap-8"
                      >
                        <time
                          dateTime={item.date}
                          className="w-28 shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] tabular-nums text-muted"
                        >
                          {formatDate(item.date)}
                        </time>

                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-lg leading-snug md:text-xl">
                            <span className="link-underline">{item.title}</span>
                          </span>
                          {item.spokesperson ? (
                            <span className="mt-1 block text-xs text-muted">
                              com {item.spokesperson}
                            </span>
                          ) : null}
                        </span>

                        <span className="flex shrink-0 items-center gap-3">
                          <Chip>{item.outlet}</Chip>
                          <ExternalIcon className="size-3.5 text-brass-600 opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-2xl text-sm leading-relaxed text-muted">
            É jornalista e procura fonte para uma pauta de fusões e aquisições?
            Escreva para{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline font-medium text-ink-900"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Imprensa", url: "/imprensa" },
        ])}
      />
    </>
  );
}
