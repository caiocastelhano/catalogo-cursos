async function requisitar(caminho, opcoes) {
  let resposta;
  try {
    resposta = await fetch(`/api${caminho}`, opcoes);
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }

  if (!resposta.ok) {
    let detalhe = '';
    if (resposta.status < 500) {
      try {
        const problema = await resposta.json();
        detalhe = problema.detail || problema.title || '';
      } catch {
      }
    }
    const padrao =
      resposta.status >= 500
        ? 'O servidor está indisponível no momento. Tente novamente em instantes.'
        : `Erro ${resposta.status} ao consultar a API.`;
    const erro = new Error(detalhe || padrao);
    erro.status = resposta.status;
    throw erro;
  }

  return resposta.json();
}

export function listarCursos(filtros = {}, signal) {
  const params = new URLSearchParams();
  Object.entries(filtros).forEach(([chave, valor]) => {
    if (valor) params.set(chave, valor);
  });
  const consulta = params.toString();
  return requisitar(`/cursos${consulta ? `?${consulta}` : ''}`, { signal });
}

export function obterCurso(id, signal) {
  return requisitar(`/cursos/${id}`, { signal });
}

export function obterFiltros(signal) {
  return requisitar('/filtros', { signal });
}
