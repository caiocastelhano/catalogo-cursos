// Converte "2026-01-05" em "05/01/2026" sem passar por Date (evita erro de fuso horário).
export function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}
