/**
 * RADAR M&A — fontes.
 *
 * A ideia (reunião de 03/09): o site vira um compilador diário das manchetes de
 * fusões e aquisições. A Target NÃO hospeda o conteúdo — compila a manchete e
 * manda o leitor para a fonte original via hiperlink. Isso dá tráfego recorrente
 * ao domínio sem qualquer problema de direito autoral.
 *
 * Para adicionar uma fonte, basta incluir o feed RSS/Atom abaixo.
 */

export type RadarSource = {
  id: string;
  /** Nome exibido no chip da manchete. */
  name: string;
  feed: string;
  /** `curated` = feed já é de M&A; `general` = precisa passar pelo filtro. */
  kind: "curated" | "general";
  /** Paywall conhecido — sinalizamos ao leitor antes do clique. */
  paywall?: boolean;
};

const googleNews = (query: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(
    query,
  )}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

export const sources: RadarSource[] = [
  // Feeds especializados — entram sem filtro.
  {
    id: "fusoesaquisicoes",
    name: "Fusões & Aquisições",
    feed: "https://fusoesaquisicoes.com/feed/",
    kind: "curated",
  },
  {
    id: "gnews-ma",
    name: "Google Notícias",
    feed: googleNews('"fusões e aquisições" OR "fusão e aquisição" when:7d'),
    kind: "curated",
  },
  {
    id: "gnews-aquisicao",
    name: "Google Notícias",
    feed: googleNews('("adquire" OR "compra a") empresa Brasil when:3d'),
    kind: "curated",
  },
  {
    id: "gnews-pe",
    name: "Google Notícias",
    feed: googleNews('"private equity" OR "venture capital" Brasil when:7d'),
    kind: "curated",
  },

  // Veículos generalistas de economia — passam pelo filtro de palavras-chave.
  {
    id: "neofeed",
    name: "NeoFeed",
    feed: "https://neofeed.com.br/feed/",
    kind: "general",
  },
  {
    id: "braziljournal",
    name: "Brazil Journal",
    feed: "https://braziljournal.com/feed/",
    kind: "general",
  },
  {
    id: "infomoney",
    name: "InfoMoney",
    feed: "https://www.infomoney.com.br/feed/",
    kind: "general",
  },
  {
    id: "exame",
    name: "Exame",
    feed: "https://exame.com/feed/",
    kind: "general",
  },
  {
    id: "moneytimes",
    name: "Money Times",
    feed: "https://www.moneytimes.com.br/feed/",
    kind: "general",
  },
  {
    id: "startups",
    name: "Startups",
    feed: "https://startups.com.br/feed/",
    kind: "general",
  },
  {
    id: "valor",
    name: "Valor Econômico",
    feed: "https://pox.globo.com/rss/valor/",
    kind: "general",
    paywall: true,
  },
];

/** Termos que qualificam uma manchete como pauta de M&A. */
export const dealTerms = [
  "fusão",
  "fusões",
  "aquisição",
  "aquisições",
  "adquire",
  "adquiriu",
  "m&a",
  "compra o controle",
  "assume o controle",
  "controle acionário",
  "compra fatia",
  "vende fatia",
  "vende participação",
  "compra participação",
  "venda de participação",
  "incorpora",
  "incorporação",
  "joint venture",
  "private equity",
  "venture capital",
  "capta r$",
  "captação",
  "rodada de investimento",
  "aporte",
  "ipo",
  "oferta pública",
  "opa ",
  "cade aprova",
  "due diligence",
  "spin-off",
  "cisão",
  "consolidação do setor",
  "compra a ",
  "vende a ",
  "negocia a compra",
  "negocia a venda",
];

/** Classificação setorial por palavra-chave (heurística, best-effort). */
export const sectorRules: { sector: string; terms: string[] }[] = [
  { sector: "Tecnologia", terms: ["software", "saas", "startup", "fintech", "tech", "app", "dados", "inteligência artificial", "ia "] },
  { sector: "Saúde", terms: ["saúde", "hospital", "clínica", "farmac", "medicina", "healthtech", "laboratório", "odonto"] },
  { sector: "Energia", terms: ["energia", "solar", "eólic", "petróleo", "gás", "combustível", "elétrica"] },
  { sector: "Agro", terms: ["agro", "agrícola", "fazenda", "grãos", "soja", "açúcar", "etanol", "fertilizante", "proteína", "frigorífico"] },
  { sector: "Varejo e consumo", terms: ["varejo", "consumo", "supermercado", "e-commerce", "marca", "restaurante", "alimento", "bebida", "moda"] },
  { sector: "Serviços financeiros", terms: ["banco", "seguro", "corretora", "gestora", "asset", "pagamento", "crédito", "bolsa"] },
  { sector: "Indústria", terms: ["indústria", "industrial", "fábrica", "siderurg", "químic", "metalurg", "autopeça", "manufatura"] },
  { sector: "Infraestrutura", terms: ["infraestrutura", "saneamento", "rodovia", "porto", "aeroporto", "concessão", "construção", "logística", "transporte"] },
  { sector: "Educação", terms: ["educação", "ensino", "escola", "universidade", "edtech"] },
  { sector: "Telecom", terms: ["telecom", "fibra", "internet", "provedor", "5g", "data center"] },
];
