/**
 * A TARGET NA IMPRENSA
 *
 * ⚠️ DADOS DE EXEMPLO — trocar pelas matérias reais.
 *
 * Requisito da reunião de 03/09: dar visibilidade a TODAS as matérias em que a
 * Target foi citada, organizadas de forma que o visitante enxergue o histórico
 * de exposição na mídia ao longo do tempo.
 */

export type PressItem = {
  id: string;
  title: string;
  /** Veículo: Valor, Exame, NeoFeed, Estadão... */
  outlet: string;
  /** ISO date — usada para ordenar e agrupar por ano. */
  date: string;
  /** Link para a matéria original. Sempre externo. */
  url: string;
  /** Chamada curta / trecho citado. */
  excerpt?: string;
  /** Porta-voz citado na matéria. */
  spokesperson?: string;
  kind: "Matéria" | "Entrevista" | "Artigo" | "Podcast" | "TV";
  featured?: boolean;
};

export const press: PressItem[] = [
  {
    id: "p-2026-03",
    title: "Sucessão empresarial destrava nova onda de vendas no middle market",
    outlet: "NeoFeed",
    date: "2026-06-18",
    url: "https://neofeed.com.br/",
    excerpt:
      "Sócios de boutiques independentes relatam aumento na procura de empresas familiares que chegaram ao limite do crescimento orgânico.",
    spokesperson: "Douglas Carvalho Jr.",
    kind: "Matéria",
    featured: true,
  },
  {
    id: "p-2026-02",
    title: "O que muda no valuation de empresas com juros em queda",
    outlet: "Exame",
    date: "2026-04-02",
    url: "https://exame.com/",
    excerpt:
      "Especialistas explicam como o custo de capital reprecifica múltiplos no middle market brasileiro.",
    kind: "Entrevista",
    featured: true,
  },
  {
    id: "p-2026-01",
    title: "M&A no middle market cresce e desafia grandes bancos de investimento",
    outlet: "Valor Econômico",
    date: "2026-02-11",
    url: "https://valor.globo.com/",
    excerpt:
      "Boutiques especializadas ganham espaço em operações abaixo de R$ 500 milhões.",
    kind: "Matéria",
    featured: true,
  },
  {
    id: "p-2025-04",
    title: "Como preparar uma empresa familiar para ser vendida",
    outlet: "Estadão",
    date: "2025-11-05",
    url: "https://www.estadao.com.br/",
    excerpt:
      "Governança, contabilidade auditada e previsibilidade de resultado são os três pilares citados por assessores.",
    kind: "Artigo",
  },
  {
    id: "p-2025-03",
    title: "Consolidação em saúde reaquece o interesse por clínicas regionais",
    outlet: "Brazil Journal",
    date: "2025-08-21",
    url: "https://braziljournal.com/",
    kind: "Matéria",
  },
  {
    id: "p-2025-02",
    title: "Earn-out: por que a estrutura voltou à mesa de negociação",
    outlet: "InfoMoney",
    date: "2025-05-14",
    url: "https://www.infomoney.com.br/",
    kind: "Entrevista",
  },
  {
    id: "p-2025-01",
    title: "O funil de um processo de venda: de 60 interessados a um comprador",
    outlet: "Podcast Mercado & Companhia",
    date: "2025-03-07",
    url: "https://open.spotify.com/",
    kind: "Podcast",
  },
  {
    id: "p-2024-03",
    title: "Estrangeiros voltam a olhar o middle market industrial brasileiro",
    outlet: "Valor Econômico",
    date: "2024-10-09",
    url: "https://valor.globo.com/",
    kind: "Matéria",
  },
  {
    id: "p-2024-02",
    title: "Quanto vale a minha empresa? O que o dono precisa saber antes de negociar",
    outlet: "Pequenas Empresas & Grandes Negócios",
    date: "2024-06-25",
    url: "https://revistapegn.globo.com/",
    kind: "Entrevista",
  },
  {
    id: "p-2024-01",
    title: "Telecom lidera número de operações de M&A no país",
    outlet: "Telesíntese",
    date: "2024-02-19",
    url: "https://www.telesintese.com.br/",
    kind: "Matéria",
  },
  {
    id: "p-2023-02",
    title: "Due diligence: os cinco achados que mais derrubam preço",
    outlet: "Exame",
    date: "2023-09-12",
    url: "https://exame.com/",
    kind: "Artigo",
  },
  {
    id: "p-2023-01",
    title: "Boutiques de M&A ganham escala fora do eixo Rio–São Paulo",
    outlet: "Gazeta do Povo",
    date: "2023-04-27",
    url: "https://www.gazetadopovo.com.br/",
    kind: "Matéria",
  },
  {
    id: "p-2022-01",
    title: "A hora de vender: como identificar a janela certa de mercado",
    outlet: "TV Cultura — Jornal da Cultura",
    date: "2022-08-16",
    url: "https://tvcultura.com.br/",
    kind: "TV",
  },
];

export const pressSorted = [...press].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const featuredPress = pressSorted.filter((p) => p.featured).slice(0, 3);

export const pressOutlets = Array.from(
  new Set(press.map((p) => p.outlet)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

/** Agrupa por ano — usado na página /imprensa. */
export function pressByYear() {
  const map = new Map<number, PressItem[]>();
  for (const item of pressSorted) {
    const year = Number(item.date.slice(0, 4));
    map.set(year, [...(map.get(year) ?? []), item]);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}
