import { Link } from 'react-router-dom';
import { Seta } from './Icones.jsx';
import './BarraMatricula.css';

export default function BarraMatricula({ curso, aberta }) {
  return (
    <div className="barra-matricula" role="region" aria-label="Matrícula no curso">
      <div className="barra-matricula__conteudo">
        <p className="barra-matricula__nome">{curso.nomeCompleto}</p>
        {aberta ? (
          <Link to={`/cursos/${curso.id}/aula`} className="botao botao--branco">
            Matricule-se <Seta tamanho={20} />
          </Link>
        ) : (
          <button type="button" className="botao botao--branco" disabled>
            Inscrições encerradas
          </button>
        )}
      </div>
    </div>
  );
}