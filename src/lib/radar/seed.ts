import type { RadarItem } from "./index";

/**
 * Fallback do Radar.
 *
 * Só aparece se TODAS as fontes falharem (rede fora, feed derrubado). Mantém a
 * página publicável e o layout íntegro em vez de mostrar um erro ao visitante.
 * Não precisa ser atualizado à mão: em operação normal nunca é exibido.
 */
export const radarSeed: RadarItem[] = [
  {
    id: "seed:1",
    title: "Radar M&A temporariamente indisponível",
    url: "https://fusoesaquisicoes.com/",
    source: "Target Advisor",
    publishedAt: new Date().toISOString(),
    excerpt:
      "Não foi possível consultar as fontes de notícias agora. As manchetes voltam automaticamente na próxima atualização.",
    sector: "Multissetorial",
    paywall: false,
  },
];
