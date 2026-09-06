"use client";

import { useSyncExternalStore } from "react";

import {
  getClock,
  getServerClock,
  NO_CLOCK,
  subscribeToClock,
} from "@/lib/browser-store";
import { shortDate, timeAgo } from "@/lib/utils";

/**
 * Data de publicação de uma manchete.
 *
 * A página do Radar é cacheada (ISR de 30 min). Um texto relativo calculado
 * durante a renderização divergiria do que o navegador calcula ao hidratar —
 * e o React descartaria a árvore por divergência de hidratação.
 *
 * Então: no servidor e durante a hidratação vale o snapshot do servidor, que
 * não tem relógio e rende a data absoluta — idêntica dos dois lados. Depois da
 * hidratação entra o relógio compartilhado e o texto vira "há 2 h",
 * atualizando-se sozinho a cada minuto. O atributo dateTime nunca muda.
 */
export function RelativeTime({
  iso,
  className,
}: {
  iso: string;
  className?: string;
}) {
  const now = useSyncExternalStore(
    subscribeToClock,
    getClock,
    getServerClock,
  );

  return (
    <time dateTime={iso} className={className}>
      {now === NO_CLOCK ? shortDate(iso) : timeAgo(iso, now)}
    </time>
  );
}
