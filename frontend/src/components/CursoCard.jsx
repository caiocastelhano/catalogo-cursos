import { Link } from 'react-router-dom';
import TagCategoria from './TagCategoria.jsx';
import './CursoCard.css';

export default function CursoCard({ curso, mostrarDetalhes = false }) {
  return (
    <article className="curso-card">
      <img className="curso-card__imagem" src={curso.imagemUrl} alt="" loading="lazy" />
      <div className="curso-card__sombra" />
      <div className="curso-card__tag">
        <TagCategoria categoria={curso.categoria} />
      </div>
      <div className="curso-card__texto">
        <h3 className="curso-card__titulo">
          <Link to={`/cursos/${curso.id}`} className="curso-card__link">
            {curso.nomeCompleto}
          </Link>
        </h3>
        <p className="curso-card__descricao">{curso.descricao}</p>
        {mostrarDetalhes && (
          <ul className="curso-card__meta" aria-label="Informações do curso">
            <li>{curso.status}</li>
            <li>{curso.modalidade}</li>
            <li>{curso.cargaHoraria}h</li>
          </ul>
        )}
      </div>
    </article>
  );
}