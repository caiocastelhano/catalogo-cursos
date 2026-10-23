namespace CatalogoCursos.Models;

public class Curso
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = "";
    public string NomeBreve { get; set; } = "";
    public string Descricao { get; set; } = "";
    public string Sobre { get; set; } = "";
    public string Categoria { get; set; } = "";
    public string Modalidade { get; set; } = "";
    public int CargaHoraria { get; set; }
    public string PublicoAlvo { get; set; } = "";
    public string Status { get; set; } = "";
    public string ImagemUrl { get; set; } = "";
    public DateOnly? DataDisponibilizacao { get; set; }
    public bool Destaque { get; set; }
    public List<Modulo> Modulos { get; set; } = new();
}