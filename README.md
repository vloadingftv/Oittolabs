# Target Advisor — site

Site institucional da Target Advisor, reconstruído a partir do feedback da
reunião **Tidex & Target de 03/09/2026** e das referências enviadas pelo Douglas
(IGC, RGS Partners, Galápagos, Setter, Novara, Global Scope, Pactor e o portal
Fusões & Aquisições).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · deploy na Vercel.

---

## O que a reunião pediu e onde isso está no site

| Pedido | Onde foi resolvido |
| --- | --- |
| "Ter um portal que compila as informações do dia; o cara clica e vai pro site da notícia" | **`/radar`** — agregador de manchetes de M&A por RSS, com link direto para a fonte. Também aparece na home. |
| "Os logotipos das empresas que a gente atendeu têm que aparecer mais — e o atual tem um limitador, uma hora parou de carregar" | **`/clientes`** — mural completo, sem limite nem paginação, com filtro por setor. Faixa de destaque logo abaixo da dobra da home. |
| "Não precisa linha do tempo — se você fica um tempo sem vender, fica um buraco. Coloca a empresa, o cara clica e cai na tombstone" | **`/transacoes`** — listagem por empresa com filtro de setor e mandato; cada card abre a tombstone em `/transacoes/[slug]`. Nenhum eixo cronológico. |
| "Todas as matérias que a gente teve, de uma forma que a pessoa vê" | **`/imprensa`** — destaques + arquivo completo agrupado por ano, cada item linkando para o veículo. |
| "Como conectar LinkedIn, Instagram e YouTube ao site?" | **`/conteudo`** — cada vídeo ganha página com título, resumo e série (indexável); bloco explicando o circuito rede social → site → vídeo → contato. |
| "As fotos não estavam boas — me dá o comando técnico do que precisa" | A direção de arte está escrita em `src/components/hero-backdrop.tsx`. Enquanto a foto não chega, o hero usa uma composição vetorial de arquitetura (nítida, leve, sem banco de imagem). |

---

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run typecheck
```

---

## ⚠️ Antes de publicar: trocar o conteúdo de exemplo

Todo o conteúdo vive em `src/content/` — arquivos TypeScript tipados, sem CMS e
sem banco. Os dados atuais são **exemplos com a estrutura final**: basta trocar
os objetos.

| Arquivo | O que substituir |
| --- | --- |
| `src/content/site.ts` | Telefone, WhatsApp, endereço e URLs reais das redes. Hoje estão com zeros. |
| `src/content/transactions.ts` | As transações reais. Use `counterparty: "Confidencial"` no que não for divulgável. |
| `src/content/clients.ts` | A lista real de clientes. Sem `logo`, o site desenha um selo tipográfico com o nome — o mural nunca fica com buraco. |
| `src/content/press.ts` | As matérias reais, com link para o veículo. |
| `src/content/videos.ts` | Os `youtubeId` reais (os 11 caracteres da URL do vídeo). |
| `src/content/firm.ts` | Números da casa, serviços, método e bios do time. |

**Logotipos de cliente:** salve em `public/clientes/<slug>.svg` (fundo
transparente, altura útil ~64 px) e aponte em `logo:`.

**Foto do hero:** salve em `public/hero.jpg` e passe `image="/hero.jpg"` para
`<HeroBackdrop />` em `src/app/page.tsx`. Nada mais muda.

---

## Radar M&A — como funciona

- As fontes estão em `src/lib/radar/sources.ts`. Adicionar um veículo é incluir
  um feed RSS na lista.
- Feeds especializados entram inteiros; veículos generalistas passam por um
  filtro de palavras-chave de M&A (`dealTerms`).
- Manchetes repetidas em veículos diferentes são deduplicadas; cada item recebe
  um setor por heurística.
- **O site não hospeda matéria nenhuma.** Só a manchete e o link `target="_blank"
  rel="noopener noreferrer nofollow"` para a fonte original — que era exatamente
  a decisão registrada na ata.
- Revalidação: ISR de 30 minutos, mais um cron da Vercel 3x ao dia
  (`vercel.json` → `/api/radar/revalidate`).
- Se todas as fontes falharem, entra o fallback de `src/lib/radar/seed.ts` e a
  página continua de pé.

Para forçar uma atualização manualmente, defina `CRON_SECRET` na Vercel e chame:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://SEU-DOMINIO/api/radar/revalidate
```

---

## Deploy na Vercel

1. Importe o repositório na Vercel — o framework é detectado sozinho.
2. Região já fixada em `gru1` (São Paulo) via `vercel.json`.
3. Aponte o domínio `targetadvisor.com.br` para o projeto.
4. Confirme que `src/content/site.ts` → `url` está com o domínio final (ele
   alimenta canonical, sitemap, Open Graph e JSON-LD).

### Variáveis de ambiente

| Variável | Para quê | Obrigatória |
| --- | --- | --- |
| `RESEND_API_KEY` | Envio do formulário de contato via [Resend](https://resend.com) | Para o formulário funcionar |
| `CONTACT_TO` | Destinatário (padrão: `comercial@targetadvisor.com.br`) | Não |
| `CONTACT_FROM` | Remetente em domínio verificado no Resend | Não |
| `CRON_SECRET` | Protege `/api/radar/revalidate` | Recomendada |

**Sem `RESEND_API_KEY` o formulário não finge ter enviado**: mostra uma mensagem
clara pedindo para escrever no e-mail. Os canais diretos (e-mail, telefone,
WhatsApp) ficam sempre visíveis ao lado do formulário.

---

## Estrutura

```
src/
├── app/
│   ├── page.tsx                    home
│   ├── radar/                      agregador de manchetes
│   ├── transacoes/[slug]/          tombstones
│   ├── clientes/ imprensa/ conteudo/ sobre/ contato/
│   ├── api/radar/revalidate/       endpoint do cron
│   ├── sitemap.ts robots.ts opengraph-image.tsx icon.tsx
│   └── globals.css                 design tokens (trocar cor aqui muda o site)
├── components/                     UI
├── content/                        ⚠️ conteúdo editável
└── lib/
    ├── radar/                      fontes, parser RSS/Atom e agregação
    ├── seo.tsx                     JSON-LD
    └── utils.ts
```

## Decisões técnicas que valem saber

- **Tempo relativo nas manchetes** (`RelativeTime`): a página é cacheada, então o
  primeiro render usa data absoluta — idêntica no servidor e no cliente — e só
  troca para "há 2 h" depois da hidratação. Sem isso, o React descartaria a
  árvore por divergência de hidratação.
- **Vídeos com fachada**: o iframe do YouTube só carrega no clique. Seis embeds
  diretos custariam vários MB de JavaScript de terceiros — parte do motivo de o
  canal não converter hoje.
- **Parser de RSS próprio**, sem dependência: conteúdo de feed nunca é
  interpretado como HTML, apenas como texto.
- **Design tokens** concentrados em `src/app/globals.css`: as cores da marca
  entram em um lugar só.
