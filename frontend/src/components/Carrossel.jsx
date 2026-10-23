import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { Seta } from './Icones.jsx';
import './Carrossel.css';

export default function Carrossel({ rotulo, acao, children }) {
  const trilho = useRef(null);
  const [limites, setLimites] = useState({ inicio: true, fim: false });
  const total = Children.count(children);

  const atualizar = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setLimites({
      inicio: el.scrollLeft <= 1,
      fim: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    atualizar();
    window.addEventListener('resize', atualizar);
    return () => window.removeEventListener('resize', atualizar);
  }, [atualizar, total]);

  function rolar(sentido) {
    const el = trilho.current;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: sentido * el.clientWidth * 0.8, behavior: reduzir ? 'auto' : 'smooth' });
  }

  return (
    <section className="carrossel" aria-roledescription="carrossel" aria-label={rotulo}>
      <ul className="carrossel__trilho" ref={trilho} onScroll={atualizar} tabIndex={0}>
        {Children.map(children, (filho) => (
          <li className="carrossel__item">{filho}</li>
        ))}
      </ul>
      <div className="carrossel__controles">
        <div>{acao}</div>
        <div className="carrossel__setas">
          <button type="button" onClick={() => rolar(-1)} disabled={limites.inicio} aria-label="Anterior">
            <Seta direcao="esquerda" />
          </button>
          <button type="button" onClick={() => rolar(1)} disabled={limites.fim} aria-label="Próximo">
            <Seta direcao="direita" />
          </button>
        </div>
      </div>
    </section>
  );
}