/**
 * Configuração central do site.
 * Ajuste aqui dados institucionais, contato e redes — tudo o mais lê deste arquivo.
 */
export const site = {
  name: "Target Advisor",
  legalName: "Target Advisor Assessoria em Fusões e Aquisições",
  tagline: "Assessoria em fusões e aquisições",
  description:
    "Boutique independente de M&A. Assessoramos empresários brasileiros na venda, compra e capitalização de seus negócios — com execução sênior do primeiro contato ao closing.",
  url: "https://www.targetadvisor.com.br",
  locale: "pt-BR",
  foundedYear: 2010,
  contact: {
    email: "comercial@targetadvisor.com.br",
    phone: "+55 11 0000-0000",
    phoneHref: "+551100000000",
    whatsapp: "5511000000000",
    address: {
      street: "Av. Brigadeiro Faria Lima, 0000 — 00º andar",
      district: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
      zip: "00000-000",
      country: "BR",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/target-advisor",
    instagram: "https://www.instagram.com/targetadvisor",
    youtube: "https://www.youtube.com/@targetadvisor",
  },
  /** Canal do YouTube usado no bloco de vídeos e no feed do Radar. */
  youtubeChannelId: "",
} as const;

/** Rótulos das redes — evita depender de `capitalize` (que gera "Linkedin"). */
export const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
};

export type NavItem = { href: string; label: string; description?: string };

export const primaryNav: NavItem[] = [
  { href: "/transacoes", label: "Transações", description: "Operações assessoradas e tombstones" },
  { href: "/clientes", label: "Clientes", description: "Empresas que confiaram na Target" },
  { href: "/radar", label: "Radar M&A", description: "As manchetes do mercado, todo dia" },
  { href: "/imprensa", label: "Imprensa", description: "A Target na mídia" },
  { href: "/conteudo", label: "Conteúdo", description: "Vídeos, análises e social" },
  { href: "/sobre", label: "A Target", description: "Time, método e teses" },
];
