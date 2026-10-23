using CatalogoCursos.Models;

namespace CatalogoCursos.Dtos;

public record AulaDto(int Id, int Ordem, string Titulo, string Descricao, int DuracaoMinutos);

public record ModuloDto(int Id, int Ordem, string Titulo, string Descricao, List<AulaDto> Aulas);

public record CursoResumoDto(
    int Id, string NomeCompleto, string NomeBreve, string Descricao, string Categoria,
    string Modalidade, int CargaHoraria, string PublicoAlvo, string Status,
    string ImagemUrl, DateOnly? DataDisponibilizacao, bool Destaque)
{
    public static CursoResumoDto De(Curso c) => new(
        c.Id, c.NomeCompleto, c.NomeBreve, c.Descricao, c.Categoria, c.Modalidade,
        c.CargaHoraria, c.PublicoAlvo, c.Status, c.ImagemUrl, c.DataDisponibilizacao, c.Destaque);
}

public record CursoDetalheDto(
    int Id, string NomeCompleto, string NomeBreve, string Descricao, string Sobre,
    string Categoria, string Modalidade, int CargaHoraria, string PublicoAlvo, string Status,
    string ImagemUrl, DateOnly? DataDisponibilizacao, bool Destaque, List<ModuloDto> Modulos)
{
    public static CursoDetalheDto De(Curso c) => new(
        c.Id, c.NomeCompleto, c.NomeBreve, c.Descricao, c.Sobre, c.Categoria, c.Modalidade,
        c.CargaHoraria, c.PublicoAlvo, c.Status, c.ImagemUrl, c.DataDisponibilizacao, c.Destaque,
        c.Modulos.OrderBy(m => m.Ordem).Select(m => new ModuloDto(
            m.Id, m.Ordem, m.Titulo, m.Descricao,
            m.Aulas.OrderBy(a => a.Ordem)
                .Select(a => new AulaDto(a.Id, a.Ordem, a.Titulo, a.Descricao, a.DuracaoMinutos))
                .ToList())).ToList());
}

public record ListaCursosDto(int Total, List<CursoResumoDto> Itens);

public record FiltrosDto(List<string> Categorias, List<string> Modalidades, List<string> Status);