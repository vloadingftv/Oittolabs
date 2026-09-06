import Link from "next/link";

import { Arrow, Chip } from "@/components/primitives";
import type { Transaction } from "@/content/transactions";
import { cx } from "@/lib/utils";

export function TransactionCard({
  transaction,
  tone = "light",
}: {
  transaction: Transaction;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={`/transacoes/${transaction.slug}`}
      className={cx(
        "group flex h-full flex-col justify-between gap-8 border p-7 transition-colors duration-300 md:p-8",
        tone === "dark"
          ? "border-sand-100/12 hover:border-brass-400/50 hover:bg-sand-100/[0.03]"
          : "border-sand-200 bg-sand-50 hover:border-ink-900/30 hover:bg-white",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={tone === "dark" ? "dark" : "neutral"}>
            {transaction.sector}
          </Chip>
          <Chip tone="brass">{transaction.role}</Chip>
        </div>

        <h3
          className={cx(
            "mt-6 text-2xl leading-tight",
            tone === "dark" ? "text-sand-50" : "text-ink-900",
          )}
        >
          {transaction.company}
        </h3>

        <p
          className={cx(
            "mt-3 text-sm leading-relaxed",
            tone === "dark" ? "text-muted-invert" : "text-muted",
          )}
        >
          {transaction.headline}
        </p>
      </div>

      <div
        className={cx(
          "flex items-center justify-between border-t pt-5 text-[0.75rem] font-semibold uppercase tracking-[0.12em]",
          tone === "dark"
            ? "border-sand-100/12 text-muted-invert"
            : "border-sand-200 text-muted",
        )}
      >
        <span>{transaction.year}</span>
        <span className="inline-flex items-center gap-2 text-brass-600">
          Tombstone
          <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
