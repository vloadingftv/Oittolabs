export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const DATE_FMT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

const DATETIME_FMT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

export function formatDate(iso: string) {
  return DATE_FMT.format(new Date(iso)).replace(/\.$/, "");
}

export function formatDateTime(iso: string) {
  return DATETIME_FMT.format(new Date(iso));
}

const SHORT_FMT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  timeZone: "America/Sao_Paulo",
});

const SHORT_YEAR_FMT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/**
 * Data curta e ESTÁVEL: não depende de "agora", então servidor e cliente
 * chegam sempre ao mesmo texto. É o valor inicial de <RelativeTime>.
 */
export function shortDate(iso: string) {
  const date = new Date(iso);
  const sameYear = date.getUTCFullYear() === new Date().getUTCFullYear();
  const fmt = sameYear ? SHORT_FMT : SHORT_YEAR_FMT;
  return fmt.format(date).replace(/\./g, "");
}

/**
 * "há 3 h", "há 2 dias".
 *
 * Depende do relógio do momento, então NUNCA deve ser renderizado direto no
 * HTML de uma página cacheada — use <RelativeTime>, que só troca o texto
 * depois da hidratação.
 */
export function timeAgo(iso: string, now: number = Date.now()) {
  const diff = now - new Date(iso).valueOf();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  return formatDate(iso);
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
