"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cx } from "@/lib/utils";

/**
 * Entrada suave ao rolar.
 *
 * Regra de segurança: o conteúdo NUNCA pode ficar escondido por causa da
 * animação. Por isso (a) o estado inicial é visível — só escondemos depois de
 * confirmar que há IntersectionObserver, e (b) há um timeout que revela de
 * qualquer jeito caso o observer nunca dispare (aba em segundo plano, captura
 * de tela, leitor de conteúdo, impressão).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    setState("armed");

    const show = () => setState("shown");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      // Margem generosa: revela um pouco antes de entrar na tela.
      { rootMargin: "160px 0px -5% 0px", threshold: 0 },
    );

    observer.observe(node);

    // Rede de proteção — se nada disparar em 2,5 s, mostramos assim mesmo.
    const timer = window.setTimeout(() => {
      show();
      observer.disconnect();
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={state === "shown" && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cx(
        className,
        state === "armed" && "opacity-0",
        state === "shown" && "animate-rise",
      )}
    >
      {children}
    </Tag>
  );
}
