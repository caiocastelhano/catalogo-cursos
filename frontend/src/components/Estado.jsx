import './Estado.css';

export function Carregando({ texto = 'Carregando...' }) {
  return (
    <div className="estado" role="status">
      <span className="estado__spinner" aria-hidden="true" />
      <p>{texto}</p>
    </div>
  );
}

export function Erro({
  titulo = 'Não foi possível carregar os cursos.',
  mensagem,
  aoTentarNovamente,
}) {
  return (
    <div className="estado estado--erro" role="alert">
      <p className="estado__titulo">{titulo}</p>
      <p>{mensagem}</p>
      <button type="button" className="botao botao--preto" onClick={aoTentarNovamente}>
        Tentar novamente
      </button>
    </div>
  );
}

export function Vazio({ titulo, children }) {
  return (
    <div className="estado">
      <p className="estado__titulo">{titulo}</p>
      {children}
    </div>
  );
}