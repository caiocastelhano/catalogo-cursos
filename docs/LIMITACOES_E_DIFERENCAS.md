# Limitações, itens não concluídos e diferenças em relação ao Figma

## 1. Limitações e itens não concluídos

| Item | Situação | Observação |
|---|---|---|
| Integração com Moodle | Não realizada | Diferencial; o enunciado dispensa |
| Cadastro, edição e exclusão de cursos | Fora do escopo | O enunciado informa que não é necessário |
| Matrícula e autenticação | Não implementadas | "Matricule-se" e "Área do aluno" levam à sala de aula de demonstração |
| Persistência do banco | Sem persistência | SQLite dentro do contêiner, recriado a cada reinício; o catálogo é somente leitura |
| Hospedagem | Plano gratuito do Render | Repouso após cerca de 15 minutos sem acesso; a primeira requisição pode levar cerca de 1 minuto |
| Dockerfile | Não executado localmente com Docker | Validado por `scripts/testar-publicacao.sh`, que repete as mesmas etapas, e pelo build do Render |
| Busca por nome | Feita em memória | Ignora acentos e maiúsculas; adequada ao volume atual |
| Vídeo | Sem reprodução | Apenas a imagem de capa, sem arquivo de vídeo fornecido |
| Links do cabeçalho e do rodapé | Parte sem destino | Ex.: Certificação, Blog, Termos de Uso; o protótipo não tem essas páginas |
| Testes automatizados | Não incluídos | Validação manual e por `scripts/verificar.sh` |
| Desempenho (Lighthouse) | Performance de 68 (desktop) e 69 (mobile) na página inicial | Servidor gratuito em Frankfurt com 0,1 CPU e SPA renderizada no cliente (HTML, JS e depois API). FCP de 2,5 s (desktop) e 3,7 s (mobile); CLS 0; acessibilidade, boas práticas e SEO em 100 |

## 2. Diferenças entre o Figma e a aplicação

O protótipo foi acessado apenas no modo de apresentação, sem acesso ao arquivo de design. As cores foram medidas no protótipo e nos SVGs, e a fonte (Open Sans) foi confirmada no material recebido. O restante foi estimado a partir de capturas de tela.

| # | Item | Figma | Aplicação | Justificativa |
|---|---|---|---|---|
| 1 | Página de catálogo (`/cursos`) | Não existe | Criada, com busca, filtros, contador, limpar filtros e estados | Exigência do enunciado; reutiliza cards, cores, tipografia e botões do Figma |
| 2 | Estados de carregamento, erro e vazio | Não desenhados | Criados no mesmo estilo | Exigência do enunciado |
| 3 | Versão mobile | Somente desktop | Definida neste projeto, com cabeçalho em duas linhas e rodapé em 1 ou 2 colunas | Exigência de responsividade |
| 4 | Fotos dos cards | Fotos do projeto | Fotos gratuitas de banco de imagens, escolhidas pelo tema | As imagens dos cards não foram fornecidas |
| 5 | Categorias | Matemática e Ciências da Natureza | Acrescentada Linguagens, com 2 cursos novos (7 e 8) | Mínimo de 3 categorias; os ícones de Linguagens foram fornecidos |
| 6 | Cor da tag Linguagens | Não definida | `#CFE3FF` | Estimada |
| 7 | Modalidade, status, carga horária e público-alvo | Não aparecem | Exibidos nos cards do catálogo e no topo dos detalhes | Campos obrigatórios do curso |
| 8 | Texto dos módulos | Módulos do exemplo | Módulos, descrições e aulas do seed | O enunciado pede dados fictícios |
| 9 | Aulas e dúvidas frequentes em cursos presenciais | Textos "online" | Variante presencial nas perguntas 1, 2 e 8 e no bloco de aulas | Evitar informação incoerente com a modalidade |
| 10 | Ícones (setas, estrela, lupa, play, calendário, medalha etc.) | Arquivos do Figma | Parte desenhada em SVG | Controle de cor por CSS e ausência de arquivos equivalentes |
| 11 | Degradê dos cards, camada vermelha do hero e gradiente da imagem da chamada final | Efeitos do Figma | Aproximados por CSS | Valores exatos não acessíveis |
| 12 | Tamanhos, espaçamentos, raios e sombras | Valores do Figma | Estimados por captura | Sem acesso ao arquivo de design |
| 13 | Cinza do texto secundário | Valor do Figma | `#5A5A5A` | Medição inicial não confiável |
| 14 | Carrosséis | Cards sangram até a borda da tela | Recortados no contêiner | Simplificação de layout |
| 15 | "Matricule-se" e "Mandar uma mensagem" | Sem destino definido | Levam à sala de aula e abrem o e-mail de contato | Não há fluxo de matrícula no escopo |
| 16 | Sala de aula | Conteúdo de uma aula do curso 1 | "Boas práticas" generalizado com o nome do curso; demais aulas mostram descrição e duração; progresso calculado | Dados fictícios reaproveitados para todos os cursos |
| 17 | Banner da sala de aula | Um banner | Mesmo banner em todos os cursos; proporção estimada | Apenas um arquivo fornecido |
| 18 | Menu de módulos da sala | Sem indicador de abrir e fechar | Mantido sem indicador; estado exposto por `aria-expanded` | Fidelidade ao Figma |
| 19 | Cargo nos depoimentos da página de detalhes | `#BDBDBD` | `#767676` | O valor do Figma tem contraste de cerca de 1,9:1 sobre fundo branco, abaixo dos 4,5:1 da WCAG AA; o tom escolhido atinge 4,5:1 e continua sendo um cinza claro |
| 20 | Barra de rolagem do conteúdo da sala | Sem barra visível | Oculta; a rolagem funciona por mouse, toque e teclado | Fidelidade ao Figma, com a área de conteúdo focável por teclado |