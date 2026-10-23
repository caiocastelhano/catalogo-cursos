import { useCallback, useEffect, useState } from 'react';

// Carrega dados da API e controla carregamento, erro e nova tentativa.
// "chave" muda quando a consulta muda (ex.: filtros), disparando nova requisição.
export function useApi(carregar, chave) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: '' });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();
    setEstado((atual) => ({ ...atual, carregando: true, erro: '' }));

    carregar(controle.signal)
      .then((dados) => setEstado({ dados, carregando: false, erro: '' }))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setEstado({ dados: null, carregando: false, erro: e.message || 'Erro inesperado.' });
      });

    return () => controle.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave, tentativa]);

  const recarregar = useCallback(() => setTentativa((n) => n + 1), []);

  return { ...estado, recarregar };
}