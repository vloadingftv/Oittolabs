import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    // O bloco escuro sobe por baixo do header fixo: sem isso, a marca clara
    // do header ficaria sobre o fundo claro da página e sumiria.
    <header className="relative isolate -mt-[var(--header-h)] overflow-hidden bg-ink-950 pb-20 pt-[calc(var(--header-h)+5rem)] text-sand-100 md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 85% 0%, rgba(184,134,59,0.22), transparent 55%), radial-gradient(90% 80% at 0% 100%, rgba(44,92,129,0.28), transparent 60%)",
        }}
      />
      <div className="shell">
        <p className="eyebrow text-muted-invert">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.06] text-sand-50 md:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-invert">
            {lede}
          </p>
        ) : null}
        {meta ? <div className="mt-10">{meta}</div> : null}
      </div>
    </header>
  );
}
