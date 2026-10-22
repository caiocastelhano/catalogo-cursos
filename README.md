# Catálogo de Cursos

Aplicação web para consulta, pesquisa e filtro de cursos de um ambiente educacional Moodle, desenvolvida como atividade prática do processo seletivo de Desenvolvedor de Sistemas I (CTED/SESI-SP). Todos os dados são fictícios.

- **Aplicação publicada:** https://catalogo-cursos-q297.onrender.com
- **Repositório:** https://github.com/caiocastelhano/catalogo-cursos

> Status: em desenvolvimento. As seções marcadas com *(a preencher)* serão completadas conforme as etapas forem concluídas.

## Objetivo da aplicação

Permitir que o usuário consulte, pesquise e filtre os cursos disponíveis e visualize os detalhes de cada oferta. Não há cadastro, edição ou exclusão de cursos, e não há integração com um ambiente Moodle real.

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Back-end | C# com .NET 8 (ASP.NET Core Minimal API) |
| Acesso a dados | Entity Framework Core 8 (migrations e seed) |
| Banco de dados | SQLite (código aberto) |
| Front-end | *(a preencher)* |
| Contêiner | Docker (build em múltiplos estágios) |
| Publicação | Render, plano gratuito |
| Controle de versão | Git e GitHub |

## Arquitetura da solução

*(a preencher: diagrama e descrição do fluxo front-end, API e banco)*

Visão atual:

- A API em .NET expõe os dados dos cursos em JSON.
- O EF Core aplica as migrations na inicialização e carrega o seed, então o banco é recriado automaticamente quando não existe.
- A aplicação lê a porta da variável de ambiente `PORT`, usada pela hospedagem.

## Estrutura das pastas

```
catalogo-cursos/
├── backend/
│   └── CatalogoCursos/
│       ├── Data/            # AppDbContext e seed
│       ├── Models/          # Entidade Curso
│       ├── Migrations/      # Migrations do EF Core
│       ├── Program.cs       # Configuração e rotas
│       └── CatalogoCursos.csproj
├── frontend/                # (a preencher)
├── docs/
├── Dockerfile
├── .dockerignore
├── README.md
└── USO_DE_IA.md
```

## Instruções para execução

### Pré-requisitos
- .NET 8 SDK

### Executar a API localmente

```bash
git clone https://github.com/caiocastelhano/catalogo-cursos.git
cd catalogo-cursos/backend/CatalogoCursos
dotnet run
```

A API escuta na porta indicada no terminal (por padrão, `http://localhost:5257`). O banco `catalogo.db` é criado na primeira execução.

### Executar com Docker

```bash
docker build -t catalogo-cursos .
docker run --rm -p 8080:8080 catalogo-cursos
```

A API fica disponível em `http://localhost:8080`.

*(a preencher: execução do front-end e da aplicação integrada)*

## Configuração do banco

- Banco: SQLite, em arquivo local (`catalogo.db`).
- A string de conexão padrão é `Data Source=catalogo.db`. Pode ser alterada pela configuração `ConnectionStrings:Default`.
- As migrations ficam em `backend/CatalogoCursos/Migrations` e são aplicadas automaticamente ao iniciar a aplicação.
- O seed (6 cursos fictícios) está em `Data/AppDbContext.cs`.

Para gerar uma nova migration:

```bash
cd backend/CatalogoCursos
dotnet ef migrations add NomeDaMigration
```

## Endpoints

| Método | Rota | Descrição | Situação |
|---|---|---|---|
| GET | `/` | Verificação de funcionamento | Implementado |
| GET | `/api/cursos` | Lista os cursos | Implementado |
| GET | `/api/cursos?busca=&categoria=&modalidade=&status=` | Lista com pesquisa e filtros combinados | *(a implementar)* |
| GET | `/api/cursos/{id}` | Detalhes de um curso | *(a implementar)* |
| GET | `/api/filtros` | Opções de categoria, modalidade e status | *(a implementar)* |

## Modelo de dados

Entidade `Curso` (estado atual):

| Campo | Tipo | Observação |
|---|---|---|
| Id | inteiro | Chave primária |
| NomeCompleto | texto | |
| NomeBreve | texto | |
| Descricao | texto | |
| Categoria | texto | |
| Modalidade | texto | |
| CargaHoraria | inteiro | Em horas |
| PublicoAlvo | texto | |
| Status | texto | |
| ImagemUrl | texto | |
| DataDisponibilizacao | data (opcional) | Quando aplicável |

*(a preencher: módulos e descrições de aulas, após a análise do protótipo)*

## Estratégia de responsividade

*(a preencher)*

## Decisões de acessibilidade

*(a preencher)*

## Processo de publicação

1. O repositório está conectado ao Render, que constrói a imagem a partir do `Dockerfile` na raiz.
2. O serviço foi criado como *Web Service*, runtime Docker, plano gratuito, a partir da branch `main`.
3. A hospedagem define a variável `PORT`, que a aplicação lê na inicialização.
4. O banco é criado pelas migrations a cada início do contêiner.

## Limitações conhecidas

- O serviço gratuito entra em repouso após período sem acessos. A primeira requisição depois do repouso pode levar cerca de um minuto.
- O banco SQLite fica dentro do contêiner e é recriado a cada reinício. Como o catálogo é somente de leitura, não há perda de dados, mas o banco não é persistente.
- O `Dockerfile` não foi executado localmente com Docker. Foi validado por `dotnet publish` em modo Release, execução do binário publicado e pelo build na hospedagem.
- *(a preencher: itens não concluídos e diferenças entre o Figma e a aplicação, com justificativas)*