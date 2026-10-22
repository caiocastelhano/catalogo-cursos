using CatalogoCursos.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogoCursos.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Curso> Cursos => Set<Curso>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Curso>().HasData(
            new Curso
            {
                Id = 1,
                NomeCompleto = "Introdução à Automação Industrial",
                NomeBreve = "Automação",
                Descricao = "Fundamentos de sensores, atuadores e controladores.",
                Categoria = "Tecnologia",
                Modalidade = "EAD",
                CargaHoraria = 40,
                PublicoAlvo = "Iniciantes na área técnica",
                Status = "Disponível",
                ImagemUrl = "/img/curso-1.jpg",
                DataDisponibilizacao = new DateOnly(2026, 3, 1)
            },
            new Curso
            {
                Id = 2,
                NomeCompleto = "Gestão de Projetos para Equipes Industriais",
                NomeBreve = "Gestão de Projetos",
                Descricao = "Planejamento, cronograma e acompanhamento de entregas.",
                Categoria = "Gestão",
                Modalidade = "Presencial",
                CargaHoraria = 60,
                PublicoAlvo = "Líderes e coordenadores",
                Status = "Disponível",
                ImagemUrl = "/img/curso-2.jpg",
                DataDisponibilizacao = new DateOnly(2026, 4, 15)
            },
            new Curso
            {
                Id = 3,
                NomeCompleto = "Segurança do Trabalho na Prática",
                NomeBreve = "Segurança",
                Descricao = "Normas, prevenção de acidentes e uso de EPIs.",
                Categoria = "Saúde e Segurança",
                Modalidade = "EAD",
                CargaHoraria = 20,
                PublicoAlvo = "Todos os colaboradores",
                Status = "Disponível",
                ImagemUrl = "/img/curso-3.jpg",
                DataDisponibilizacao = new DateOnly(2026, 2, 10)
            },
            new Curso
            {
                Id = 4,
                NomeCompleto = "Análise de Dados com Planilhas",
                NomeBreve = "Dados",
                Descricao = "Tabelas dinâmicas, fórmulas e visualização de indicadores.",
                Categoria = "Tecnologia",
                Modalidade = "Presencial",
                CargaHoraria = 30,
                PublicoAlvo = "Profissionais administrativos",
                Status = "Em breve",
                ImagemUrl = "/img/curso-4.jpg",
                DataDisponibilizacao = new DateOnly(2026, 12, 1)
            },
            new Curso
            {
                Id = 5,
                NomeCompleto = "Liderança e Comunicação",
                NomeBreve = "Liderança",
                Descricao = "Feedback, condução de reuniões e comunicação com equipes.",
                Categoria = "Gestão",
                Modalidade = "EAD",
                CargaHoraria = 45,
                PublicoAlvo = "Gestores em início de carreira",
                Status = "Em breve",
                ImagemUrl = "/img/curso-5.jpg",
                DataDisponibilizacao = new DateOnly(2027, 1, 20)
            },
            new Curso
            {
                Id = 6,
                NomeCompleto = "Ergonomia e Qualidade de Vida no Trabalho",
                NomeBreve = "Ergonomia",
                Descricao = "Organização do posto de trabalho e prevenção de lesões.",
                Categoria = "Saúde e Segurança",
                Modalidade = "Presencial",
                CargaHoraria = 16,
                PublicoAlvo = "Equipes operacionais",
                Status = "Encerrado",
                ImagemUrl = "/img/curso-6.jpg",
                DataDisponibilizacao = new DateOnly(2025, 8, 5)
            }
        );
    }
}