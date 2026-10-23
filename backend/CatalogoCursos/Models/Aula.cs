namespace CatalogoCursos.Models;

public class Aula
{
    public int Id { get; set; }
    public int ModuloId { get; set; }
    public int Ordem { get; set; }
    public string Titulo { get; set; } = "";
    public string Descricao { get; set; } = "";
    public int DuracaoMinutos { get; set; }
}