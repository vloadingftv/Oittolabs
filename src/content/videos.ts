/**
 * CONTEÚDO EM VÍDEO (YouTube)
 *
 * ⚠️ DADOS DE EXEMPLO — trocar `youtubeId` pelos IDs reais do canal.
 *
 * Contexto da reunião de 03/09: o canal do YouTube não performa porque os
 * vídeos são publicados soltos, sem página de destino e sem contexto. Aqui cada
 * vídeo vira uma peça com título, resumo e série — indexável pelo Google e
 * linkável a partir do LinkedIn e do Instagram.
 *
 * O player usa fachada (thumbnail + play): o iframe do YouTube só carrega no
 * clique, então a página não paga o custo de performance de vários embeds.
 */

export type Video = {
  /** ID de 11 caracteres da URL do YouTube. */
  youtubeId: string;
  title: string;
  description: string;
  /** Série editorial — agrupa os vídeos na página. */
  series: string;
  /** ISO date de publicação. */
  date: string;
  /** Duração legível, ex.: "6:42". */
  duration?: string;
  featured?: boolean;
};

export const videoSeries = [
  {
    slug: "explica",
    name: "Target Explica",
    description:
      "Respostas curtas e diretas às perguntas que todo empresário faz antes de vender.",
  },
  {
    slug: "bastidores",
    name: "Bastidores de uma transação",
    description:
      "O passo a passo real de um processo de M&A, da preparação ao closing.",
  },
  {
    slug: "leitura-de-mercado",
    name: "Leitura de mercado",
    description:
      "O que os números do trimestre dizem sobre a janela de venda em cada setor.",
  },
] as const;

export const videos: Video[] = [
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Quanto vale a minha empresa?",
    description:
      "Os três métodos de avaliação usados na prática e por que o múltiplo do vizinho quase nunca serve para você.",
    series: "Target Explica",
    date: "2026-07-22",
    duration: "7:14",
    featured: true,
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Sell-side x buy-side: qual é o meu lado da mesa",
    description:
      "O que muda na estratégia, no preço e no cronograma quando você é quem vende — e quando é quem compra.",
    series: "Target Explica",
    date: "2026-06-10",
    duration: "5:58",
    featured: true,
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Due diligence: como se preparar antes de abrir os números",
    description:
      "A lista do que organizar seis meses antes de receber o primeiro pedido de informação.",
    series: "Bastidores de uma transação",
    date: "2026-05-06",
    duration: "9:31",
    featured: true,
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Earn-out sem armadilha: como estruturar o pagamento variável",
    description:
      "Métricas, prazos e governança do período de earn-out — e os erros que viram litígio.",
    series: "Bastidores de uma transação",
    date: "2026-04-01",
    duration: "8:05",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "O mapa do M&A brasileiro no trimestre",
    description:
      "Volume de operações, setores mais ativos e o comportamento dos compradores estrangeiros.",
    series: "Leitura de mercado",
    date: "2026-03-12",
    duration: "6:42",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Empresa familiar: sucessão ou venda?",
    description:
      "Como separar a decisão societária da decisão familiar antes de levar o negócio ao mercado.",
    series: "Target Explica",
    date: "2026-02-05",
    duration: "10:20",
  },
];

export const featuredVideos = videos.filter((v) => v.featured);

export function videosBySeries() {
  return videoSeries.map((s) => ({
    ...s,
    items: videos
      .filter((v) => v.series === s.name)
      .sort((a, b) => b.date.localeCompare(a.date)),
  }));
}
