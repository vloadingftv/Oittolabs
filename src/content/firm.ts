/**
 * INSTITUCIONAL — serviços, método, números e time.
 * ⚠️ Números e biografias são exemplos. Ajustar com os dados reais da Target.
 */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "venda-de-empresas",
    name: "Venda de empresas",
    summary:
      "Conduzimos o processo completo de venda — da preparação ao closing — com um processo competitivo que traz mais de um interessado à mesa.",
    bullets: [
      "Preparação e equity story",
      "Mapeamento e abordagem de compradores",
      "Coordenação da due diligence",
      "Negociação de SPA e acordo de sócios",
    ],
  },
  {
    slug: "aquisicoes",
    name: "Aquisições",
    summary:
      "Assessoramos compradores estratégicos e financeiros na originação e execução de aquisições no Brasil.",
    bullets: [
      "Tese de consolidação e mapa de alvos",
      "Abordagem confidencial",
      "Avaliação e estrutura de pagamento",
      "Suporte à integração pós-closing",
    ],
  },
  {
    slug: "captacao",
    name: "Captação de recursos",
    summary:
      "Estruturamos rodadas primárias e secundárias com fundos de private equity, venture capital e investidores estratégicos.",
    bullets: [
      "Material de captação e modelagem",
      "Lista qualificada de investidores",
      "Negociação de term sheet",
      "Estrutura societária e governança",
    ],
  },
  {
    slug: "valuation",
    name: "Valuation e fairness opinion",
    summary:
      "Avaliações econômico-financeiras para transações, reorganizações societárias, sucessão e disputas.",
    bullets: [
      "Fluxo de caixa descontado",
      "Múltiplos de mercado e de transações",
      "Laudos para uso societário",
      "Segunda opinião sobre propostas recebidas",
    ],
  },
];

export const method = [
  {
    step: "01",
    name: "Diagnóstico",
    text: "Entendemos o negócio, os números e o objetivo do sócio antes de falar em preço. Nem toda empresa está pronta — e dizemos isso.",
  },
  {
    step: "02",
    name: "Preparação",
    text: "Organizamos informações gerenciais, projeções e o equity story. É aqui que se ganha ou se perde múltiplo.",
  },
  {
    step: "03",
    name: "Mercado",
    text: "Abordamos compradores estratégicos e financeiros, no Brasil e no exterior, sob confidencialidade e em processo competitivo.",
  },
  {
    step: "04",
    name: "Negociação",
    text: "Conduzimos due diligence, preço, estrutura e contrato — com os sócios seniores na mesa do começo ao fim.",
  },
];

export const stats = [
  { value: "15+", label: "anos de mercado" },
  { value: "50+", label: "empresas assessoradas" },
  { value: "12", label: "setores atendidos" },
  { value: "100%", label: "execução por sócios seniores" },
];

export type Person = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  /** Caminho da foto em /public/time. Opcional — sem foto usa iniciais. */
  photo?: string;
};

export const team: Person[] = [
  {
    name: "Douglas Carvalho Jr.",
    role: "Sócio-fundador",
    bio: "Lidera a originação e a negociação das operações da Target. Mais de duas décadas de experiência em fusões e aquisições no middle market brasileiro.",
  },
  {
    name: "Raphaela Carvalho",
    role: "Sócia",
    bio: "Responsável pela execução dos mandatos e pelo relacionamento com investidores e compradores estratégicos.",
  },
];
