import { Link, useParams } from 'react-router-dom';
import { obterCurso } from '../api/cursos';
import { useApi } from '../hooks/useApi';
import { useTitulo } from '../hooks/useTitulo';
import { beneficios, conteudoPorModalidade } from '../data/conteudo';
import { formatarData } from '../utils/formatar';
import Acordeao from '../components/Acordeao.jsx';
import BarraMatricula from '../components/BarraMatricula.jsx';
import Beneficios from '../components/Beneficios.jsx';
import Depoimentos from '../components/Depoimentos.jsx';
import { Carregando, Erro, Vazio } from '../components/Estado.jsx';
import {
  Calendario,
  Informacao,
  Medalha,
  Monitor,
  Pessoas,
  Relogio,
  Seta,
} from '../components/Icones.jsx';
import SetaAnimada from '../components/SetaAnimada.jsx';
import TagCategoria from '../components/TagCategoria.jsx';
import VideoThumb from '../components/VideoThumb.jsx';
import './CursoDetalhe.css';

export default function CursoDetalhe() {
  const { id } = useParams();
  const { dados: curso, carregando, erro, status, recarregar } = useApi(
    (signal) => obterCurso(id, signal),
    id,
  );
  useTitulo(curso ? curso.nomeBreve : 'Curso');

  if (carregando) {
    return (
      <div className="container">
        <Carregando texto="Carregando curso..." />
      </div>
    );
  }

  if (status === 404) {
    return (
      <div className="container">
        <Vazio titulo="Curso não encontrado.">
          <p>O curso solicitado não existe ou foi removido.</p>
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
          titulo="Não foi possível carregar o curso."
          mensagem={erro}
          aoTentarNovamente={recarregar}
        />
      </div>
    );
  }

  const aberta = curso.status !== 'Encerrado';
  const { tituloAulas, blocosAulas, duvidas } = conteudoPorModalidade(curso.modalidade);

  const informacoes = [
    {
      Icone: Calendario,
      rotulo: 'Início do curso',
      valor: curso.dataDisponibilizacao ? formatarData(curso.dataDisponibilizacao) : 'A definir',
    },
    { Icone: Medalha, rotulo: 'Certificação', valor: 'SESI' },
    { Icone: Monitor, rotulo: 'Modalidade', valor: curso.modalidade },
    { Icone: Relogio, rotulo: 'Carga horária', valor: `${curso.cargaHoraria} horas` },
    { Icone: Pessoas, rotulo: 'Público-alvo', valor: curso.publicoAlvo },
    { Icone: Informacao, rotulo: 'Status', valor: curso.status },
  ];

  return (
    <>
      <section className="detalhe-hero" aria-labelledby="titulo-curso">
        <div className="container detalhe-hero__grade">
          <div>
            <TagCategoria categoria={curso.categoria} />
            <h1 id="titulo-curso" className="detalhe-hero__titulo">
              {curso.nomeCompleto}
            </h1>
            <ul className="info">
              {informacoes.map(({ Icone, rotulo, valor }) => (
                <li key={rotulo} className="info__linha">
                  <Icone tamanho={20} />
                  <span>
                    {rotulo}: <strong>{valor}</strong>
                  </span>
                </li>
              ))}
            </ul>
            {aberta ? (
              <Link to={`/cursos/${curso.id}/aula`} className="botao botao--preto">
                Matricule-se <Seta tamanho={20} />
              </Link>
            ) : (
              <button type="button" className="botao botao--preto" disabled>
                Inscrições encerradas
              </button>
            )}
          </div>
          <VideoThumb prioridade />
        </div>
      </section>

      <section className="detalhe-beneficios" aria-labelledby="titulo-diferenciais">
        <div className="container">
          <h2 id="titulo-diferenciais" className="sr-only">Diferenciais dos cursos</h2>
          <Beneficios itens={beneficios} cor="bege" />
        </div>
      </section>

      <section className="sobre" aria-labelledby="titulo-sobre">
        <div className="container sobre__grade">
          <div>
            <h2 id="titulo-sobre" className="sobre__titulo">
              Sobre o curso
            </h2>
            <p className="sobre__texto">{curso.sobre}</p>
          </div>
          <div>
            <Acordeao titulo="Módulos">
              <ul className="modulos">
                {curso.modulos.map((modulo) => (
                  <li key={modulo.id}>
                    <h4>
                      {modulo.ordem}. {modulo.titulo}
                    </h4>
                    <p>{modulo.descricao}</p>
                    <ul>
                      {modulo.aulas.map((aula) => (
                        <li key={aula.id}>{aula.descricao}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Acordeao>

            <Acordeao titulo={tituloAulas}>
              {blocosAulas.map((bloco) => (
                <div key={bloco.titulo} className="bloco-texto">
                  <h4>{bloco.titulo}</h4>
                  <p>{bloco.intro}</p>
                  <ul>
                    {bloco.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{bloco.fecho}</p>
                </div>
              ))}
            </Acordeao>

            <Acordeao titulo="Dúvidas frequentes">
              <ul className="duvidas">
                {duvidas.map((item, indice) => (
                  <li key={item.pergunta}>
                    <h4>
                      {indice + 1}. {item.pergunta}
                    </h4>
                    <p>{item.resposta}</p>
                  </li>
                ))}
              </ul>
            </Acordeao>
          </div>
        </div>
      </section>

      <Depoimentos tema="pessego" />

      <section className="fale" aria-labelledby="titulo-fale">
        <div className="container">
          <p className="fale__etiqueta">Precisa de ajuda para decidir?</p>
          <h2 id="titulo-fale" className="fale__titulo">
            Fale com a gente
          </h2>
          <a
            className="botao botao--branco botao--animado"
            href={`mailto:contato@sesindustria.com.br?subject=${encodeURIComponent(
              `Dúvida sobre o curso ${curso.nomeBreve}`,
            )}`}
          >
            Mandar uma mensagem <SetaAnimada />
          </a>
        </div>
      </section>

      <BarraMatricula curso={curso} aberta={aberta} />
    </>
  );
}