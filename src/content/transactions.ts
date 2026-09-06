/**
 * TRANSAÇÕES / TOMBSTONES
 *
 * ⚠️ DADOS DE EXEMPLO — substituir pelos deals reais da Target antes de publicar.
 * A estrutura abaixo já é a definitiva: basta trocar os objetos.
 *
 * Decisão da reunião de 03/09: a linha do tempo sai. As transações passam a ser
 * uma listagem de clientes/empresas navegável por setor, em que o usuário clica
 * e cai no tombstone da operação.
 */

export type DealRole =
  | "Sell-side"
  | "Buy-side"
  | "Captação"
  | "Valuation"
  | "Fairness opinion";

export type Transaction = {
  slug: string;
  /** Empresa assessorada — o nome que aparece no card. */
  company: string;
  /** Contraparte. Use "Confidencial" quando não divulgável. */
  counterparty: string;
  /** Descrição curta do negócio da empresa assessorada. */
  companyDescription: string;
  sector: string;
  role: DealRole;
  year: number;
  /** Frase do tombstone: "assessorou X na venda de 100% para Y". */
  headline: string;
  /** Texto de 2–4 frases sobre a operação. */
  summary: string;
  region: string;
  /** Métricas opcionais exibidas no tombstone. */
  facts?: { label: string; value: string }[];
  /** Marque true para exibir na home. */
  featured?: boolean;
  /** Caminho do logo em /public/clientes. Opcional. */
  logo?: string;
  /** Link para matéria externa sobre a transação. */
  pressUrl?: string;
};

export const transactions: Transaction[] = [
  {
    slug: "industria-de-embalagens-flexiveis",
    company: "Indústria de Embalagens Flexíveis",
    counterparty: "Grupo estratégico europeu",
    companyDescription:
      "Converter de filmes plásticos para as indústrias de alimentos e higiene, com duas plantas no interior de São Paulo.",
    sector: "Indústria",
    role: "Sell-side",
    year: 2025,
    headline:
      "Assessoria à venda de 100% do capital para grupo estratégico europeu",
    summary:
      "Processo competitivo conduzido com compradores estratégicos da Europa e da América do Norte. A Target coordenou a preparação da empresa, a modelagem financeira, o processo de due diligence e a negociação do contrato de compra e venda.",
    region: "São Paulo, SP",
    facts: [
      { label: "Participação transacionada", value: "100%" },
      { label: "Formato", value: "Processo competitivo" },
      { label: "Duração", value: "11 meses" },
    ],
    featured: true,
  },
  {
    slug: "rede-de-clinicas-de-diagnostico",
    company: "Rede de Clínicas de Diagnóstico",
    counterparty: "Plataforma investida por private equity",
    companyDescription:
      "Rede regional de medicina diagnóstica por imagem com 12 unidades no Centro-Oeste.",
    sector: "Saúde",
    role: "Sell-side",
    year: 2025,
    headline:
      "Assessoria à venda de participação majoritária para plataforma de private equity",
    summary:
      "A operação combinou saída parcial dos fundadores com reinvestimento no veículo consolidador. A Target estruturou o earn-out e o acordo de sócios que mantém os médicos fundadores à frente da operação.",
    region: "Goiânia, GO",
    facts: [
      { label: "Participação transacionada", value: "Majoritária" },
      { label: "Estrutura", value: "Cash-out parcial + rollover" },
    ],
    featured: true,
  },
  {
    slug: "distribuidora-de-materiais-eletricos",
    company: "Distribuidora de Materiais Elétricos",
    counterparty: "Grupo nacional do setor",
    companyDescription:
      "Distribuição B2B de material elétrico e automação predial para construtoras e integradores.",
    sector: "Distribuição e varejo",
    role: "Sell-side",
    year: 2024,
    headline: "Assessoria à venda de 100% do capital para grupo nacional",
    summary:
      "Transação sucessória em empresa familiar de segunda geração. O mandato incluiu a organização das informações gerenciais e a construção do equity story antes da abordagem ao mercado.",
    region: "Curitiba, PR",
    facts: [{ label: "Participação transacionada", value: "100%" }],
    featured: true,
  },
  {
    slug: "software-de-gestao-para-agro",
    company: "Software de Gestão para o Agro",
    counterparty: "Confidencial",
    companyDescription:
      "ERP vertical para fazendas de grãos, com base instalada no Cerrado e receita majoritariamente recorrente.",
    sector: "Tecnologia",
    role: "Captação",
    year: 2024,
    headline: "Assessoria na captação de rodada de crescimento",
    summary:
      "Estruturação de rodada primária com fundo especializado em software B2B. A Target conduziu o material de captação, a lista de investidores e a negociação do term sheet.",
    region: "Uberlândia, MG",
    facts: [
      { label: "Tipo", value: "Rodada primária" },
      { label: "Uso dos recursos", value: "Produto e expansão comercial" },
    ],
  },
  {
    slug: "operador-logistico-refrigerado",
    company: "Operador Logístico Refrigerado",
    counterparty: "Investidor estratégico latino-americano",
    companyDescription:
      "Armazenagem e transporte com temperatura controlada para as indústrias de proteína e laticínios.",
    sector: "Logística",
    role: "Sell-side",
    year: 2024,
    headline:
      "Assessoria à venda de participação relevante para investidor estratégico",
    summary:
      "Mandato originado a partir de aproximação espontânea do comprador. A Target abriu o processo para outros interessados e conduziu a negociação até o closing.",
    region: "Chapecó, SC",
  },
  {
    slug: "industria-de-cosmeticos",
    company: "Indústria de Cosméticos",
    counterparty: "Confidencial",
    companyDescription:
      "Fabricante de dermocosméticos com marca própria e operação de private label.",
    sector: "Consumo",
    role: "Valuation",
    year: 2023,
    headline: "Avaliação econômico-financeira para reorganização societária",
    summary:
      "Laudo de avaliação por fluxo de caixa descontado e múltiplos de mercado, utilizado como base para a entrada de novo sócio e a reestruturação do quadro societário.",
    region: "São Paulo, SP",
  },
  {
    slug: "grupo-educacional-tecnico",
    company: "Grupo Educacional Técnico",
    counterparty: "Consolidador do setor de educação",
    companyDescription:
      "Escolas de ensino técnico e cursos profissionalizantes presenciais e híbridos.",
    sector: "Educação",
    role: "Sell-side",
    year: 2023,
    headline: "Assessoria à venda de 100% do capital para consolidador do setor",
    summary:
      "Processo conduzido com os principais grupos consolidadores de educação do país. A negociação equacionou passivos contingentes por meio de escrow e ajuste de preço.",
    region: "Belo Horizonte, MG",
  },
  {
    slug: "fabricante-de-componentes-automotivos",
    company: "Fabricante de Componentes Automotivos",
    counterparty: "Grupo asiático de autopeças",
    companyDescription:
      "Tier 2 de componentes estampados e usinados para montadoras instaladas no Brasil.",
    sector: "Indústria",
    role: "Buy-side",
    year: 2022,
    headline:
      "Assessoria a grupo asiático na aquisição de fabricante brasileiro de autopeças",
    summary:
      "Mandato buy-side com mapeamento de alvos, abordagem, coordenação da due diligence e suporte à negociação para a entrada do cliente no mercado brasileiro.",
    region: "Sorocaba, SP",
  },
  {
    slug: "rede-de-restaurantes",
    company: "Rede de Restaurantes",
    counterparty: "Confidencial",
    companyDescription:
      "Rede própria e franqueada de restaurantes casual dining com presença em shoppings.",
    sector: "Consumo",
    role: "Sell-side",
    year: 2022,
    headline: "Assessoria à venda de participação minoritária relevante",
    summary:
      "Captação secundária com entrada de investidor financeiro para financiar o plano de expansão da rede sem alavancagem adicional.",
    region: "Rio de Janeiro, RJ",
  },
  {
    slug: "empresa-de-servicos-ambientais",
    company: "Empresa de Serviços Ambientais",
    counterparty: "Plataforma de saneamento",
    companyDescription:
      "Tratamento e destinação de resíduos industriais com licenças ambientais próprias.",
    sector: "Infraestrutura",
    role: "Sell-side",
    year: 2021,
    headline: "Assessoria à venda de 100% do capital para plataforma de saneamento",
    summary:
      "Operação em setor intensivo em regulação, com due diligence ambiental conduzida em paralelo à negociação comercial.",
    region: "Campinas, SP",
  },
  {
    slug: "industria-de-alimentos-congelados",
    company: "Indústria de Alimentos Congelados",
    counterparty: "Multinacional de alimentos",
    companyDescription:
      "Produção de pratos prontos congelados para food service e marcas de varejo.",
    sector: "Consumo",
    role: "Sell-side",
    year: 2021,
    headline: "Assessoria à venda de 100% do capital para multinacional de alimentos",
    summary:
      "Processo internacional com investidores estratégicos da Europa e dos Estados Unidos, conduzido integralmente em ambiente virtual.",
    region: "Marília, SP",
  },
  {
    slug: "provedor-regional-de-internet",
    company: "Provedor Regional de Internet",
    counterparty: "Consolidador de telecom",
    companyDescription:
      "ISP de fibra óptica com rede própria em cidades de médio porte do interior paulista.",
    sector: "Telecom",
    role: "Sell-side",
    year: 2020,
    headline: "Assessoria à venda de 100% do capital para consolidador de telecom",
    summary:
      "Transação em um dos setores mais ativos em M&A no país, com avaliação ancorada em múltiplos por assinante conectado (HP e HC).",
    region: "Ribeirão Preto, SP",
  },
];

/* ------------------------------------------------------------------ */

export const sectors = Array.from(
  new Set(transactions.map((t) => t.sector)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

export const roles = Array.from(new Set(transactions.map((t) => t.role)));

export function getTransaction(slug: string) {
  return transactions.find((t) => t.slug === slug);
}

export const featuredTransactions = transactions.filter((t) => t.featured);

export function relatedTransactions(current: Transaction, limit = 3) {
  return transactions
    .filter((t) => t.slug !== current.slug)
    .sort((a, b) => {
      const score = (t: Transaction) =>
        (t.sector === current.sector ? 2 : 0) + (t.role === current.role ? 1 : 0);
      return score(b) - score(a) || b.year - a.year;
    })
    .slice(0, limit);
}
