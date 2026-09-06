"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Entrada suave ao rolar.
 *
 * Duas regras de segurança:
 *
 * 1. O conteúdo NUNCA pode ficar escondido por causa da animação. O HTML sai
 *    visível; só escondemos depois de confirmar, no navegador, que existe
 *    IntersectionObserver. Sem JS, sem observer, ou em impressão e leitores,
 *    o conteúdo simplesmente aparece.
 * 2. Há um prazo de segurança: se o observer não disparar em 2,5 s (aba em
 *    segundo plano, captura de tela), revelamos assim mesmo.
 *
 * A visibilidade é aplicada direto no nó, sem estado de React: escondê-la via
 * estado exigiria um setState dentro do efeito, o que provoca renderização em
 * cascata e ainda deixaria um quadro visível antes de sumir.
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

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    node.style.opacity = "0";

    const reveal = () => {
      node.style.opacity = "";
      if (delay) node.style.animationDelay = `${delay}ms`;
      node.classList.add("animate-rise");
      stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      // Margem generosa: revela um pouco antes de entrar na tela.
      { rootMargin: "160px 0px -5% 0px", threshold: 0 },
    );

    const timer = window.setTimeout(reveal, 2500);

    function stop() {
      observer.disconnect();
      window.clearTimeout(timer);
    }

    observer.observe(node);

    return () => {
      stop();
      node.style.opacity = "";
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
