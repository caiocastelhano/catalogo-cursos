import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <a className="pular-conteudo" href="#conteudo">Ir para o conteúdo</a>
      <Header tema={pathname === '/' ? 'escuro' : 'claro'} />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}