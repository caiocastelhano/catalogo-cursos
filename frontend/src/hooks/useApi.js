import { useCallback, useEffect, useState } from 'react';

export function useApi(carregar, chave) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: '', status: null });
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();
    setEstado((atual) => ({ ...atual, carregando: true, erro: '', status: null }));

    carregar(controle.signal)
      .then((dados) => setEstado({ dados, carregando: false, erro: '', status: 200 }))
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setEstado({
          dados: null,
          carregando: false,
          erro: e.message || 'Erro inesperado.',
          status: e.status ?? null,
        });
      });

    return () => controle.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave, tentativa]);

  const recarregar = useCallback(() => setTentativa((n) => n + 1), []);

  return { ...estado, recarregar };
}