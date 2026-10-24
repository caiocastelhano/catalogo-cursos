#!/usr/bin/env bash
# Verifica uma instância do catálogo (local ou publicada).
# Uso: bash scripts/verificar.sh https://catalogo-cursos-q297.onrender.com
set -uo pipefail

BASE="${1:?Informe a URL base. Ex.: bash scripts/verificar.sh http://localhost:8099}"
BASE="${BASE%/}"
falhas=0

codigo() { curl -s -m 120 -o /dev/null -w '%{http_code}' "$BASE$1"; }
corpo() { curl -s -m 120 "$BASE$1"; }
cabecalhos() { curl -s -m 120 -D - -o /dev/null "$@" | tr -d '\r' | tr 'A-Z' 'a-z'; }

verificar() {
  local descricao="$1" esperado="$2" obtido="$3"
  if [[ "$obtido" == *"$esperado"* ]]; then
    echo "  OK     $descricao"
  else
    echo "  FALHA  $descricao (esperado: $esperado)"
    falhas=$((falhas + 1))
  fi
}

echo "Verificando $BASE"
echo "(a primeira requisição pode demorar se o serviço estiver em repouso)"

echo "Aplicação"
verificar "/healthz responde 200" "200" "$(codigo /healthz)"
html="$(corpo /)"
verificar "/ devolve o index.html do React" 'id="root"' "$html"
verificar "Rota /cursos/3 devolve o index.html" "200" "$(codigo /cursos/3)"
verificar "Rota /cursos/3/aula devolve o index.html" "200" "$(codigo /cursos/3/aula)"

echo "Arquivos estáticos"
js="$(echo "$html" | grep -oE '/assets/[^"]+\.js' | head -1)"
css="$(echo "$html" | grep -oE '/assets/[^"]+\.css' | head -1)"
verificar "index.html referencia um .js" "/assets/" "$js"
verificar "index.html referencia um .css" "/assets/" "$css"
verificar "JS compilado responde 200" "200" "$(codigo "$js")"
verificar "CSS compilado responde 200" "200" "$(codigo "$css")"
verificar "JS com cache longo" "immutable" "$(cabecalhos "$BASE$js")"
verificar "JS comprimido (gzip)" "content-encoding: gzip" "$(cabecalhos -H 'Accept-Encoding: gzip' "$BASE$js")"
verificar "Imagem WebP com tipo correto" "image/webp" "$(cabecalhos "$BASE/img/curso-1.webp")"
verificar "Ícone SVG responde 200" "200" "$(codigo /icons/logo-sesi.svg)"

echo "API"
verificar "Lista os 8 cursos" '"total":8' "$(corpo /api/cursos)"
verificar "Busca sem acento (quimica)" '"total":1' "$(corpo '/api/cursos?busca=quimica')"
verificar "Filtros combinados (Matemática + Online)" '"total":2' "$(corpo '/api/cursos?categoria=Matem%C3%A1tica&modalidade=Online')"
verificar "Detalhe do curso 1 traz módulos" '"modulos"' "$(corpo /api/cursos/1)"
verificar "Filtros incluem Linguagens" "Linguagens" "$(corpo /api/filtros)"
verificar "Curso inexistente devolve 404" "404" "$(codigo /api/cursos/99)"
verificar "Rota /api inexistente devolve 404 (não cai no index.html)" "404" "$(codigo /api/nada)"
verificar "Swagger (JSON) disponível" "200" "$(codigo /swagger/v1/swagger.json)"

echo
if [[ "$falhas" -eq 0 ]]; then
  echo "Tudo certo."
else
  echo "$falhas verificação(ões) falharam."
  exit 1
fi