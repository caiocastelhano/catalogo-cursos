const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export function Seta({ direcao = 'direita', tamanho = 24 }) {
  return (
    <svg {...base} width={tamanho} height={tamanho}>
      <g transform={direcao === 'esquerda' ? 'rotate(180 12 12)' : undefined}>
        <path d="M3 12h17M14 6l6 6-6 6" />
      </g>
    </svg>
  );
}

export function Lupa({ tamanho = 20 }) {
  return (
    <svg {...base} width={tamanho} height={tamanho}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function Estrela({ tamanho = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

export function Play({ tamanho = 32 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function criar(conteudo) {
  return function Icone({ tamanho = 24 }) {
    return (
      <svg {...base} width={tamanho} height={tamanho}>
        {conteudo}
      </svg>
    );
  };
}

export const Calendario = criar(
  <>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
);

export const Medalha = criar(
  <>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5" />
  </>,
);

export const Monitor = criar(
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>,
);

export const Relogio = criar(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>,
);

export const Pessoas = criar(
  <>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 5.5a3.5 3.5 0 010 6.5M18 14.8c2 .6 3.3 2.4 3.6 5.2" />
  </>,
);

export const Informacao = criar(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </>,
);

// Ícone de situação da aula na sala de aula: concluída, atual ou pendente.
export function StatusAula({ estado, tamanho = 18 }) {
  const comum = {
    viewBox: '0 0 24 24',
    width: tamanho,
    height: tamanho,
    'aria-hidden': true,
    focusable: 'false',
  };

  if (estado === 'concluida') {
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path
          d="M7.5 12.5l3 3 6-6.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (estado === 'atual') {
    return (
      <svg {...comum}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...comum}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
