#!/usr/bin/env bash
# Simula o que o Dockerfile faz (build do front + publish do .NET), sobe o servidor
# publicado e roda as verificações. Uso: bash scripts/testar-publicacao.sh
set -euo pipefail

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
SAIDA="/tmp/publish-teste"
PORTA=8099

bash "$RAIZ/scripts/construir.sh" "$SAIDA"

echo "==> Iniciando o servidor publicado na porta $PORTA"
cd "$SAIDA"
PORT="$PORTA" dotnet CatalogoCursos.dll > /tmp/publish-teste.log 2>&1 &
PID=$!
cd "$RAIZ"
trap 'kill "$PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  curl -sf "http://localhost:$PORTA/healthz" > /dev/null && break
  sleep 1
done

bash "$RAIZ/scripts/verificar.sh" "http://localhost:$PORTA"
echo
echo "Log do servidor: /tmp/publish-teste.log"
echo "Para abrir no navegador: cd $SAIDA && PORT=$PORTA dotnet CatalogoCursos.dll  (http://localhost:$PORTA)"