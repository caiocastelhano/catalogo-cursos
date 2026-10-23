// Remove acentos e ignora maiúsculas (busca de aulas na sala de aula).
export function normalizar(valor) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
