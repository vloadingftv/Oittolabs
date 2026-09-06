import type { Metadata } from "next";

import { ClientWall } from "@/components/client-wall";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/primitives";
import { clients, clientSectors } from "@/content/clients";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Clientes atendidos",
  description:
    "As empresas que confiaram na Target Advisor em processos de venda, aquisição, captação e valuation ao longo de mais de 15 anos.",
  alternates: { canonical: "/clientes" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clientes"
        title={
          <>
            Quem já sentou
            <span className="italic text-brass-300"> desse lado da mesa.</span>
          </>
        }
        lede="Indústria, saúde, tecnologia, varejo, infraestrutura. Empresas de portes e regiões diferentes, com um ponto em comum: o dono só faz isso uma vez."
        meta={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-invert">
            <span>{clients.length} empresas</span>
            <span aria-hidden>·</span>
            <span>{clientSectors.length} setores</span>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="shell">
          <ClientWall clients={clients} sectors={clientSectors} />

          <div className="mt-20 flex flex-col items-start gap-6 border-t border-sand-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-ink-800">
              Empresas com logo clicável levam ao tombstone da operação.
              As demais são mandatos sob confidencialidade.
            </p>
            <ButtonLink href="/contato" tone="outline">
              Quero ser o próximo
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Clientes", url: "/clientes" },
        ])}
      />
    </>
  );
}
