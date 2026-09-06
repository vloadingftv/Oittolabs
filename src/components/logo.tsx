import { cx } from "@/lib/utils";

/**
 * Marca da Target.
 * Substituir pelo SVG oficial quando disponível — o símbolo abaixo é um alvo
 * concêntrico com um corte, desenhado para funcionar em 20px de altura.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const ink = tone === "dark" ? "var(--color-ink-900)" : "var(--color-sand-50)";

  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="size-7 shrink-0"
        fill="none"
      >
        <circle cx="16" cy="16" r="14.5" stroke={ink} strokeWidth="1.4" />
        <circle
          cx="16"
          cy="16"
          r="8.5"
          stroke={ink}
          strokeWidth="1.4"
          strokeDasharray="40 13"
          strokeDashoffset="6"
        />
        <circle cx="16" cy="16" r="3" fill="var(--color-brass-500)" />
      </svg>
      <span
        className="font-display text-[1.0625rem] leading-none tracking-[-0.01em]"
        style={{ color: ink }}
      >
        Target
        <span className="ml-1.5 text-[0.6875rem] font-sans font-semibold uppercase tracking-[0.18em] opacity-60">
          Advisor
        </span>
      </span>
    </span>
  );
}
