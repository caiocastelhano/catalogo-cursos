using CatalogoCursos.Models;

namespace CatalogoCursos.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Cursos.Any()) return;
        db.Cursos.AddRange(ObterCursos());
        db.SaveChanges();
    }

    private static Modulo Criar(int ordem, string titulo, string descricao,
        params (string Titulo, string Descricao)[] aulas) => new()
    {
        Ordem = ordem,
        Titulo = titulo,
        Descricao = descricao,
        Aulas = aulas.Select((a, i) => new Aula
        {
            Ordem = i + 1,
            Titulo = a.Titulo,
            Descricao = a.Descricao,
            DuracaoMinutos = 15 + ((ordem + i) % 4) * 5
        }).ToList()
    };

    private static Modulo Introducao() => Criar(1, "Introdução",
        "Apresentação do curso, boas práticas de estudo e materiais extras.",
        ("Introdução", "Visão geral dos objetivos, da metodologia e da forma de avaliação do curso."),
        ("Boas práticas", "Orientações para organizar a rotina de estudos e aproveitar o ambiente online."),
        ("Extras", "Materiais complementares, glossário e leituras sugeridas."));

    private static Modulo Mod(int numero, string descricao,
        params (string Titulo, string Descricao)[] aulas) =>
        Criar(numero + 1, $"Módulo {numero}", descricao, aulas);

    private static List<Curso> ObterCursos() => new()
    {
        new Curso
        {
            NomeCompleto = "Matemática para a Precisão: Medidas e Escalas na Metalurgia",
            NomeBreve = "Matemática para a Precisão",
            Descricao = "Aplicação de grandezas, proporções e escalas em processos de corte, furação e usinagem.",
            Sobre = "Explore nosso curso de Matemática para a Precisão: Medidas e Escalas na Metalurgia, perfeito para quem deseja se destacar nesse campo! Este programa abrangente foi desenvolvido para capacitar profissionais com as habilidades e conhecimentos fundamentais para garantir medições precisas e eficientes no ambiente metalúrgico.",
            Categoria = "Matemática", Modalidade = "Online", CargaHoraria = 40,
            PublicoAlvo = "Operadores, auxiliares e técnicos da área metalúrgica",
            Status = "Em andamento", ImagemUrl = "/img/curso-1.webp",
            DataDisponibilizacao = new DateOnly(2026, 1, 5), Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Grandezas e unidades usadas na oficina.",
                    ("Sistema Internacional de Unidades", "Principais grandezas e conversões usadas na oficina."),
                    ("Instrumentos de medição", "Uso e leitura de paquímetro, micrômetro e trena.")),
                Mod(2, "Razões e proporções aplicadas a peças e componentes.",
                    ("Razão e proporção na prática", "Cálculo de proporções em peças e componentes."),
                    ("Regra de três em processos", "Aplicação em consumo de material e tempo de produção.")),
                Mod(3, "Escalas e interpretação de desenhos técnicos.",
                    ("Leitura de escalas", "Interpretação de escalas de redução e ampliação."),
                    ("Cotas e dimensões", "Leitura de cotas em desenhos de peças.")),
                Mod(4, "Limites de variação dimensional e encaixes.",
                    ("Conceito de tolerância", "Limites aceitáveis de variação dimensional."),
                    ("Ajustes entre peças", "Folgas e interferências em encaixes.")),
                Mod(5, "Cálculos de parâmetros de corte e posicionamento.",
                    ("Velocidade de corte", "Cálculo de rotação e avanço."),
                    ("Posicionamento de furos", "Coordenadas e espaçamento de furações.")),
                Mod(6, "Aplicação integrada em operações de usinagem.",
                    ("Planejamento de usinagem", "Sequência de operações e cálculo de tempos."),
                    ("Estudo de caso", "Resolução de um problema completo de medição."))
            }
        },
        new Curso
        {
            NomeCompleto = "Geometria e Modelagem no Design Têxtil",
            NomeBreve = "Geometria no Design Têxtil",
            Descricao = "Explora formas geométricas, simetria e padrões matemáticos presentes em tecidos e estampas.",
            Sobre = "Curso sobre o uso de formas geométricas, simetria e repetição na criação de estampas e na construção de moldes. O conteúdo relaciona conceitos de geometria com o trabalho de modelagem e de aproveitamento de tecido.",
            Categoria = "Matemática", Modalidade = "Presencial", CargaHoraria = 30,
            PublicoAlvo = "Estilistas, modelistas e profissionais da confecção",
            Status = "Em andamento", ImagemUrl = "/img/curso-2.webp",
            DataDisponibilizacao = new DateOnly(2026, 3, 2), Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Figuras planas e padrões de repetição.",
                    ("Figuras planas", "Polígonos e círculos aplicados a estampas."),
                    ("Simetria e repetição", "Reflexão, rotação e repetição em padrões.")),
                Mod(2, "Medidas aplicadas a moldes e ao consumo de tecido.",
                    ("Cálculo de áreas", "Estimativa de consumo de tecido."),
                    ("Ângulos e curvas", "Traçado de moldes com ângulos e curvas.")),
                Mod(3, "Criação de estampas com regras geométricas.",
                    ("Malhas e grades", "Construção de grades para repetição de motivos."),
                    ("Projeto de estampa", "Criação de uma estampa a partir de regras geométricas."))
            }
        },
        new Curso
        {
            NomeCompleto = "Estatística e Controle de Qualidade na Produção",
            NomeBreve = "Estatística e Qualidade",
            Descricao = "Leitura e interpretação de dados de controle de qualidade e produtividade.",
            Sobre = "Curso introdutório de estatística aplicada à produção. Os participantes aprendem a organizar dados, calcular indicadores e interpretar cartas de controle para apoiar decisões de qualidade.",
            Categoria = "Matemática", Modalidade = "Online", CargaHoraria = 36,
            PublicoAlvo = "Analistas de qualidade, supervisores e técnicos de produção",
            Status = "Inscrições abertas", ImagemUrl = "/img/curso-3.webp",
            DataDisponibilizacao = new DateOnly(2026, 11, 16), Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Coleta e apresentação de dados da produção.",
                    ("Coleta de dados", "Registro e organização de medições da linha."),
                    ("Tabelas e gráficos", "Apresentação visual de dados de produção.")),
                Mod(2, "Resumo e dispersão de conjuntos de medições.",
                    ("Média, mediana e moda", "Resumo de conjuntos de medições."),
                    ("Dispersão", "Variância e desvio padrão em processos.")),
                Mod(3, "Monitoramento do processo com cartas de controle.",
                    ("Leitura de cartas de controle", "Limites de controle e sinais de alerta."),
                    ("Variações do processo", "Causas comuns e especiais de variação.")),
                Mod(4, "Uso dos dados para melhorar resultados.",
                    ("Indicadores de qualidade", "Taxa de defeitos e eficiência."),
                    ("Plano de ação", "Uso dos dados para propor melhorias."))
            }
        },
        new Curso
        {
            NomeCompleto = "Física do Movimento e da Energia na Metalurgia",
            NomeBreve = "Física na Metalurgia",
            Descricao = "Estudo de forças, atrito, calor e energia em máquinas, fornos e prensas.",
            Sobre = "Curso sobre os princípios de mecânica, energia e calor presentes em máquinas, fornos e prensas. Cada módulo parte de situações reais de manutenção e operação para explicar os conceitos.",
            Categoria = "Ciências da Natureza", Modalidade = "Presencial", CargaHoraria = 48,
            PublicoAlvo = "Técnicos de manutenção e operadores de forno e de prensa",
            Status = "Inscrições abertas", ImagemUrl = "/img/curso-4.webp",
            DataDisponibilizacao = new DateOnly(2026, 12, 7), Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Forças em máquinas e dispositivos.",
                    ("Leis de Newton", "Forças em máquinas e dispositivos de elevação."),
                    ("Atrito e desgaste", "Efeitos do atrito em peças móveis.")),
                Mod(2, "Trabalho, potência e transformações de energia.",
                    ("Trabalho e potência", "Cálculos aplicados a prensas e motores."),
                    ("Conservação de energia", "Transformações de energia na produção.")),
                Mod(3, "Efeitos do calor em peças e fornos.",
                    ("Dilatação térmica", "Efeitos do calor em peças metálicas."),
                    ("Transferência de calor", "Condução, convecção e radiação em fornos."))
            }
        },
        new Curso
        {
            NomeCompleto = "Química e Sustentabilidade",
            NomeBreve = "Química e Sustentabilidade",
            Descricao = "Estudo das reações químicas envolvidas na tinturaria e acabamento de tecidos.",
            Sobre = "Curso sobre as reações químicas usadas em tingimento e acabamento de tecidos e sobre o tratamento de efluentes. O conteúdo inclui práticas para reduzir o consumo de água e de produtos químicos.",
            Categoria = "Ciências da Natureza", Modalidade = "Online", CargaHoraria = 24,
            PublicoAlvo = "Profissionais de tinturaria, acabamento e gestão ambiental",
            Status = "Encerrado", ImagemUrl = "/img/curso-5.webp",
            DataDisponibilizacao = new DateOnly(2026, 2, 9), Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Reações químicas em banhos e processos.",
                    ("Ácidos, bases e pH", "Controle de pH em banhos de tingimento."),
                    ("Oxirredução", "Reações presentes em processos de branqueamento.")),
                Mod(2, "Corantes e etapas de acabamento.",
                    ("Tipos de corantes", "Características e aplicações dos principais corantes."),
                    ("Etapas de acabamento", "Produtos usados e efeitos no tecido.")),
                Mod(3, "Descarte, tratamento e redução de impactos.",
                    ("Impactos ambientais", "Descarte e tratamento de efluentes."),
                    ("Práticas sustentáveis", "Redução do consumo de água e de produtos químicos."))
            }
        },
        new Curso
        {
            NomeCompleto = "Ciência dos Materiais na Metalurgia",
            NomeBreve = "Ciência dos Materiais",
            Descricao = "Conceitos básicos de estrutura, resistência e propriedades dos metais.",
            Sobre = "Curso sobre a estrutura interna dos metais e sua relação com resistência, dureza e desempenho das peças. Inclui critérios para selecionar materiais e tratamentos térmicos.",
            Categoria = "Ciências da Natureza", Modalidade = "Presencial", CargaHoraria = 60,
            PublicoAlvo = "Técnicos, estudantes de engenharia e inspetores de qualidade",
            Status = "Inscrições abertas", ImagemUrl = "/img/curso-6.webp",
            DataDisponibilizacao = null, Destaque = true,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Organização atômica e imperfeições dos metais.",
                    ("Ligações e redes cristalinas", "Organização atômica dos metais."),
                    ("Defeitos cristalinos", "Imperfeições e seu efeito nas propriedades.")),
                Mod(2, "Ensaios e comportamento mecânico.",
                    ("Tração e dureza", "Ensaios e interpretação de resultados."),
                    ("Fadiga e fratura", "Falhas por carregamento repetido.")),
                Mod(3, "Composição e aplicações das principais ligas.",
                    ("Aços e ferros fundidos", "Composição e aplicações."),
                    ("Ligas não ferrosas", "Alumínio, cobre e suas ligas.")),
                Mod(4, "Tratamentos térmicos e escolha de materiais.",
                    ("Tratamentos térmicos", "Têmpera, revenimento e recozimento."),
                    ("Seleção de materiais", "Critérios para escolher o material de uma peça."))
            }
        },
        new Curso
        {
            NomeCompleto = "Comunicação Técnica e Leitura de Manuais na Indústria",
            NomeBreve = "Comunicação Técnica",
            Descricao = "Leitura de manuais, procedimentos e relatórios técnicos usados no dia a dia da indústria.",
            Sobre = "Curso voltado à leitura de manuais e procedimentos e à escrita de registros técnicos. O objetivo é melhorar a compreensão de instruções e a comunicação entre equipes.",
            Categoria = "Linguagens", Modalidade = "Online", CargaHoraria = 20,
            PublicoAlvo = "Operadores, auxiliares e jovens aprendizes",
            Status = "Em andamento", ImagemUrl = "/img/curso-7.webp",
            DataDisponibilizacao = new DateOnly(2026, 9, 14), Destaque = false,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Estrutura e estratégias de leitura de manuais.",
                    ("Estrutura de um manual", "Seções, símbolos e advertências."),
                    ("Estratégias de leitura", "Como localizar e interpretar instruções com rapidez.")),
                Mod(2, "Escrita de instruções e registros.",
                    ("Instruções de trabalho", "Como escrever passos claros e objetivos."),
                    ("Registros de turno", "Anotações claras de ocorrências.")),
                Mod(3, "Linguagem e comunicação entre equipes.",
                    ("Linguagem técnica", "Vocabulário e termos do setor."),
                    ("Passagem de turno", "Comunicação oral objetiva entre equipes."))
            }
        },
        new Curso
        {
            NomeCompleto = "Redação Profissional para o Ambiente Industrial",
            NomeBreve = "Redação Profissional",
            Descricao = "Produção de e-mails, relatórios e comunicados com clareza e objetividade.",
            Sobre = "Curso de escrita profissional com foco em e-mails, comunicados e relatórios. Os participantes praticam estrutura, clareza e revisão de textos usados no dia a dia da indústria.",
            Categoria = "Linguagens", Modalidade = "Presencial", CargaHoraria = 32,
            PublicoAlvo = "Líderes de equipe, supervisores e analistas",
            Status = "Inscrições abertas", ImagemUrl = "/img/curso-8.webp",
            DataDisponibilizacao = new DateOnly(2027, 2, 1), Destaque = false,
            Modulos = new List<Modulo>
            {
                Introducao(),
                Mod(1, "Planejamento e revisão de textos.",
                    ("Planejamento do texto", "Definição de objetivo e de público."),
                    ("Revisão e correção", "Gramática, coesão e clareza.")),
                Mod(2, "Textos usados no cotidiano profissional.",
                    ("E-mails profissionais", "Estrutura, tom e assunto."),
                    ("Comunicados internos", "Informe de mudanças e procedimentos.")),
                Mod(3, "Estrutura e conclusões de relatórios técnicos.",
                    ("Estrutura do relatório", "Introdução, desenvolvimento e conclusão."),
                    ("Dados e recomendações", "Como apresentar resultados e recomendações."))
            }
        }
    };
}