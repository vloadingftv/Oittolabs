import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/primitives";
import { method, services, stats, team } from "@/content/firm";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A Target — quem somos e como trabalhamos",
  description:
    "Boutique independente de fusões e aquisições no middle market brasileiro. Conheça o time, os serviços e o método de execução da Target Advisor.",
  alternates: { canonical: "/sobre" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="A Target"
        title={
          <>
            Independentes por escolha,
            <span className="italic text-brass-300"> seniores por método.</span>
          </>
        }
        lede="Não temos mesa de trading para alimentar nem produto para empurrar. Nosso único incentivo é a transação certa, no momento certo, para o sócio que nos contratou."
      />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-relaxed text-ink-800">
            <p>
              A Target Advisor nasceu em {site.foundedYear} para atender um
              empresário que os grandes bancos de investimento não atendem: o
              dono de uma empresa sólida, relevante no seu setor, mas cujo
              cheque não cabe no comitê de um bulge bracket.
            </p>
            <p>
              Em mais de quinze anos, assessoramos operações de venda, aquisição,
              captação e avaliação em uma dúzia de setores — da indústria à
              saúde, do agro à tecnologia. O padrão que se repete é sempre o
              mesmo: a empresa vale mais quando chega preparada ao mercado e
              quando há mais de um comprador interessado.
            </p>
            <p>
              Trabalhamos com poucos mandatos simultâneos por decisão. Quem
              conduz a primeira conversa é quem senta na mesa de negociação no
              último dia.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-px self-start bg-sand-200">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-sand-50 px-6 py-8">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl">
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

      <section className="border-y border-sand-200 bg-sand-100 py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Serviços</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            Quatro mandatos, um mesmo rigor de execução
          </h2>

          <ul className="mt-14 grid gap-px bg-sand-300 md:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.slug}
                id={service.slug}
                className="scroll-mt-32 bg-sand-100 p-8 md:p-10"
              >
                <h3 className="text-2xl">{service.name}</h3>
                <p className="mt-4 leading-relaxed text-sand-500">
                  {service.summary}
                </p>
                <ul className="mt-7 space-y-2.5 text-sm text-ink-800">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 block size-1 shrink-0 bg-brass-500"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Método</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            O caminho de um mandato
          </h2>

          <ol className="mt-14 grid gap-px bg-sand-200 md:grid-cols-4">
            {method.map((item) => (
              <li key={item.step} className="bg-sand-50 p-8">
                <span className="font-display text-3xl text-brass-500">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand-500">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100 py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow">Time</p>
          <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">
            Quem conduz o seu processo
          </h2>

          <ul className="mt-14 grid gap-px bg-sand-300 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <li key={person.name} className="bg-sand-100 p-8">
                <span
                  aria-hidden
                  className="flex size-16 items-center justify-center rounded-full border border-ink-900/15 font-display text-xl text-ink-800"
                >
                  {initials(person.name)}
                </span>
                <h3 className="mt-6 text-xl">{person.name}</h3>
                <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brass-600">
                  {person.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-sand-500">
                  {person.bio}
                </p>
                {person.linkedin ? (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-6 inline-block text-[0.75rem] font-semibold uppercase tracking-[0.12em]"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-start gap-6 border-t border-sand-300 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-ink-800">
              A primeira conversa é sob sigilo e sem compromisso.
            </p>
            <ButtonLink href="/contato">Falar com um sócio</ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "A Target", url: "/sobre" },
        ])}
      />
    </>
  );
}
