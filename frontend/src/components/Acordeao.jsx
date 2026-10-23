import './Acordeao.css';

export default function Acordeao({ titulo, abertoInicial = false, children }) {
  return (
    <details className="acordeao" open={abertoInicial}>
      <summary className="acordeao__resumo">
        <h3 className="acordeao__titulo">{titulo}</h3>
        <img className="acordeao__mais" src="/icons/add_2.svg" alt="" width="24" height="24" />
        <img className="acordeao__menos" src="/icons/remove.svg" alt="" width="24" height="24" />
      </summary>
      <div className="acordeao__conteudo">{children}</div>
    </details>
  );
}