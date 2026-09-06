import Link from "next/link";

import { ButtonLink } from "@/components/primitives";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="-mt-[var(--header-h)] bg-ink-950 pb-40 pt-[calc(var(--header-h)+8rem)] text-sand-100">
      <div className="shell">
        <p className="eyebrow text-sand-400">Erro 404</p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-tight text-sand-50 md:text-6xl">
          Esta página não existe
          <span className="italic text-brass-300"> — ou já mudou de lugar.</span>
        </h1>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" tone="brass">
            Voltar para a home
          </ButtonLink>
          <ButtonLink href="/radar" tone="light">
            Abrir o Radar M&amp;A
          </ButtonLink>
        </div>

        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-sand-100/10 pt-8">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-underline text-sm text-sand-400 hover:text-sand-50"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
