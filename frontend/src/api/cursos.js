async function requisitar(caminho, opcoes) {
  const resposta = await fetch(`/api${caminho}`, opcoes);

  if (!resposta.ok) {
    let detalhe = '';
    try {
      const problema = await resposta.json();
      detalhe = problema.detail || problema.title || '';
    } catch {
      // resposta sem JSON: usa a mensagem padrão abaixo
    }
    const erro = new Error(detalhe || `Erro ${resposta.status} ao consultar a API.`);
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