# Limitações, itens não concluídos e diferenças em relação ao Figma

## 1. Limitações e itens não concluídos

| Item | Situação | Observação |
|---|---|---|
| Integração com Moodle | Não realizada | Diferencial; o enunciado dispensa |
| Gerenciamento de cursos (cadastro, edição, exclusão) | Fora do escopo | Previsto como não necessário no enunciado |
| Matrícula e autenticação | Não implementadas | "Matricule-se" e "Área do aluno" levam à sala de aula de demonstração |
| Persistência do banco | Sem persistência | SQLite dentro do contêiner, recriado a cada reinício; o catálogo é somente leitura |
| Hospedagem | Plano gratuito do Render | Repouso após cerca de 15 minutos sem acesso; a primeira requisição pode levar cerca de 1 minuto |
| Dockerfile | Não executado localmente com Docker | Validado por `scripts/testar-publicacao.sh` (mesmas etapas) e pelo build do Render |
| Busca por nome | Feita em memória | Remove acentos e ignora maiúsculas; adequada ao volume atual, não a milhares de cursos |
| Vídeo | Sem reprodução | Há apenas a imagem de capa, sem arquivo de vídeo fornecido |
| Links do cabeçalho e do rodapé | Parte sem destino | Ex.: Certificação, Blog, Termos de Uso; não há páginas no protótipo |
| Testes automatizados | Não incluídos | Validação manual e por `scripts/verificar.sh` |
| Medições de Lighthouse e axe | A registrar | Resultados serão incluídos após a revisão final |

## 2. Diferenças entre o Figma e a aplicação

O protótipo foi acessado apenas no modo de apresentação; o arquivo de design (com CSS e medidas) não estava disponível. Cores foram medidas no protótipo e nos SVGs, e a fonte (Open Sans) foi confirmada no material recebido. O restante foi estimado a partir de capturas de tela.

| # | Item | Figma | Aplicação | Justificativa |
|---|---|---|---|---|
| 1 | Página de catálogo (`/cursos`) | Não existe | Criada com busca, filtros, contador, limpar filtros e estados | Exigência do enunciado; reutiliza cards, cores, tipografia e botões do Figma |
| 2 | Estados de carregamento, erro e vazio | Não desenhados | Criados no mesmo estilo visual | Exigência do enunciado |
| 3 | Versão mobile | Somente desktop | Definida neste projeto | Exigência de responsividade |
| 4 | Fotos dos cards de curso | Fotos do projeto | Fotos gratuitas de banco de imagens, escolhidas pelo tema | As imagens dos cards não foram fornecidas |
| 5 | Categorias | Matemática e Ciências da Natureza | Acrescentada Linguagens, com 2 cursos novos (7 e 8) | Mínimo de 3 categorias; os ícones de Linguagens foram fornecidos |
| 6 | Cor da tag Linguagens | Não definida | `#CFE3FF` | Estimada |
| 7 | Modalidade, status, carga horária e público-alvo | Não aparecem | Exibidos nos cards do catálogo e no topo da página de detalhes | Campos obrigatórios do curso |
| 8 | Texto dos módulos | Módulos do exemplo | Módulos, descrições e aulas do seed | O enunciado pede dados fictícios; o conteúdo pode ser inventado |
| 9 | Aulas e dúvidas frequentes em cursos presenciais | Textos "online" | Variante presencial nas perguntas 1, 2 e 8 e no bloco de aulas | Evitar informação incoerente com a modalidade |
| 10 | Ícones (setas, estrela, lupa, play, calendário, medalha etc.) | Arquivos do Figma | Parte desenhada em SVG inline | Controle de cor por CSS e ausência de arquivos equivalentes |
| 11 | Degradê dos cards e camada vermelha do hero | Efeito visual do Figma | Aproximados por CSS | Valores exatos não acessíveis |
| 12 | Tamanhos, espaçamentos, raios e sombras | Valores do Figma | Estimados por captura | Sem acesso ao arquivo de design |
| 13 | Cinza do texto secundário | Valor do Figma | `#5A5A5A` provisório | A medição inicial não era confiável |
| 14 | Carrosséis | Cards sangram até a borda da tela | Recortados no contêiner | Simplificação de layout |
| 15 | "Matricule-se" e "Mandar uma mensagem" | Sem destino definido | Levam à sala de aula e abrem o e-mail de contato | Não há fluxo de matrícula no escopo |
| 16 | Sala de aula | Conteúdo de uma aula do curso 1 | Conteúdo "Boas práticas" generalizado com o nome do curso; demais aulas exibem descrição e duração; progresso calculado | Dados fictícios e reaproveitamento para todos os cursos |
| 17 | Banner da sala de aula | Um banner | Mesmo banner em todos os cursos; proporção estimada | Apenas um arquivo fornecido |
| 18 | Menu de módulos da sala | Sem indicador de abrir e fechar | Mantido sem indicador; estado exposto por `aria-expanded` | Fidelidade ao Figma |