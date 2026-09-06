/**
 * CLIENTES ATENDIDOS — mural de logotipos.
 *
 * ⚠️ DADOS DE EXEMPLO. Substituir por clientes reais.
 *
 * Como cadastrar um cliente real:
 *   1. Salve o logo em /public/clientes/<slug>.svg (preferência) ou .png,
 *      fundo transparente, altura útil ~64px.
 *   2. Preencha `logo: "/clientes/<slug>.svg"`.
 * Sem `logo`, o site renderiza um selo tipográfico com o nome — o mural nunca
 * fica com buraco.
 *
 * Requisito da reunião de 03/09: nada de limitador. Esta lista é renderizada
 * inteira, com lazy-load; pode crescer para centenas de itens sem quebrar.
 */

export type Client = {
  name: string;
  sector: string;
  /** Caminho do arquivo em /public/clientes. Opcional. */
  logo?: string;
  /** Marque true para aparecer na faixa da home. */
  highlight?: boolean;
  /** Slug de transação relacionada, se houver. */
  transaction?: string;
};

export const clients: Client[] = [
  { name: "Embalagens Flexíveis", sector: "Indústria", highlight: true, transaction: "industria-de-embalagens-flexiveis" },
  { name: "Diagnóstico por Imagem", sector: "Saúde", highlight: true, transaction: "rede-de-clinicas-de-diagnostico" },
  { name: "Materiais Elétricos", sector: "Distribuição e varejo", highlight: true, transaction: "distribuidora-de-materiais-eletricos" },
  { name: "AgroSoftware", sector: "Tecnologia", highlight: true, transaction: "software-de-gestao-para-agro" },
  { name: "Logística Refrigerada", sector: "Logística", highlight: true, transaction: "operador-logistico-refrigerado" },
  { name: "Dermocosméticos", sector: "Consumo", highlight: true, transaction: "industria-de-cosmeticos" },
  { name: "Educação Técnica", sector: "Educação", highlight: true, transaction: "grupo-educacional-tecnico" },
  { name: "Componentes Automotivos", sector: "Indústria", highlight: true, transaction: "fabricante-de-componentes-automotivos" },
  { name: "Casual Dining", sector: "Consumo", highlight: true, transaction: "rede-de-restaurantes" },
  { name: "Serviços Ambientais", sector: "Infraestrutura", highlight: true, transaction: "empresa-de-servicos-ambientais" },
  { name: "Alimentos Congelados", sector: "Consumo", highlight: true, transaction: "industria-de-alimentos-congelados" },
  { name: "Fibra Óptica Regional", sector: "Telecom", highlight: true, transaction: "provedor-regional-de-internet" },

  { name: "Metalurgia do Vale", sector: "Indústria" },
  { name: "Química Industrial", sector: "Indústria" },
  { name: "Plásticos de Engenharia", sector: "Indústria" },
  { name: "Máquinas Agrícolas", sector: "Indústria" },
  { name: "Farmacêutica Genéricos", sector: "Saúde" },
  { name: "Home Care", sector: "Saúde" },
  { name: "Odontologia Integrada", sector: "Saúde" },
  { name: "Laboratório Veterinário", sector: "Saúde" },
  { name: "Software Financeiro", sector: "Tecnologia" },
  { name: "Cloud & Infraestrutura", sector: "Tecnologia" },
  { name: "Marketplace B2B", sector: "Tecnologia" },
  { name: "Cibersegurança", sector: "Tecnologia" },
  { name: "Transporte Rodoviário", sector: "Logística" },
  { name: "Armazéns Gerais", sector: "Logística" },
  { name: "Last Mile", sector: "Logística" },
  { name: "Rede de Farmácias", sector: "Distribuição e varejo" },
  { name: "Autopeças Distribuição", sector: "Distribuição e varejo" },
  { name: "Materiais de Construção", sector: "Distribuição e varejo" },
  { name: "Bebidas Artesanais", sector: "Consumo" },
  { name: "Moda e Vestuário", sector: "Consumo" },
  { name: "Pet Care", sector: "Consumo" },
  { name: "Panificação Industrial", sector: "Consumo" },
  { name: "Ensino Superior EAD", sector: "Educação" },
  { name: "Escolas Bilíngues", sector: "Educação" },
  { name: "Energia Solar", sector: "Infraestrutura" },
  { name: "Saneamento Industrial", sector: "Infraestrutura" },
  { name: "Construção Civil", sector: "Infraestrutura" },
  { name: "Data Center Regional", sector: "Telecom" },
  { name: "Telecom Corporativa", sector: "Telecom" },
  { name: "Serviços Financeiros", sector: "Serviços financeiros" },
  { name: "Corretora de Seguros", sector: "Serviços financeiros" },
  { name: "Meios de Pagamento", sector: "Serviços financeiros" },
  { name: "Consultoria Tributária", sector: "Serviços profissionais" },
  { name: "Engenharia de Projetos", sector: "Serviços profissionais" },
  { name: "Facilities", sector: "Serviços profissionais" },
  { name: "Segurança Patrimonial", sector: "Serviços profissionais" },
];

export const clientSectors = Array.from(
  new Set(clients.map((c) => c.sector)),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

export const highlightedClients = clients.filter((c) => c.highlight);
