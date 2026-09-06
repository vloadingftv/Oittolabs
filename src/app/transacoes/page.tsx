import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { TransactionBrowser } from "@/components/transaction-browser";
import { roles, sectors, transactions } from "@/content/transactions";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Transações assessoradas",
  description:
    "Operações de venda, compra, captação e valuation assessoradas pela Target Advisor. Navegue por setor e abra o tombstone de cada transação.",
  alternates: { canonical: "/transacoes" },
};

export default function TransactionsPage() {
  const years = transactions.map((t) => t.year);

  return (
    <>
      <PageHeader
        eyebrow="Transações"
        title={
          <>
            Cada operação tem
            <span className="italic text-brass-300"> um tombstone.</span>
          </>
        }
        lede="Navegue pelas empresas que assessoramos, filtre por setor ou por tipo de mandato e abra a ficha da transação para ver como o negócio foi estruturado."
        meta={
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-invert">
            <span>{transactions.length} operações</span>
            <span aria-hidden>·</span>
            <span>{sectors.length} setores</span>
            <span aria-hidden>·</span>
            <span>
              {Math.min(...years)}–{Math.max(...years)}
            </span>
          </div>
        }
      />

      <section className="py-16 md:py-20">
        <div className="shell">
          <TransactionBrowser
            transactions={transactions}
            sectors={sectors}
            roles={[...roles]}
          />
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Transações", url: "/transacoes" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Transações assessoradas pela Target Advisor",
          numberOfItems: transactions.length,
          itemListElement: transactions.map((t, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${t.company} — ${t.headline}`,
            url: `${site.url}/transacoes/${t.slug}`,
          })),
        }}
      />
    </>
  );
}
