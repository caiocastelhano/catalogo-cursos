using CatalogoCursos.Data;
using CatalogoCursos.Dtos;
using CatalogoCursos.Models;
using CatalogoCursos.Utils;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Data Source=catalogo.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddResponseCompression();

var app = builder.Build();

app.UseExceptionHandler();
app.UseResponseCompression();
app.UseSwagger();
app.UseSwaggerUI();

var tiposDeConteudo = new FileExtensionContentTypeProvider();
tiposDeConteudo.Mappings[".webp"] = "image/webp";

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = tiposDeConteudo,
    OnPrepareResponse = contexto =>
    {
        var caminho = contexto.Context.Request.Path;
        if (caminho.StartsWithSegments("/assets"))
        {
            contexto.Context.Response.Headers.CacheControl = "public,max-age=31536000,immutable";
        }
        else if (caminho.StartsWithSegments("/img") || caminho.StartsWithSegments("/icons"))
        {
            contexto.Context.Response.Headers.CacheControl = "public,max-age=86400";
        }
    },
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}

app.MapGet("/healthz", () => Results.Ok(new { status = "ok" }));

var api = app.MapGroup("/api");

api.MapGet("/cursos", async (string? busca, string? categoria, string? modalidade,
    string? status, AppDbContext db) =>
{
    IQueryable<Curso> consulta = db.Cursos.AsNoTracking();

    if (!string.IsNullOrWhiteSpace(categoria))
        consulta = consulta.Where(c => c.Categoria == categoria);
    if (!string.IsNullOrWhiteSpace(modalidade))
        consulta = consulta.Where(c => c.Modalidade == modalidade);
    if (!string.IsNullOrWhiteSpace(status))
        consulta = consulta.Where(c => c.Status == status);

    var cursos = await consulta.OrderBy(c => c.Id).ToListAsync();

    if (!string.IsNullOrWhiteSpace(busca))
    {
        var termo = Texto.Normalizar(busca);
        cursos = cursos
            .Where(c => Texto.Normalizar(c.NomeCompleto).Contains(termo)
                     || Texto.Normalizar(c.NomeBreve).Contains(termo))
            .ToList();
    }

    var itens = cursos.Select(CursoResumoDto.De).ToList();
    return Results.Ok(new ListaCursosDto(itens.Count, itens));
});

api.MapGet("/cursos/{id:int}", async (int id, AppDbContext db) =>
{
    var curso = await db.Cursos.AsNoTracking()
        .Include(c => c.Modulos).ThenInclude(m => m.Aulas)
        .FirstOrDefaultAsync(c => c.Id == id);

    return curso is null
        ? Results.Problem(statusCode: 404, title: "Curso não encontrado",
            detail: $"Não existe curso com id {id}.")
        : Results.Ok(CursoDetalheDto.De(curso));
});

api.MapGet("/filtros", async (AppDbContext db) =>
{
    var categorias = await db.Cursos.AsNoTracking().Select(c => c.Categoria)
        .Distinct().OrderBy(x => x).ToListAsync();
    var modalidades = await db.Cursos.AsNoTracking().Select(c => c.Modalidade)
        .Distinct().OrderBy(x => x).ToListAsync();
    var status = await db.Cursos.AsNoTracking().Select(c => c.Status)
        .Distinct().OrderBy(x => x).ToListAsync();
    return Results.Ok(new FiltrosDto(categorias, modalidades, status));
});

app.MapFallback(async contexto =>
{
    var arquivo = app.Environment.WebRootFileProvider.GetFileInfo("index.html");
    if (contexto.Request.Path.StartsWithSegments("/api") || !arquivo.Exists)
    {
        contexto.Response.StatusCode = StatusCodes.Status404NotFound;
        return;
    }

    contexto.Response.ContentType = "text/html; charset=utf-8";
    await contexto.Response.SendFileAsync(arquivo);
});

app.Run();
