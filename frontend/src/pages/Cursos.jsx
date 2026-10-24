import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listarCursos, obterFiltros } from '../api/cursos';
import { useApi } from '../hooks/useApi';
import { useTitulo } from '../hooks/useTitulo';
import CursoCard from '../components/CursoCard.jsx';
import { Carregando, Erro, Vazio } from '../components/Estado.jsx';
import { Lupa } from '../components/Icones.jsx';
import './Cursos.css';

const CAMPOS = ['busca', 'categoria', 'modalidade', 'status'];

function Seletor({ id, rotulo, todos, valor, opcoes, aoAlterar }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      <select id={id} value={valor} onChange={(e) => aoAlterar(e.target.value)}>
        <option value="">{todos}</option>
        {opcoes.map((opcao) => (
          <option key={opcao} value={opcao}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Cursos() {
  useTitulo('Cursos');
  const [params, setParams] = useSearchParams();
  const filtros = Object.fromEntries(CAMPOS.map((campo) => [campo, params.get(campo) ?? '']));
  const [texto, setTexto] = useState(filtros.busca);

  const opcoes = useApi((signal) => obterFiltros(signal), 'filtros');
  const lista = useApi((signal) => listarCursos(filtros, signal), params.toString());

  const temFiltros = CAMPOS.some((campo) => filtros[campo]);
  const total = lista.dados?.total ?? 0;

  function atualizar(mudancas) {
    setParams(
      (anteriores) => {
        const proximos = new URLSearchParams(anteriores);
        Object.entries(mudancas).forEach(([campo, valor]) => {
          if (valor) proximos.set(campo, valor);
          else proximos.delete(campo);
        });
        return proximos;
      },
      { replace: true },
    );
  }

  function limpar() {
    setTexto('');
    setParams({}, { replace: true });
  }

  useEffect(() => {
    setTexto((atual) => (atual.trim() === filtros.busca ? atual : filtros.busca));
  }, [filtros.busca]);

  useEffect(() => {
    if (texto.trim() === filtros.busca) return undefined;
    const espera = setTimeout(() => atualizar({ busca: texto.trim() }), 300);
    return () => clearTimeout(espera);
  }, [texto]);

  return (
    <div className="container catalogo">
      <header className="catalogo__topo">
        <h1 className="catalogo__titulo">Cursos</h1>
        <p className="catalogo__subtitulo">Pesquise pelo nome ou filtre os cursos disponíveis.</p>
      </header>

      <form
        className="filtros"
        role="search"
        aria-label="Pesquisar e filtrar cursos"
        onSubmit={(e) => {
          e.preventDefault();
          atualizar({ busca: texto.trim() });
        }}
      >
        <div className="campo campo--busca">
          <label htmlFor="busca">Buscar curso pelo nome</label>
          <div className="campo__entrada">
            <input
              id="busca"
              type="search"
              value={texto}
              placeholder="Ex.: metalurgia"
              autoComplete="off"
              onChange={(e) => setTexto(e.target.value)}
            />
            <span className="campo__lupa">
              <Lupa />
            </span>
          </div>
        </div>
        <Seletor
          id="categoria"
          rotulo="Categoria"
          todos="Todas"
          valor={filtros.categoria}
          opcoes={opcoes.dados?.categorias ?? []}
          aoAlterar={(valor) => atualizar({ categoria: valor })}
        />
        <Seletor
          id="modalidade"
          rotulo="Modalidade"
          todos="Todas"
          valor={filtros.modalidade}
          opcoes={opcoes.dados?.modalidades ?? []}
          aoAlterar={(valor) => atualizar({ modalidade: valor })}
        />
        <Seletor
          id="status"
          rotulo="Status"
          todos="Todos"
          valor={filtros.status}
          opcoes={opcoes.dados?.status ?? []}
          aoAlterar={(valor) => atualizar({ status: valor })}
        />
        <button type="button" className="botao botao--contorno" onClick={limpar} disabled={!temFiltros}>
          Limpar filtros
        </button>
      </form>

      <section className="catalogo__resultado" aria-labelledby="titulo-resultados" aria-busy={lista.carregando}>
        <h2 id="titulo-resultados" className="sr-only">
          Resultados
        </h2>
        <p className="catalogo__contagem" aria-live="polite">
          {!lista.carregando && !lista.erro
            ? `${total} ${total === 1 ? 'curso encontrado' : 'cursos encontrados'}`
            : ''}
        </p>

        {lista.carregando && <Carregando texto="Carregando cursos..." />}
        {lista.erro && <Erro mensagem={lista.erro} aoTentarNovamente={lista.recarregar} />}
        {!lista.carregando && !lista.erro && total === 0 && (
          <Vazio titulo="Nenhum curso encontrado.">
            <p>Tente outro nome ou remova algum filtro.</p>
            <button type="button" className="botao botao--preto" onClick={limpar}>
              Limpar filtros
            </button>
          </Vazio>
        )}
        {!lista.carregando && !lista.erro && total > 0 && (
          <ul className="catalogo__grade">
            {lista.dados.itens.map((curso) => (
              <li key={curso.id}>
                <CursoCard curso={curso} mostrarDetalhes />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
