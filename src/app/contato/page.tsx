import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { site, socialLabels } from "@/content/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com um sócio da Target Advisor. Primeira conversa sob sigilo e sem compromisso.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  const { address } = site.contact;

  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title={
          <>
            Uma conversa sob sigilo
            <span className="italic text-brass-300"> não custa nada.</span>
          </>
        }
        lede="Conte em que ponto está — vendendo, comprando, capitalizando ou só querendo entender quanto vale. Respondemos em até um dia útil."
      />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />

          <aside className="space-y-10">
            <div>
              <h2 className="text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.16em] text-sand-400">
                Canais diretos
              </h2>
              <ul className="mt-5 space-y-3 text-lg">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="link-underline"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.16em] text-sand-400">
                Escritório
              </h2>
              <address className="mt-5 not-italic leading-relaxed text-ink-800">
                {address.street}
                <br />
                {address.district} — {address.city}/{address.state}
                <br />
                {address.zip}
              </address>
            </div>

            <div>
              <h2 className="text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.16em] text-sand-400">
                Redes
              </h2>
              <ul className="mt-5 space-y-3">
                {Object.entries(site.social).map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {socialLabels[key as keyof typeof socialLabels]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-sand-200 bg-sand-100 p-7">
              <p className="font-display text-xl leading-snug">
                Antes de conversar, dá para se preparar.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-sand-500">
                Os vídeos da série <em>Target Explica</em> cobrem valuation,
                due diligence e o que um comprador olha primeiro.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: "/" },
          { name: "Contato", url: "/contato" },
        ])}
      />
    </>
  );
}
