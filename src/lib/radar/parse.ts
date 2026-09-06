/**
 * Parser mínimo de RSS 2.0 / Atom — sem dependências.
 * Feeds são conteúdo externo: nada aqui é interpretado como HTML, apenas texto.
 */

export type RawEntry = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  sourceName?: string;
};

/**
 * Entidades nomeadas. Cobre Latin-1 (essencial para feeds em português:
 * &ccedil;, &atilde;, &uacute;…) mais a pontuação tipográfica usual.
 */
const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  iexcl: "¡", cent: "¢", pound: "£", curren: "¤", yen: "¥",
  brvbar: "¦", sect: "§", uml: "¨", copy: "©", ordf: "ª",
  laquo: "«", not: "¬", shy: "\u00ad", reg: "®", macr: "¯",
  deg: "°", plusmn: "±", sup2: "²", sup3: "³", acute: "´",
  micro: "µ", para: "¶", middot: "·", cedil: "¸", sup1: "¹",
  ordm: "º", raquo: "»", frac14: "¼", frac12: "½", frac34: "¾",
  iquest: "¿",
  Agrave: "À", Aacute: "Á", Acirc: "Â", Atilde: "Ã", Auml: "Ä",
  Aring: "Å", AElig: "Æ", Ccedil: "Ç", Egrave: "È", Eacute: "É",
  Ecirc: "Ê", Euml: "Ë", Igrave: "Ì", Iacute: "Í", Icirc: "Î",
  Iuml: "Ï", ETH: "Ð", Ntilde: "Ñ", Ograve: "Ò", Oacute: "Ó",
  Ocirc: "Ô", Otilde: "Õ", Ouml: "Ö", times: "×", Oslash: "Ø",
  Ugrave: "Ù", Uacute: "Ú", Ucirc: "Û", Uuml: "Ü", Yacute: "Ý",
  THORN: "Þ", szlig: "ß",
  agrave: "à", aacute: "á", acirc: "â", atilde: "ã", auml: "ä",
  aring: "å", aelig: "æ", ccedil: "ç", egrave: "è", eacute: "é",
  ecirc: "ê", euml: "ë", igrave: "ì", iacute: "í", icirc: "î",
  iuml: "ï", eth: "ð", ntilde: "ñ", ograve: "ò", oacute: "ó",
  ocirc: "ô", otilde: "õ", ouml: "ö", divide: "÷", oslash: "ø",
  ugrave: "ù", uacute: "ú", ucirc: "û", uuml: "ü", yacute: "ý",
  thorn: "þ", yuml: "ÿ",
  ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", sbquo: "‚",
  ldquo: "“", rdquo: "”", bdquo: "„", dagger: "†", Dagger: "‡",
  bull: "•", hellip: "…", permil: "‰", lsaquo: "‹", rsaquo: "›",
  euro: "€", trade: "™", ensp: " ", emsp: " ", thinsp: " ",
};

/**
 * Decodifica entidades HTML uma única vez.
 * Chamada só depois que as tags já foram removidas — decodificar antes
 * reintroduziria "<" e ">" no texto.
 */
export function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-f]+|[a-z][a-z0-9]{1,31});/gi, (match, code: string) => {
    if (code[0] === "#") {
      const num =
        code[1] === "x" || code[1] === "X"
          ? Number.parseInt(code.slice(2), 16)
          : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(num) && num > 0 && num <= 0x10ffff
        ? String.fromCodePoint(num)
        : match;
    }
    return ENTITIES[code] ?? ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** Remove tags e normaliza espaços. Sempre aplicado a texto vindo de feed. */
export function toPlainText(input = ""): string {
  const withoutMarkup = input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ");

  return decodeEntities(withoutMarkup).replace(/\s+/g, " ").trim();
}

function tagContent(block: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  return m?.[1];
}

function atomLink(block: string): string | undefined {
  // <link rel="alternate" href="..."/> tem prioridade sobre outros rels.
  const links = [...block.matchAll(/<link\b([^>]*)\/?>/gi)].map((m) => m[1]);
  const withHref = links
    .map((attrs) => ({
      href: attrs.match(/href\s*=\s*["']([^"']+)["']/i)?.[1],
      rel: attrs.match(/rel\s*=\s*["']([^"']+)["']/i)?.[1] ?? "alternate",
    }))
    .filter((l): l is { href: string; rel: string } => Boolean(l.href));
  return (
    withHref.find((l) => l.rel === "alternate")?.href ?? withHref[0]?.href
  );
}

export function parseFeed(xml: string): RawEntry[] {
  const blocks = [
    ...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi),
  ].map((m) => m[0]);

  const entries: RawEntry[] = [];

  for (const block of blocks) {
    const title = toPlainText(tagContent(block, "title") ?? "");
    const link =
      toPlainText(tagContent(block, "link") ?? "") || atomLink(block) || "";
    if (!title || !link) continue;

    entries.push({
      title,
      link: link.trim(),
      pubDate:
        tagContent(block, "pubDate") ??
        tagContent(block, "published") ??
        tagContent(block, "updated") ??
        tagContent(block, "dc:date"),
      description: tagContent(block, "description") ?? tagContent(block, "summary"),
      sourceName: toPlainText(tagContent(block, "source") ?? "") || undefined,
    });
  }

  return entries;
}
