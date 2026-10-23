import { Link } from 'react-router-dom';
import { listarCursos } from '../api/cursos';
import { useApi } from '../hooks/useApi';
import { useTitulo } from '../hooks/useTitulo';
import { beneficios, estatisticas } from '../data/conteudo';
import Beneficios from '../components/Beneficios.jsx';
import Carrossel from '../components/Carrossel.jsx';
import CursoCard from '../components/CursoCard.jsx';
import Depoimentos from '../components/Depoimentos.jsx';
import { Carregando, Erro } from '../components/Estado.jsx';
import { Seta } from '../components/Icones.jsx';
import VideoThumb from '../components/VideoThumb.jsx';
import './Home.css';

export default function Home() {
  useTitulo('Início');
  const { dados, carregando, erro, recarregar } = useApi(
    (signal) => listarCursos({}, signal),
    'home',
  );
  const destaques = dados?.itens.filter((c) => c.destaque) ?? [];

  return (
    <>
      <section className="hero" aria-labelledby="titulo-hero">
        <div className="container">
          <h1 id="titulo-hero" className="hero__titulo">
            Impulsione sua carreira na indústria
          </h1>
          <p className="hero__texto">
            Amplie seus conhecimentos com excelência na melhor plataforma de estudos da indústria
            brasileira
          </p>
          <Link to="/cursos" className="botao botao--branco">
            Conhecer cursos <Seta tamanho={20} />
          </Link>
        </div>
      </section>

      <section className="secao" aria-labelledby="titulo-principais">
        <div className="container">
          <h2 id="titulo-principais" className="secao__titulo">
            Principais cursos
          </h2>
          {carregando && <Carregando texto="Carregando cursos..." />}
          {erro && <Erro mensagem={erro} aoTentarNovamente={recarregar} />}
          {!carregando && !erro && (
            <Carrossel
              rotulo="Principais cursos"
              acao={
                <Link to="/cursos" className="botao botao--contorno">
                  Ver todos os cursos
                </Link>
              }
            >
              {destaques.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
              <div className="todos-cursos">
                <Link to="/cursos" className="todos-cursos__link">
                  Todos os cursos <Seta />
                </Link>
              </div>
            </Carrossel>
          )}
        </div>
      </section>

      <section id="impacto" className="impacto" aria-labelledby="titulo-impacto">
        <div className="container impacto__grade">
          <div>
            <h2 id="titulo-impacto" className="secao__titulo">
              Impacto transformador
            </h2>
            <p>
              Resultados que demonstram o sucesso da nossa metodologia de capacitação contínua para a
              indústria
            </p>
          </div>
          <div>
            <dl className="impacto__numeros">
              {estatisticas.map((e) => (
                <div key={e.id} className="impacto__linha">
                  <dt>{e.rotulo}</dt>
                  <dd>{e.numero}</dd>
                </div>
              ))}
            </dl>
            <Beneficios itens={beneficios.slice(0, 3)} cor="red" />
          </div>
        </div>
      </section>

      <Depoimentos tema="vinho" />

      <section className="cta-final" aria-labelledby="titulo-cta">
        <div className="container cta-final__grade">
          <div>
            <h2 id="titulo-cta" className="cta-final__titulo">
              Pronto para transformar sua carreira?
            </h2>
            <p className="cta-final__texto">
              Junte-se a milhares de profissionais que já estão transformando a indústria através dos
              nossos cursos. Invista no seu futuro hoje mesmo!
            </p>
            <Link to="/cursos" className="botao botao--branco">
              Matricule-se <Seta tamanho={20} />
            </Link>
          </div>
          <VideoThumb />
        </div>
      </section>
    </>
  );
}