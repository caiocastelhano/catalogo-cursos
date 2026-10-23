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