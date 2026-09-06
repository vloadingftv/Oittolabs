"use client";

import { useEffect, useState } from "react";

import { shortDate, timeAgo } from "@/lib/utils";

/**
 * Data de publicação de uma manchete.
 *
 * A página do Radar é cacheada (ISR de 30 min), então um texto relativo
 * calculado durante a renderização divergiria do que o navegador calcula ao
 * hidratar — erro de hidratação garantido, e o React descarta a árvore.
 *
 * Solução: o primeiro render (servidor e cliente) usa a data absoluta, que é
 * idêntica dos dois lados; só depois da hidratação trocamos para o relativo,
 * que é mais legível. O atributo dateTime nunca muda.
 */
export function RelativeTime({
  iso,
  className,
}: {
  iso: string;
  className?: string;
}) {
  const [label, setLabel] = useState(() => shortDate(iso));

  useEffect(() => {
    setLabel(timeAgo(iso));
  }, [iso]);

  return (
    <time dateTime={iso} className={className}>
      {label}
    </time>
  );
}
