import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header({ tema = 'claro' }) {
  const logo =
    tema === 'escuro'
      ? '/icons/logo-sesi-industria-white.svg'
      : '/icons/logo-sesi-industria-primary.svg';

  return (
    <header className={`cabecalho cabecalho--${tema}`}>
      <div className="container cabecalho__conteudo">
        <Link to="/" className="cabecalho__logo" aria-label="SESI+INDÚSTRIA, página inicial">
          <img src={logo} alt="" />
        </Link>
        <nav aria-label="Principal" className="cabecalho__nav">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/cursos">Cursos</NavLink>
          <Link to="/#impacto">Sobre</Link>
          <Link to="/cursos/1/aula" className="botao botao--contorno">Área do aluno</Link>
        </nav>
      </div>
    </header>
  );
}