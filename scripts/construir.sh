#!/usr/bin/env bash
set -euo pipefail

SAIDA="${1:?Informe a pasta de saída. Ex.: bash scripts/construir.sh /tmp/publish-teste}"
[[ "$SAIDA" == /* && "$SAIDA" != "/" && "$SAIDA" != "$HOME" ]] \
  || { echo "Use um caminho absoluto seguro como pasta de saída."; exit 1; }

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
WWWROOT="$RAIZ/backend/CatalogoCursos/wwwroot"

echo "==> Compilando o front-end"
(cd "$RAIZ/frontend" && npm run build)

echo "==> Copiando o front compilado para wwwroot"
mkdir -p "$WWWROOT"
find "$WWWROOT" -mindepth 1 ! -name '.gitkeep' -delete
cp -r "$RAIZ/frontend/dist/." "$WWWROOT/"

echo "==> Publicando o back-end em $SAIDA"
rm -rf "$SAIDA"
(cd "$RAIZ/backend/CatalogoCursos" && dotnet publish -c Release -o "$SAIDA" > /dev/null)
