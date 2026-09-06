import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "paper" | "dark";
}) {
  const tones = {
    light: "bg-sand-50 text-ink-900",
    paper: "bg-sand-100 text-ink-900",
    dark: "bg-ink-950 text-sand-100",
  } as const;

  return (
    <section
      id={id}
      className={cx("py-20 md:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-6",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cx("eyebrow", tone === "dark" && "text-sand-400")}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-4 text-3xl leading-[1.1] md:text-[2.75rem]">
          {title}
        </h2>
        {lede ? (
          <p
            className={cx(
              "mt-5 text-base leading-relaxed md:text-lg",
              tone === "dark" ? "text-sand-300" : "text-sand-500",
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type ButtonTone = "solid" | "brass" | "outline" | "ghost" | "light";

const buttonTones: Record<ButtonTone, string> = {
  solid: "bg-ink-900 text-sand-50 hover:bg-ink-700",
  brass: "bg-brass-500 text-ink-950 hover:bg-brass-400",
  outline:
    "border border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50",
  ghost: "text-ink-900 hover:text-brass-600",
  light:
    "border border-sand-100/30 text-sand-50 hover:bg-sand-50 hover:text-ink-900",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200";

export function ButtonLink({
  href,
  children,
  tone = "solid",
  className,
  external,
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">) {
  const classes = cx(buttonBase, buttonTones[tone], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const classes = cx(
    "group inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em]",
    className,
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M1 8h13M9 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M6 3H3v10h10v-3M9.5 2.5H14v4.5M14 2.5 7.5 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brass" | "dark";
}) {
  const tones = {
    neutral: "border-sand-300 text-sand-500",
    brass: "border-brass-400/60 text-brass-600",
    dark: "border-sand-100/25 text-sand-300",
  } as const;

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-xs border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
