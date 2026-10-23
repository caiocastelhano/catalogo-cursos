namespace CatalogoCursos.Models;

public class Modulo
{
    public int Id { get; set; }
    public int CursoId { get; set; }
    public int Ordem { get; set; }
    public string Titulo { get; set; } = "";
    public string Descricao { get; set; } = "";
    public List<Aula> Aulas { get; set; } = new();
}