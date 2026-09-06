"use client";

import { useMemo, useState } from "react";

import { ClientMark } from "@/components/client-mark";
import type { Client } from "@/content/clients";
import { cx } from "@/lib/utils";

/**
 * Mural completo de clientes. Renderiza TODOS os itens — sem paginação e sem
 * limitador (o problema relatado no site atual). O custo é baixo porque cada
 * selo é markup mínimo e imagens, quando existem, entram com lazy-load.
 */
export function ClientWall({
  clients,
  sectors,
}: {
  clients: Client[];
  sectors: string[];
}) {
  const [sector, setSector] = useState("Todos");

  const filtered = useMemo(
    () =>
      sector === "Todos"
        ? clients
        : clients.filter((c) => c.sector === sector),
    [clients, sector],
  );

  return (
    <div>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 border-b border-sand-200 pb-8">
        {["Todos", ...sectors].map((option) => {
          const active = option === sector;
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => setSector(option)}
                aria-pressed={active}
                className={cx(
                  "text-sm transition-colors",
                  active
                    ? "font-semibold text-ink-900 underline decoration-brass-500 decoration-2 underline-offset-[6px]"
                    : "text-sand-500 hover:text-ink-900",
                )}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="pt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {filtered.length} {filtered.length === 1 ? "empresa" : "empresas"}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-px bg-sand-200 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((client) => (
          <li key={`${client.name}-${client.sector}`}>
            <ClientMark client={client} />
          </li>
        ))}
      </ul>
    </div>
  );
}
