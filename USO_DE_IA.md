# Uso de Inteligência Artificial

## Ferramenta

Claude (Anthropic), em chat, como mentor técnico durante todo o desenvolvimento.

## Objetivo do uso

Tenho experiência com React, Next.js e Rails, mas nenhuma com C# e .NET. A IA entrou para encurtar essa curva, não para decidir por mim:

- aprender .NET por equivalência com o que já conheço;
- montar o ambiente, a API, o banco, o Dockerfile e o deploy;
- gerar código, que eu executava e conferia antes de seguir;
- levantar o que o Figma não trazia e redigir a documentação.

As decisões de produto e de arquitetura foram minhas: .NET 8 com Minimal API, Entity Framework Core, SQLite, um único deploy, Render no plano gratuito, escopo dos dados fictícios e fidelidade ao Figma. A IA sugeria opções, e eu escolhia e revisava.

## Como trabalhei

- Um passo por vez, com comandos exatos e a pasta onde rodar.
- Só avançava depois de executar e colar o resultado (ou o erro).
- Pedia comparações com React e Rails para entender cada conceito. Equivalências que usei: rotas da Minimal API ≈ rotas do Express; migrations do EF Core ≈ migrations do Rails; `dotnet publish` ≈ `npm run build`.

## Prompts relevantes

| Pedido (resumo) | Aproveitado | Descartado ou ajustado |
|---|---|---|
| Regras de condução: mentor, um passo por vez, comandos e pastas exatos, comparações com React/Rails, sem inventar conteúdo do Figma | Todo o fluxo de trabalho | Nada |
| API de cursos em .NET com EF Core, SQLite e migrations | Estrutura da API, modelo de dados e migrations | Seed provisório com `HasData`, trocado por um `DbSeeder` quando incluí módulos e aulas |
| Análise das capturas das telas do Figma | Inventário de páginas, textos e dados ausentes | Extração de CSS pelo Inspect, impossível sem acesso ao arquivo de design. Medi as cores com um seletor de cor e documentei o restante como estimado |
| Dockerfile e publicação no Render | Dockerfile em 3 etapas e scripts de verificação | Dockerfile dentro de `backend/`, que movi para a raiz |
| Componentes do front-end e ajustes finos | Componentes, rotas e estados de interface | Pontos que divergiam do Figma e que apontei em revisão visual (navbar, hover, barra de progresso, rolagem) |

## Como validei

- **Execução:** `dotnet build`, `curl` nos endpoints com totais esperados, `npm ci` e `npm run build`.
- **Publicação:** `scripts/testar-publicacao.sh`, que simula o build do Docker (não tenho Docker local), e `scripts/verificar.sh`, com 20 checagens na URL do Render.
- **Visual:** comparei cada tela com o Figma e corrigi as diferenças.
- **Repositório:** `git status` conferido para não versionar `bin/`, `obj/`, banco nem imagens originais pesadas.

## Erros e inadequações da IA

1. **Deploy no Render.** A IA afirmou que cada `git push` dispararia um build e que o deploy falharia por imagens ausentes. Os dois pontos estavam errados: a URL continuou na versão do dia anterior, e o painel (Events) não mostrava evento novo, porque o deploy automático não estava ativo. *Correção:* Manual Deploy do último commit, confirmado pelas 20 checagens de `verificar.sh`, e documentação ajustada.
2. **Shell.** A IA assumiu bash, mas uso zsh: `--version 8.*` sem aspas falhou com `no matches found`, e ela indicou `~/.bashrc`. *Correção:* aspas na versão e `~/.zshrc`.
3. **Dockerfile.** A IA colocou o arquivo em `backend/`, o que impediria compilar o front na mesma imagem. *Correção:* movi para a raiz e ele passou a ter uma etapa de build do Node.

## Limite da IA

Ela não conseguiu abrir o link do Figma. Todo o conteúdo veio de capturas (de cores, feita pela ferramenta PowerToys) e textos que eu forneci, e o que o Figma não mostra está registrado como decisão minha em `docs/LIMITACOES_E_DIFERENCAS.md`.

## O que entreguei sem experiência prévia em .NET

API REST com Minimal API, EF Core com migrations e seed, DTOs, Swagger, erros no formato Problem Details, servidor de arquivos estáticos com fallback para a SPA, compressão e cache, Docker em múltiplas etapas e scripts de verificação. Cada etapa foi executada e testada antes da seguinte.