# Uso de Inteligência Artificial

## Ferramenta utilizada
Claude (Anthropic), em conversa de chat, como mentor para planejamento e apoio ao desenvolvimento.

## Objetivo do uso
- Planejar o cronograma do teste a partir do enunciado e do prazo.
- Guiar a configuração do ambiente e a criação da primeira API em .NET, já que não tenho experiência prévia com a plataforma.
- Explicar conceitos do .NET comparando com tecnologias que já uso (React, Rails).

As decisões de produto e de arquitetura são minhas. A IA sugeriu opções e eu escolhi.

## Prompts relevantes

| Etapa | Prompt (resumo) | Aproveitado | Descartado ou alterado |
|---|---|---|---|
| Planejamento | Plano de ação para o teste, com base no enunciado | Ordem das etapas, checklist de entregáveis, prioridades | Estimativa inicial de 5 a 6 dias, refeita para o prazo real (até 26/10, 8h) |
| Planejamento | Ajuste do plano por falta de experiência em .NET | Uso de Minimal API, EF Core e deploy único com Docker | Cronograma anterior, que antecipava a análise do Figma |
| Condução | Prompt para guiar o desenvolvimento passo a passo | Estrutura de 15 etapas, um passo por vez | — |
| Passo 1 | Instalação do ambiente no Ubuntu | Instalação do .NET 8 SDK via `apt`, criação do repositório com `gh` | Comandos de PATH escritos para `~/.bashrc` (uso zsh, então usei `~/.zshrc`) |
| Passo 2 | Criação do projeto Minimal API | Comandos `dotnet new web` e `dotnet watch run`, explicação dos arquivos gerados | — |
| Passo 3 | Instalação do EF Core com SQLite | Pacotes `Microsoft.EntityFrameworkCore.Sqlite` e `Microsoft.EntityFrameworkCore.Design`, versão 8.x | — |
| Passo 4 | Modelo `Curso`, `AppDbContext` e seed provisório | Estrutura das classes e dados fictícios | Seed será substituído pelos dados do Figma |
| Passo 5 | Migration, banco SQLite e endpoint `GET /api/cursos` | `Program.cs` com `Migrate()` e rota de listagem | — |
| Passo 6 | `Dockerfile` multi-stage e leitura da porta pela variável `PORT` | Estrutura do Dockerfile e ajuste no `Program.cs` | Local do Dockerfile (a IA sugeriu antes dentro de `backend/`; movi para a raiz). Docker não instalado localmente: validei com `dotnet publish` e execução do binário |
| Passo 7 | Pesquisa das condições do plano gratuito do Render e alternativas | Configuração do serviço (Docker, plano Free), alternativas de hospedagem | Conclusões sobre cartão de crédito: as fontes divergiam, então conferi na tela de criação |
| Passo 8 | Estrutura do README com as seções exigidas | Esqueleto das 12 seções | Itens ainda não implementados marcados como "a preencher" |

## Como o conteúdo foi validado
- Cada instalação foi conferida com comandos de versão (`dotnet --version`, `dotnet ef --version`, `git --version`).
- O projeto foi executado localmente e a resposta foi conferida no navegador.
- O hot reload foi testado alterando o texto da rota e verificando a atualização.
- O `git status` foi usado para confirmar que `bin/` e `obj/` não entram no repositório.
- Os pacotes do EF Core foram conferidos no `.csproj` e o projeto foi compilado com `dotnet build`.
- Mensagens de erro foram lidas e diagnosticadas antes de aplicar qualquer correção.
- A migration foi lida antes de ser aplicada, e o JSON de `/api/cursos` foi conferido com `curl`.
- O deploy foi validado acessando a URL publicada e conferindo o JSON de `/api/cursos` (6 cursos, banco criado do zero no servidor).
- As informações sobre o plano gratuito vieram de pesquisa na web e foram conferidas na tela do Render (plano Free, `$0 / month`).

## Exemplo de erro ou inadequação identificado
O comando de instalação do `dotnet-ef` sugerido pela IA usava `--version 8.*` sem aspas. No zsh, o asterisco é interpretado como padrão de arquivos e o comando falhou com `zsh: no matches found: 8.*`. Como consequência, o `dotnet-ef` não foi instalado e o `dotnet ef --version` retornou "command not found".

Outra inadequação: a IA assumiu o bash e indicou editar `~/.bashrc` para configurar o PATH, mas o meu shell é zsh.

## Correção realizada
- Comando corrigido com aspas: `dotnet tool install --global dotnet-ef --version "8.*"`. A instalação passou a funcionar (versão 8.0.32).
- A configuração do PATH foi feita em `~/.zshrc` e a verificação com `dotnet ef --version` confirmou o resultado.
- Passei a usar aspas em versões com curinga nos comandos seguintes (por exemplo, nos pacotes do EF Core).

## Observações
- Ao rodar `apt update`, apareceu um aviso de chave GPG do repositório do GitHub CLI. Ele não afetou a instalação do .NET e foi ignorado.
- Ao iniciar o `dotnet watch run`, ocorreu o erro `address already in use` na porta 5257, porque a instância do `dotnet run` do passo anterior continuava ativa em outra aba do terminal. A IA não havia avisado para encerrá-la antes. Resolvi fechando a aba com a instância ativa.
- A IA não conseguiu abrir o link do protótipo do Figma, então o conteúdo do protótipo será fornecido a ela por capturas de tela e textos copiados, e o modelo de dados e o seed provisório serão ajustados depois.
- Ao orientar o deploy, a IA assumiu que os três serviços existentes na minha conta do Render eram gratuitos e alertou sobre conflito de horas gratuitas. Os serviços eram pagos (outra aplicação minha em produção) e não consomem essas horas. A IA corrigiu a conclusão e recomendou criar um workspace separado para o teste, o que fiz.