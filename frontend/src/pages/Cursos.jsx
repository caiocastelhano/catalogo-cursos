import { useEffect, useState } from 'react';
import { listarCursos } from '../api/cursos';

export default function Cursos() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controle = new AbortController();
    listarCursos({}, controle.signal)
      .then(setDados)
      .catch((e) => {
        if (e.name !== 'AbortError') setErro(e.message);
      });
    return () => controle.abort();
  }, []);

  return (
    <div className="container" style={{ paddingBlock: 48 }}>
      <h1>Cursos</h1>
      {erro && <p role="alert">{erro}</p>}
      {!dados && !erro && <p>Carregando...</p>}
      {dados && (
        <>
          <p>{dados.total} cursos</p>
          <ul>
            {dados.itens.map((c) => (
              <li key={c.id}>{c.nomeCompleto}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}