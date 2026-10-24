# Catálogo de cursos SESI+INDÚSTRIA

Aplicação web de catálogo de cursos de um ambiente educacional (Moodle), desenvolvida para a atividade prática do processo seletivo Desenvolvedor de Sistemas I.

- Aplicação publicada: https://catalogo-cursos-q297.onrender.com
- Repositório: https://github.com/caiocastelhano/catalogo-cursos

## 1. Objetivo

Permitir que o usuário liste cursos pela API, pesquise por nome, filtre por categoria, modalidade e status (combinando busca e filtros), veja a quantidade de resultados, limpe os filtros e abra os detalhes de cada curso. O front-end segue o protótipo do Figma fornecido, e todos os dados são fictícios.

## 2. Tecnologias

| Camada | Tecnologia |
|---|---|
| Back-end | C#, .NET 8, ASP.NET Core Minimal API |
| Acesso a dados | Entity Framework Core 8, com migrations |
| Banco de dados | SQLite (código aberto) |
| Documentação da API | Swagger (Swashbuckle) |
| Front-end | React 19, Vite 6, React Router 7, CSS |
| Publicação | Docker (build em 3 etapas) no Render, plano gratuito |

## 3. Arquitetura

Um único deploy: o .NET serve a API em `/api` e o front-end compilado em `wwwroot`.

```
Navegador
   │  HTTPS
   ▼
Kestrel (.NET 8)
   ├── /api/*          Minimal API ──► EF Core ──► SQLite (catalogo.db)
   ├── /assets, /img   arquivos estáticos (wwwroot), com cache e compressão
   └── demais rotas    index.html (o React Router resolve a página)
```

Em desenvolvimento, o Vite serve o front em `http://localhost:5173` e repassa `/api` para a API em `http://localhost:5257`.

## 4. Estrutura de pastas

```
catalogo-cursos/
├── backend/CatalogoCursos/
│   ├── Data/            AppDbContext e DbSeeder
│   ├── Dtos/            objetos de resposta da API
│   ├── Models/          Curso, Modulo, Aula
│   ├── Migrations/      migrations do EF Core
│   ├── Utils/           normalização de texto para a busca
│   └── Program.cs       configuração e endpoints
├── frontend/
│   ├── public/          imagens (.webp) e ícones (.svg)
│   └── src/             api, components, data, hooks, pages, styles, utils
├── scripts/             build, verificação e geração do ZIP
├── docs/                limitações e diferenças em relação ao Figma
├── Dockerfile
├── README.md
└── USO_DE_IA.md
```

## 5. Instruções para execução

Requisitos: .NET SDK 8, Node.js 20 ou superior e bash.

Desenvolvimento, em dois terminais:

```bash
git clone https://github.com/caiocastelhano/catalogo-cursos.git
cd catalogo-cursos

cd backend/CatalogoCursos
dotnet run

cd frontend
npm install
npm run dev
```

A API fica em `http://localhost:5257` (Swagger em `/swagger`) e o front em `http://localhost:5173`.

Execução como em produção, com um único servidor:

```bash
bash scripts/testar-publicacao.sh
cd /tmp/publish-teste && PORT=8099 dotnet CatalogoCursos.dll
```

O primeiro comando compila o front, publica o .NET e executa as verificações. O segundo sobe o servidor em `http://localhost:8099`.

## 6. Configuração do banco

- SQLite, arquivo `catalogo.db` criado no diretório de execução.
- A conexão usa `ConnectionStrings:Default` (padrão `Data Source=catalogo.db`), que pode ser alterada pela variável de ambiente `ConnectionStrings__Default`.
- Na inicialização, a aplicação aplica as migrations e popula os dados fictícios se a tabela de cursos estiver vazia. Nenhuma configuração manual é necessária.
- Para recriar o banco, apague `catalogo.db` e reinicie.
- Nova migration, a partir de `backend/CatalogoCursos`: `dotnet ef migrations add NomeDaMigration`.

Dados: 8 cursos, 3 categorias (Matemática, Ciências da Natureza e Linguagens), 2 modalidades (Presencial e Online) e 3 status (Inscrições abertas, Em andamento e Encerrado), com cargas horárias, módulos, aulas e públicos-alvo diferentes.

## 7. Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/cursos` | Lista cursos, com filtros opcionais |
| GET | `/api/cursos/{id}` | Detalhe do curso, com módulos e aulas |
| GET | `/api/filtros` | Valores disponíveis de categoria, modalidade e status |
| GET | `/healthz` | Verificação de saúde |
| GET | `/swagger` | Documentação interativa |

Parâmetros de `GET /api/cursos`, todos opcionais e combináveis:

| Parâmetro | Efeito |
|---|---|
| `busca` | Nome completo ou breve contém o texto, sem diferenciar acentos nem maiúsculas |
| `categoria` | Igual à categoria |
| `modalidade` | Igual à modalidade |
| `status` | Igual ao status |

A resposta traz `total` e a lista `itens`. `GET /api/cursos/99` devolve 404 no formato Problem Details, e rotas inexistentes sob `/api` também devolvem 404.

## 8. Modelo de dados

| Entidade | Campos | Relação |
|---|---|---|
| Curso | Id, NomeCompleto, NomeBreve, Descricao, Sobre, Categoria, Modalidade, CargaHoraria, PublicoAlvo, Status, ImagemUrl, DataDisponibilizacao (opcional), Destaque | 1 curso tem N módulos |
| Modulo | Id, CursoId, Ordem, Titulo, Descricao | 1 módulo tem N aulas |
| Aula | Id, ModuloId, Ordem, Titulo, Descricao, DuracaoMinutos | pertence a um módulo |

Categoria, modalidade e status são texto, com índice. O catálogo é somente leitura e os valores são poucos, e a lista de valores válidos vem de `GET /api/filtros`.

## 9. Estratégia de responsividade

- Layout fluido com CSS Grid e Flexbox, contêiner de até 1200 px e margens laterais de 24 px.
- Principais pontos de quebra: 1100, 960, 860, 800, 720 e 560 px. Exemplos: os filtros passam de 5 colunas para 2 e depois para 1; hero, detalhes e chamada final viram uma coluna; o cabeçalho passa a ter duas linhas; o rodapé vai de 4 colunas para 2 e para 1; a barra lateral da sala de aula fica acima do conteúdo.
- Títulos com `clamp()`, grade do catálogo com `repeat(auto-fill, minmax(260px, 1fr))` e imagens com `aspect-ratio` e `object-fit: cover`.
- Carrosséis com `scroll-snap`, rolagem por toque e botões.
- O Figma fornecido tem apenas a versão desktop, então o comportamento em telas menores foi definido neste projeto.

## 10. Decisões de acessibilidade

- Idioma `pt-BR`, título por rota e um `h1` por página, com hierarquia de títulos coerente.
- Marcos semânticos (`header`, `nav`, `main`, `aside`, `footer`) e link "Ir para o conteúdo".
- Campos com `label` e busca em `form` com `role="search"`.
- Contagem de resultados em região `aria-live`, carregamento com `role="status"` e erro com `role="alert"` e botão "Tentar novamente".
- Foco visível e navegação completa por teclado, inclusive nos carrosséis.
- Acordeões com `<details>` e `<summary>` nativos, e botões dos carrosséis com rótulo.
- Cada card tem um único link (o título), imagens decorativas com `alt` vazio e imagens informativas com texto alternativo.
- Situações como status do curso e aula concluída sempre em texto, nunca só por cor.
- Alvos de toque de 44 px nos controles principais e respeito a `prefers-reduced-motion`.
- Lighthouse em produção (24/10/2026), página inicial: acessibilidade 100, boas práticas 100 e SEO 100 em desktop e mobile; performance 68 (desktop) e 69 (mobile), limitada pela hospedagem gratuita (ver `docs/LIMITACOES_E_DIFERENCAS.md`).

## 11. Processo de publicação

1. O código fica no GitHub, na branch `main`.
2. No Render, serviço Web com runtime Docker, plano gratuito, região Frankfurt, usando o `Dockerfile` da raiz. A variável `PORT` é fornecida pelo Render.
3. O deploy é feito pelo painel do Render (Manual Deploy do último commit da `main`).
4. O build tem 3 etapas: o Node compila o front, o SDK do .NET publica a API com o front em `wwwroot`, e a imagem final contém só o runtime do ASP.NET.
5. Verificação do publicado: `bash scripts/verificar.sh https://catalogo-cursos-q297.onrender.com`.
6. Pacote de publicação em ZIP: `bash scripts/gerar-zip-publicacao.sh`.

## 12. Limitações conhecidas

- O plano gratuito do Render coloca o serviço em repouso após cerca de 15 minutos sem acesso, e a primeira requisição depois disso pode levar cerca de um minuto.
- O SQLite fica dentro do contêiner e é recriado a cada reinício, o que é aceitável para um catálogo somente leitura.
- Não há cadastro, edição ou exclusão de cursos, matrícula, autenticação ou integração com Moodle.
- A sala de aula é uma demonstração, e o vídeo não tem reprodução.
- Não há testes automatizados; a validação foi manual e pelo script de verificação.
- O `Dockerfile` não foi executado localmente com Docker.

A lista completa, com as diferenças em relação ao Figma e suas justificativas, está em [docs/LIMITACOES_E_DIFERENCAS.md](docs/LIMITACOES_E_DIFERENCAS.md).