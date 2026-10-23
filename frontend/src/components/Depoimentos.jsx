import Carrossel from './Carrossel.jsx';
import { Estrela } from './Icones.jsx';
import { depoimentos } from '../data/conteudo.js';
import './Depoimentos.css';

export default function Depoimentos({ tema = 'vinho' }) {
  return (
    <section className={`depoimentos depoimentos--${tema}`} aria-labelledby="titulo-depoimentos">
      <div className="container">
        <p className="depoimentos__etiqueta">Depoimentos</p>
        <h2 id="titulo-depoimentos" className="depoimentos__titulo">
          Quem fez recomenda
        </h2>
        <Carrossel rotulo="Depoimentos de alunos">
          {depoimentos.map((d) => (
            <figure key={d.id} className="depoimento">
              <blockquote>
                <p>“{d.texto}”</p>
              </blockquote>
              <figcaption className="depoimento__autor">
                <strong>{d.nome}</strong>
                <span>{d.cargo}</span>
                <span className="depoimento__estrelas" role="img" aria-label="Avaliação: 5 de 5 estrelas">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Estrela key={n} />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </Carrossel>
      </div>
    </section>
  );
}