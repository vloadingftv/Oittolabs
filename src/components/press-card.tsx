import { Chip, ExternalIcon } from "@/components/primitives";
import type { PressItem } from "@/content/press";
import { cx, formatDate } from "@/lib/utils";

export function PressCard({
  item,
  tone = "light",
}: {
  item: PressItem;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "group flex h-full flex-col justify-between gap-6 border p-7 transition-colors duration-300",
        tone === "dark"
          ? "border-sand-100/12 hover:border-brass-400/50 hover:bg-sand-100/[0.03]"
          : "border-sand-200 bg-sand-50 hover:border-ink-900/30 hover:bg-white",
      )}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={tone === "dark" ? "dark" : "neutral"}>{item.kind}</Chip>
          <span
            className={cx(
              "text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
              tone === "dark" ? "text-brass-400" : "text-brass-600",
            )}
          >
            {item.outlet}
          </span>
        </div>

        <h3
          className={cx(
            "mt-5 text-xl leading-snug",
            tone === "dark" ? "text-sand-50" : "text-ink-900",
          )}
        >
          <span className="link-underline">{item.title}</span>
        </h3>

        {item.excerpt ? (
          <p
            className={cx(
              "mt-3 text-sm leading-relaxed",
              tone === "dark" ? "text-muted-invert" : "text-muted",
            )}
          >
            {item.excerpt}
          </p>
        ) : null}
      </div>

      <div
        className={cx(
          "flex items-center justify-between border-t pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
          tone === "dark"
            ? "border-sand-100/12 text-muted-invert"
            : "border-sand-200 text-muted",
        )}
      >
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        <ExternalIcon className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </a>
  );
}
