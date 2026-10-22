using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CatalogoCursos.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cursos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NomeCompleto = table.Column<string>(type: "TEXT", nullable: false),
                    NomeBreve = table.Column<string>(type: "TEXT", nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false),
                    Categoria = table.Column<string>(type: "TEXT", nullable: false),
                    Modalidade = table.Column<string>(type: "TEXT", nullable: false),
                    CargaHoraria = table.Column<int>(type: "INTEGER", nullable: false),
                    PublicoAlvo = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    ImagemUrl = table.Column<string>(type: "TEXT", nullable: false),
                    DataDisponibilizacao = table.Column<DateOnly>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursos", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Cursos",
                columns: new[] { "Id", "CargaHoraria", "Categoria", "DataDisponibilizacao", "Descricao", "ImagemUrl", "Modalidade", "NomeBreve", "NomeCompleto", "PublicoAlvo", "Status" },
                values: new object[,]
                {
                    { 1, 40, "Tecnologia", new DateOnly(2026, 3, 1), "Fundamentos de sensores, atuadores e controladores.", "/img/curso-1.jpg", "EAD", "Automação", "Introdução à Automação Industrial", "Iniciantes na área técnica", "Disponível" },
                    { 2, 60, "Gestão", new DateOnly(2026, 4, 15), "Planejamento, cronograma e acompanhamento de entregas.", "/img/curso-2.jpg", "Presencial", "Gestão de Projetos", "Gestão de Projetos para Equipes Industriais", "Líderes e coordenadores", "Disponível" },
                    { 3, 20, "Saúde e Segurança", new DateOnly(2026, 2, 10), "Normas, prevenção de acidentes e uso de EPIs.", "/img/curso-3.jpg", "EAD", "Segurança", "Segurança do Trabalho na Prática", "Todos os colaboradores", "Disponível" },
                    { 4, 30, "Tecnologia", new DateOnly(2026, 12, 1), "Tabelas dinâmicas, fórmulas e visualização de indicadores.", "/img/curso-4.jpg", "Presencial", "Dados", "Análise de Dados com Planilhas", "Profissionais administrativos", "Em breve" },
                    { 5, 45, "Gestão", new DateOnly(2027, 1, 20), "Feedback, condução de reuniões e comunicação com equipes.", "/img/curso-5.jpg", "EAD", "Liderança", "Liderança e Comunicação", "Gestores em início de carreira", "Em breve" },
                    { 6, 16, "Saúde e Segurança", new DateOnly(2025, 8, 5), "Organização do posto de trabalho e prevenção de lesões.", "/img/curso-6.jpg", "Presencial", "Ergonomia", "Ergonomia e Qualidade de Vida no Trabalho", "Equipes operacionais", "Encerrado" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cursos");
        }
    }
}
