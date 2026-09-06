import { ExternalIcon } from "@/components/primitives";
import type { RadarItem } from "@/lib/radar";
import { RelativeTime } from "@/components/relative-time";
import { cx, hostname } from "@/lib/utils";

/**
 * Uma manchete do Radar.
 *
 * O conteúdo vem de feeds externos: renderizamos sempre como texto (o React
 * escapa) e o link sai com rel="noopener noreferrer nofollow" + target _blank.
 * A Target não hospeda a matéria — só compila a manchete e leva à fonte.
 */
export function RadarHeadline({
  item,
  tone = "light",
  compact = false,
}: {
  item: RadarItem;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={cx(
        "group flex gap-5 border-b py-5 transition-colors duration-200",
        tone === "dark"
          ? "border-sand-100/10 hover:bg-sand-100/[0.03]"
          : "border-sand-200 hover:bg-sand-100/70",
      )}
    >
      <RelativeTime
        iso={item.publishedAt}
        className={cx(
          "hidden w-24 shrink-0 pt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] tabular-nums sm:block",
          tone === "dark" ? "text-sand-500" : "text-sand-400",
        )}
      />

      <div className="min-w-0 flex-1">
        <h3
          className={cx(
            "font-display leading-snug",
            compact ? "text-lg" : "text-lg md:text-xl",
            tone === "dark" ? "text-sand-50" : "text-ink-900",
          )}
        >
          <span className="link-underline">{item.title}</span>
        </h3>

        {!compact && item.excerpt ? (
          <p
            className={cx(
              "mt-2 line-clamp-2 text-sm leading-relaxed",
              tone === "dark" ? "text-sand-400" : "text-sand-500",
            )}
          >
            {item.excerpt}
          </p>
        ) : null}

        <div
          className={cx(
            "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
            tone === "dark" ? "text-sand-500" : "text-sand-400",
          )}
        >
          <span className={tone === "dark" ? "text-sand-300" : "text-ink-700"}>
            {item.source || hostname(item.url)}
          </span>
          <span aria-hidden>·</span>
          <span>{item.sector}</span>
          <span className="sm:hidden" aria-hidden>
            ·
          </span>
          <RelativeTime iso={item.publishedAt} className="sm:hidden" />
          {item.paywall ? (
            <>
              <span aria-hidden>·</span>
              <span className="text-brass-500">Assinantes</span>
            </>
          ) : null}
        </div>
      </div>

      <ExternalIcon
        className={cx(
          "mt-1.5 size-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          tone === "dark" ? "text-brass-400" : "text-brass-500",
        )}
      />
    </a>
  );
}
