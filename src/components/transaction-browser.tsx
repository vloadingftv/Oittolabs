"use client";

import { useMemo, useState } from "react";

import { TransactionCard } from "@/components/transaction-card";
import type { Transaction } from "@/content/transactions";
import { cx } from "@/lib/utils";

/**
 * Listagem de transações navegável por setor e por tipo de mandato.
 *
 * Substitui a linha do tempo do site atual: a decisão da reunião de 03/09 é que
 * o eixo cronológico expõe os intervalos sem operação. Aqui o eixo é a empresa;
 * o ano vira um dado do card, não a estrutura da página.
 */
export function TransactionBrowser({
  transactions,
  sectors,
  roles,
}: {
  transactions: Transaction[];
  sectors: string[];
  roles: string[];
}) {
  const [sector, setSector] = useState("Todos");
  const [role, setRole] = useState("Todos");

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (sector === "Todos" || t.sector === sector) &&
          (role === "Todos" || t.role === role),
      ),
    [transactions, sector, role],
  );

  return (
    <div>
      <div className="space-y-5 border-b border-sand-200 pb-8">
        <FilterRow
          label="Setor"
          value={sector}
          onChange={setSector}
          options={["Todos", ...sectors]}
        />
        <FilterRow
          label="Mandato"
          value={role}
          onChange={setRole}
          options={["Todos", ...roles]}
        />
      </div>

      <p className="pt-8 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {filtered.length}{" "}
        {filtered.length === 1 ? "transação" : "transações"}
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sand-500">
          Nenhuma transação com esses filtros.
        </p>
      ) : (
        <ul className="mt-6 grid gap-px bg-sand-200 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((transaction) => (
            <li key={transaction.slug}>
              <TransactionCard transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="w-20 shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {label}
      </span>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <li key={option}>
              <button
                type="button"
                onClick={() => onChange(option)}
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
    </div>
  );
}
