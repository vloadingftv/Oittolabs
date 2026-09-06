"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/logo";
import { primaryNav, site } from "@/content/site";
import {
  getIsScrolled,
  getServerIsScrolled,
  subscribeToScroll,
} from "@/lib/browser-store";
import { cx } from "@/lib/utils";

/**
 * Toda página começa com um bloco escuro (hero da home ou PageHeader). Por isso
 * o header nasce transparente com tipografia clara e só troca para o fundo
 * claro depois que o usuário rola — sem isso a marca some sobre o hero.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lido direto da rolagem do navegador, sem estado espelhado: no servidor e
  // na hidratação vale `false`, que é o topo da página.
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getIsScrolled,
    getServerIsScrolled,
  );

  // Fecha o menu ao navegar. Ajuste durante a renderização — o padrão do React
  // para reagir a uma prop que mudou; num efeito seria um quadro com o menu
  // ainda aberto sobre a página nova.
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-sand-200 bg-sand-50/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} — página inicial`}>
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "link-underline text-[0.8125rem] font-medium tracking-[0.02em] transition-colors",
                      solid
                        ? active
                          ? "text-ink-900"
                          : "text-muted hover:text-ink-900"
                        : active
                          ? "text-sand-50"
                          : "text-sand-300 hover:text-sand-50",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contato"
            className={cx(
              "hidden rounded-xs px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors sm:inline-flex",
              solid
                ? "bg-ink-900 text-sand-50 hover:bg-ink-700"
                : "border border-sand-100/35 text-sand-50 hover:bg-sand-50 hover:text-ink-900",
            )}
          >
            Falar com a Target
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span className="relative block h-3 w-6">
              <span
                className={cx(
                  "absolute left-0 h-px w-full transition-[transform,top,background-color] duration-300",
                  solid ? "bg-ink-900" : "bg-sand-50",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cx(
                  "absolute left-0 h-px w-full transition-[transform,top,background-color] duration-300",
                  solid ? "bg-ink-900" : "bg-sand-50",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-sand-200 bg-sand-50 lg:hidden"
      >
        <nav aria-label="Menu" className="shell py-6">
          <ul className="divide-y divide-sand-200">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex flex-col gap-1 py-4">
                  <span className="font-display text-xl">{item.label}</span>
                  {item.description ? (
                    <span className="text-sm text-muted">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contato"
            className="mt-6 flex items-center justify-center rounded-xs bg-ink-900 px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-sand-50"
          >
            Falar com a Target
          </Link>
        </nav>
      </div>
    </header>
  );
}
