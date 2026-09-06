import Image from "next/image";

/**
 * Fundo do hero.
 *
 * Pendência da reunião de 03/09: as fotos da home serão refeitas (fachada da
 * Faria Lima / arquitetura de São Paulo). Enquanto elas não chegam, o fundo é
 * uma composição vetorial de arquitetura — nítida em qualquer tela, sem custo
 * de download e sem foto de banco de imagem.
 *
 * Para usar a foto definitiva: salve em /public/hero.jpg e passe
 * `image="/hero.jpg"`. O restante do layout não muda.
 *
 * Direção de arte sugerida ao fotógrafo (o "comando técnico" que o Douglas
 * pediu): enquadramento vertical de baixo para cima, luz de fim de tarde,
 * volume à esquerda e céu limpo à direita — é onde o texto do hero fica.
 */
export function HeroBackdrop({ image }: { image?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
      ) : (
        <Architecture />
      )}

      {/* Véu para garantir contraste do texto em qualquer imagem */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}

function Architecture() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      className="absolute inset-0 size-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#0f2131" />
          <stop offset="55%" stopColor="#0a1622" />
          <stop offset="100%" stopColor="#060d14" />
        </linearGradient>
        <linearGradient id="glow" x1="1" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#b8863b" stopOpacity="0.30" />
          <stop offset="45%" stopColor="#2c5c81" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#060d14" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f2131" />
          <stop offset="100%" stopColor="#163149" />
        </linearGradient>
        <pattern
          id="windows"
          width="26"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <rect width="26" height="34" fill="none" />
          <rect
            x="6"
            y="8"
            width="13"
            height="16"
            fill="#2c5c81"
            fillOpacity="0.30"
          />
        </pattern>
      </defs>

      <rect width="1440" height="900" fill="url(#sky)" />
      <rect width="1440" height="900" fill="url(#glow)" />

      {/* Silhuetas — camada de fundo */}
      <g opacity="0.5">
        <rect x="60" y="430" width="120" height="470" fill="#0f2131" />
        <rect x="210" y="500" width="86" height="400" fill="#0f2131" />
        <rect x="1180" y="470" width="132" height="430" fill="#0f2131" />
        <rect x="1330" y="540" width="96" height="360" fill="#0f2131" />
      </g>

      {/* Torres principais */}
      <g>
        <rect x="330" y="300" width="176" height="600" fill="url(#tower)" />
        <rect x="330" y="300" width="176" height="600" fill="url(#windows)" />
        <rect x="330" y="300" width="176" height="4" fill="#b8863b" opacity="0.55" />

        <rect x="536" y="410" width="128" height="490" fill="#0d1c2a" />
        <rect x="536" y="410" width="128" height="490" fill="url(#windows)" opacity="0.7" />

        <rect x="880" y="238" width="150" height="662" fill="url(#tower)" />
        <rect x="880" y="238" width="150" height="662" fill="url(#windows)" />
        <rect x="880" y="238" width="150" height="4" fill="#b8863b" opacity="0.35" />

        <rect x="1054" y="392" width="104" height="508" fill="#0d1c2a" />
        <rect x="1054" y="392" width="104" height="508" fill="url(#windows)" opacity="0.6" />

        {/* Volume em vidro inclinado */}
        <path d="M694 900V352l160-64v612z" fill="#122a3e" />
        <path
          d="M694 900V352l160-64v612z"
          fill="url(#windows)"
          opacity="0.75"
        />
        <path d="M694 352l160-64" stroke="#cfa15f" strokeOpacity="0.5" strokeWidth="2" />
      </g>

      {/* Linhas de projeto */}
      <g stroke="#2c5c81" strokeOpacity="0.22" strokeWidth="1">
        <path d="M0 620h1440M0 720h1440M0 820h1440" />
      </g>
    </svg>
  );
}
