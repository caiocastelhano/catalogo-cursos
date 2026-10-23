import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Cursos from './pages/Cursos.jsx';
import CursoDetalhe from './pages/CursoDetalhe.jsx';
import SalaAula from './pages/SalaAula.jsx';
import NaoEncontrada from './pages/NaoEncontrada.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="cursos/:id" element={<CursoDetalhe />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
        <Route path="cursos/:id/aula" element={<SalaAula />} />
      </Routes>
    </>
  );
}