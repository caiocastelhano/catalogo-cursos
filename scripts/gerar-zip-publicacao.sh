#!/usr/bin/env bash
set -euo pipefail

command -v zip > /dev/null || { echo "Instale o zip: sudo apt install -y zip"; exit 1; }

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
DESTINO="$RAIZ/catalogo-cursos-publicacao.zip"

cd "$RAIZ"
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "AVISO: há alterações sem commit; o ZIP inclui apenas o que está versionado."
fi

bash "$RAIZ/scripts/construir.sh" "$TMP/app-publicada"

mkdir -p "$TMP/fonte-para-publicar"
git ls-files -z | xargs -0 cp --parents -t "$TMP/fonte-para-publicar"

cat > "$TMP/LEIA-ME.txt" <<'EOF'
Catálogo de cursos SESI+INDÚSTRIA - arquivos de publicação

app-publicada/
  Aplicação compilada (API em .NET 8 + front-end em wwwroot).
  Para executar (requer o ASP.NET Core Runtime 8):
    cd app-publicada
    PORT=8080 dotnet CatalogoCursos.dll
  Acesse http://localhost:8080. O banco SQLite (catalogo.db) é criado e populado
  automaticamente na primeira execução.

fonte-para-publicar/
  Código-fonte versionado, incluindo o Dockerfile usado na publicação (Render).
  Instruções completas em fonte-para-publicar/README.md.
EOF

rm -f "$DESTINO"
(cd "$TMP" && zip -qr "$DESTINO" .)
echo "ZIP gerado: $DESTINO ($(du -h "$DESTINO" | cut -f1))"
rm -rf "$TMP"
