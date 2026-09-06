"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { RadarHeadline } from "@/components/radar-headline";
import type { RadarItem } from "@/lib/radar";
import { cx } from "@/lib/utils";

const PAGE = 25;

export function RadarBrowser({
  items,
  sectors,
  sources,
}: {
  items: RadarItem[];
  sectors: string[];
  sources: string[];
}) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("Todos");
  const [source, setSource] = useState<string>("Todas");
  const [visible, setVisible] = useState(PAGE);

  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (sector !== "Todos" && item.sector !== sector) return false;
      if (source !== "Todas" && item.source !== source) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.excerpt?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, deferredQuery, sector, source]);

  const shown = filtered.slice(0, visible);

  function reset<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setVisible(PAGE);
    };
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-sand-200 py-6 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative flex-1 lg:max-w-sm">
          <span className="sr-only">Buscar manchete</span>
          <SearchIcon className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-sand-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => reset(setQuery)(e.target.value)}
            placeholder="Buscar empresa, setor ou termo"
            className="w-full border-0 border-b border-sand-300 bg-transparent py-2.5 pl-7 text-sm outline-none placeholder:text-sand-400 focus:border-ink-900"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            label="Setor"
            value={sector}
            onChange={reset(setSector)}
            options={["Todos", ...sectors]}
          />
          <Select
            label="Fonte"
            value={source}
            onChange={reset(setSource)}
            options={["Todas", ...sources]}
          />
        </div>
      </div>

      <p className="pt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {filtered.length} {filtered.length === 1 ? "manchete" : "manchetes"}
        {sector !== "Todos" ? ` · ${sector}` : ""}
        {source !== "Todas" ? ` · ${source}` : ""}
      </p>

      {shown.length === 0 ? (
        <p className="border-t border-sand-200 py-16 text-center text-sand-500">
          Nenhuma manchete corresponde a esses filtros.
        </p>
      ) : (
        <div className="mt-2">
          {shown.map((item) => (
            <RadarHeadline key={item.id} item={item} />
          ))}
        </div>
      )}

      {visible < filtered.length ? (
        <div className="pt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex items-center rounded-xs border border-ink-900/25 px-7 py-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink-900 hover:text-sand-50"
          >
            Carregar mais
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Select({
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
    <label className="inline-flex items-center gap-2">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sand-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          "cursor-pointer border-b border-sand-300 bg-transparent py-2 pr-6 text-sm outline-none focus:border-ink-900",
          value !== options[0] && "font-semibold text-ink-900",
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
