import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obterCurso } from '../api/cursos';
import { useApi } from '../hooks/useApi';
import { useTitulo } from '../hooks/useTitulo';
import { conteudoAula } from '../data/conteudo';
import { normalizar } from '../utils/texto';
import { Carregando, Erro, Vazio } from '../components/Estado.jsx';
import { Lupa, Seta, StatusAula } from '../components/Icones.jsx';
import './SalaAula.css';

const TEXTO_ESTADO = {
  concluida: ', concluída',
  atual: ', aula atual',
  pendente: '',
};

function Sala({ curso }) {
  // Lista única de aulas, na ordem do curso, com o rótulo "módulo.aula" (ex.: 1.2)
  const aulas = useMemo(
    () =>
      curso.modulos.flatMap((modulo) =>
        modulo.aulas.map((aula) => ({
          ...aula,
          moduloId: modulo.id,
          rotulo: `${modulo.ordem}.${aula.ordem}`,
        })),
      ),
    [curso],
  );

  const [atualId, setAtualId] = useState(aulas[Math.min(1, aulas.length - 1)]?.id);
  const [abertos, setAbertos] = useState(() => new Set([curso.modulos[0]?.id]));
  const [busca, setBusca] = useState('');
  const conteudoRef = useRef(null);

  const indiceAtual = Math.max(
    0,
    aulas.findIndex((a) => a.id === atualId),
  );
  const aulaAtual = aulas[indiceAtual];
  // A aula em andamento conta meio ponto no progresso
  const progresso = aulas.length ? Math.round(((indiceAtual + 0.5) / aulas.length) * 100) : 0;

  const termo = normalizar(busca);
  const modulosVisiveis = curso.modulos
    .map((modulo) => ({
      ...modulo,
      aulas: termo
        ? modulo.aulas.filter((aula) => normalizar(aula.titulo).includes(termo))
        : modulo.aulas,
    }))
    .filter((modulo) => !termo || modulo.aulas.length > 0);

  function alternar(moduloId) {
    setAbertos((anteriores) => {
      const proximos = new Set(anteriores);
      if (proximos.has(moduloId)) proximos.delete(moduloId);
      else proximos.add(moduloId);
      return proximos;
    });
  }

  function selecionar(aulaId) {
    setAtualId(aulaId);
    conteudoRef.current?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }

  function estadoDaAula(aulaId) {
    const indice = aulas.findIndex((a) => a.id === aulaId);
    if (indice < indiceAtual) return 'concluida';
    if (indice === indiceAtual) return 'atual';
    return 'pendente';
  }

  const secoes = conteudoAula(curso, aulaAtual);

  return (
    <div className="sala">
      <a className="pular-conteudo" href="#conteudo-aula">
        Ir para o conteúdo da aula
      </a>

      <aside className="sala__lateral" aria-label="Menu do curso">
        <div className="sala__escuro">
          <Link to={`/cursos/${curso.id}`} className="sala__voltar" aria-label="Voltar para a página do curso">
            <Seta direcao="esquerda" />
          </Link>
          <div className="sala__cabecalho">
            <p className="sala__etiqueta">Certificação</p>
            <h1 className="sala__titulo">{curso.nomeCompleto}</h1>
          </div>
          <div className="sala__progresso">
            <div
              className="sala__barra"
              role="progressbar"
              aria-label="Progresso no curso"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progresso}
            >
              <span style={{ width: `${progresso}%` }} />
            </div>
            <span className="sala__percentual">{progresso}%</span>
          </div>
        </div>

        <div className="sala__busca">
          <label htmlFor="busca-aula" className="sr-only">
            Buscar aula
          </label>
          <input
            id="busca-aula"
            type="search"
            value={busca}
            autoComplete="off"
            onChange={(e) => setBusca(e.target.value)}
          />
          <span className="sala__lupa">
            <Lupa tamanho={18} />
          </span>
        </div>

        <nav aria-label="Conteúdo do curso">
          {modulosVisiveis.length === 0 && <p className="sala__vazio">Nenhuma aula encontrada.</p>}
          {modulosVisiveis.map((modulo) => {
            const aberto = termo ? true : abertos.has(modulo.id);
            return (
              <div key={modulo.id} className="sala__modulo">
                <button
                  type="button"
                  className="sala__modulo-botao"
                  aria-expanded={aberto}
                  aria-controls={`aulas-${modulo.id}`}
                  onClick={() => alternar(modulo.id)}
                >
                  {modulo.ordem}. {modulo.titulo}
                </button>
                {aberto && (
                  <ul id={`aulas-${modulo.id}`} className="sala__aulas">
                    {modulo.aulas.map((aula) => {
                      const estado = estadoDaAula(aula.id);
                      return (
                        <li key={aula.id}>
                          <button
                            type="button"
                            className="sala__aula"
                            aria-current={estado === 'atual' ? 'true' : undefined}
                            onClick={() => selecionar(aula.id)}
                          >
                            <StatusAula estado={estado} />
                            <span>
                              {modulo.ordem}.{aula.ordem} {aula.titulo}
                              <span className="sr-only">{TEXTO_ESTADO[estado]}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main id="conteudo-aula" className="sala__conteudo" tabIndex={0} ref={conteudoRef}>
        <div className="sala__miolo">
          <img
            className="sala__banner"
            src="/img/banner-ava.webp"
            alt="Banner do curso, com a marca SESI"
          />
          {secoes.map((secao) => (
            <section key={secao.titulo} className="sala__secao">
              <h2>{secao.titulo}</h2>
              {secao.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function SalaAula() {
  const { id } = useParams();
  const { dados: curso, carregando, erro, status, recarregar } = useApi(
    (signal) => obterCurso(id, signal),
    id,
  );
  useTitulo(curso ? `Sala de aula: ${curso.nomeBreve}` : 'Sala de aula');

  if (carregando) {
    return (
      <div className="container">
        <Carregando texto="Carregando sala de aula..." />
      </div>
    );
  }

  if (status === 404) {
    return (
      <div className="container">
        <Vazio titulo="Curso não encontrado.">
          <Link to="/cursos" className="botao botao--preto">
            Ver todos os cursos
          </Link>
        </Vazio>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container">
        <Erro
          titulo="Não foi possível carregar a sala de aula."
          mensagem={erro}
          aoTentarNovamente={recarregar}
        />
      </div>
    );
  }

  return <Sala curso={curso} />;
}