using CatalogoCursos.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogoCursos.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Curso> Cursos => Set<Curso>();
    public DbSet<Modulo> Modulos => Set<Modulo>();
    public DbSet<Aula> Aulas => Set<Aula>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Curso>().HasIndex(c => c.Categoria);
        modelBuilder.Entity<Curso>().HasIndex(c => c.Modalidade);
        modelBuilder.Entity<Curso>().HasIndex(c => c.Status);
    }
}