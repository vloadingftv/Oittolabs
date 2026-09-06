import Image from "next/image";
import Link from "next/link";

import type { Client } from "@/content/clients";
import { cx } from "@/lib/utils";

/**
 * Selo de cliente para o mural de logotipos.
 *
 * Requisito da reunião: os logotipos são o principal fator de credibilidade
 * para quem chega pelo Google — precisam aparecer mais e sem limitador. Este
 * componente é leve o bastante para renderizar centenas de itens: com logo,
 * usa next/image com lazy-load; sem logo, um selo tipográfico.
 */
export function ClientMark({
  client,
  tone = "light",
}: {
  client: Client;
  tone?: "light" | "dark";
}) {
  const body = client.logo ? (
    <Image
      src={client.logo}
      alt={client.name}
      width={180}
      height={64}
      loading="lazy"
      className={cx(
        "max-h-12 w-auto object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100",
        tone === "dark" && "invert",
      )}
    />
  ) : (
    <span className="text-center">
      <span
        className={cx(
          "block font-display text-[1.0625rem] leading-tight tracking-[-0.01em]",
          tone === "dark" ? "text-sand-100" : "text-ink-800",
        )}
      >
        {client.name}
      </span>
      <span
        className={cx(
          "mt-1.5 block text-[0.625rem] font-semibold uppercase tracking-[0.14em]",
          tone === "dark" ? "text-muted-invert" : "text-muted",
        )}
      >
        {client.sector}
      </span>
    </span>
  );

  const shell = cx(
    "group flex min-h-[7.5rem] items-center justify-center px-5 py-7 transition-colors duration-300",
    tone === "dark"
      ? "border border-sand-100/10 hover:border-sand-100/30 hover:bg-sand-100/[0.04]"
      : "border border-sand-200 bg-sand-50 hover:border-ink-900/25 hover:bg-white",
  );

  if (client.transaction) {
    return (
      <Link
        href={`/transacoes/${client.transaction}`}
        className={shell}
        title={`Ver transação — ${client.name}`}
      >
        {body}
      </Link>
    );
  }

  return <div className={shell}>{body}</div>;
}
