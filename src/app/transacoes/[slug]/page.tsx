import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLink,
  ButtonLink,
  Chip,
  ExternalIcon,
} from "@/components/primitives";
import { TransactionCard } from "@/components/transaction-card";
import { site } from "@/content/site";
import {
  getTransaction,
  relatedTransactions,
  transactions,
} from "@/content/transactions";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return transactions.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const transaction = getTransaction(slug);
  if (!transaction) return { title: "Transação não encontrada" };

  const title = `${transaction.company} — ${transaction.role} ${transaction.year}`;
  return {
    title,
    description: transaction.headline,
    alternates: { canonical: `/transacoes/${transaction.slug}` },
    openGraph: {
      title: `${title} · ${site.name}`,
      description: transaction.headline,
      url: `${site.url}/transacoes/${transaction.slug}`,
      type: "article",
    },
  };
}

export default async function TransactionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const transaction = getTransaction(slug);
  if (!transaction) notFound();

  const related = relatedTransactions(transaction);

  return (
    <>
      {/* Tombstone — a "lápide" da operação */}
      <section className="-mt-[var(--header-h)] bg-ink-950 pb-20 pt-[calc(var(--header-h)+5rem)] text-sand-100 md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
        <div className="shell">
          <ArrowLink href="/transacoes" className="text-muted-invert">
            Todas as transações
          </ArrowLink>

          <div className="mt-12 border border-sand-100/15 bg-ink-900/60 p-10 md:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex flex-wrap justify-center gap-2">
                <Chip tone="dark">{transaction.sector}</Chip>
                <Chip tone="brassInvert">{transaction.role}</Chip>
                <Chip tone="dark">{transaction.year}</Chip>
              </div>

              <h1 className="mt-10 text-4xl leading-tight text-sand-50 md:text-5xl">
                {transaction.company}
              </h1>

              <p className="mt-6 text-sm leading-relaxed text-muted-invert">
                {transaction.companyDescription}
              </p>

              <div
                aria-hidden
                className="mx-auto my-10 h-px w-16 bg-brass-500"
              />

              <p className="font-display text-xl leading-relaxed text-sand-100 md:text-2xl">
                {transaction.headline}
              </p>

              <p className="mt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-invert">
                Contraparte
              </p>
              <p className="mt-2 text-lg text-sand-200">
                {transaction.counterparty}
              </p>

              <p className="mt-12 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-invert">
                A Target Advisor atuou como assessora financeira exclusiva
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl">Sobre a operação</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-800">
              {transaction.summary}
            </p>

            {transaction.pressUrl ? (
              <a
                href={transaction.pressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brass-600"
              >
                <span className="link-underline">
                  Ler a matéria sobre a transação
                </span>
                <ExternalIcon className="size-3.5" />
              </a>
            ) : null}
          </div>

          <aside>
            <h2 className="text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.16em] text-muted">
              Ficha da transação
            </h2>
            <dl className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
              <Fact label="Empresa assessorada" value={transaction.company} />
              <Fact label="Contraparte" value={transaction.counterparty} />
              <Fact label="Setor" value={transaction.sector} />
              <Fact label="Mandato" value={transaction.role} />
              <Fact label="Ano" value={String(transaction.year)} />
              <Fact label="Localização" value={transaction.region} />
              {transaction.facts?.map((fact) => (
                <Fact key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </dl>

            <div className="mt-10 border border-sand-200 bg-sand-100 p-7">
              <p className="font-display text-xl leading-snug">
                Sua empresa é do setor de {transaction.sector.toLowerCase()}?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Conversamos sob sigilo sobre o momento de mercado e o que um
                comprador olharia no seu negócio hoje.
              </p>
              <ButtonLink href="/contato" className="mt-6 w-full">
                Falar com a Target
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-sand-200 bg-sand-100 py-16 md:py-20">
          <div className="shell">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-2xl">Outras operações</h2>
              <Link
                href="/transacoes"
                className="link-underline text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted"
              >
                Ver todas
              </Link>
            </div>
            <ul className="mt-10 grid gap-px bg-sand-300 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <TransactionCard transaction={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Transações", url: "/transacoes" },
          {
            name: transaction.company,
            url: `/transacoes/${transaction.slug}`,
          },
        ])}
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="text-sm text-ink-900 sm:text-right">{value}</dd>
    </div>
  );
}
