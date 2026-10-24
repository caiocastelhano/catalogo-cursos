import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export default function Header({ tema = 'claro' }) {
  const [rolou, setRolou] = useState(false);
  const escuro = tema === 'escuro';

  useEffect(() => {
    if (!escuro) {
      setRolou(false);
      return undefined;
    }
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, [escuro]);

  const logo =
    escuro && !rolou
      ? '/icons/logo-sesi-industria-white.svg'
      : '/icons/logo-sesi-industria-primary.svg';

  const classes = [
    'cabecalho',
    `cabecalho--${tema}`,
    escuro && rolou ? 'cabecalho--rolado' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
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
