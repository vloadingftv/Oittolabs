import Link from "next/link";

import { Logo } from "@/components/logo";
import { Arrow } from "@/components/primitives";
import { primaryNav, site, socialLabels } from "@/content/site";
import { services } from "@/content/firm";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { address } = site.contact;

  return (
    <footer className="bg-ink-950 text-sand-300">
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-400">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {Object.entries(site.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-sand-300 hover:text-sand-50"
                >
                  {socialLabels[key as keyof typeof socialLabels]}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navegação">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contato" className="link-underline">
                Contato
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Serviços">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/sobre#${service.slug}`} className="link-underline">
                  {service.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contato">
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
            <li className="pt-2 text-sand-400">
              {address.street}
              <br />
              {address.district} — {address.city}/{address.state}
              <br />
              {address.zip}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 border-t border-sand-100/10 pt-8">
          <Link
            href="/radar"
            className="group flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-display text-2xl text-sand-100 md:text-3xl">
              Radar M&amp;A — as manchetes do mercado, todo dia
            </span>
            <Arrow className="size-5 text-brass-400 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-3 text-xs text-sand-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <p>
            As manchetes do Radar M&amp;A pertencem aos veículos de origem e são
            exibidas apenas como link para a fonte.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sand-500">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-sand-300">{children}</ul>
    </div>
  );
}
