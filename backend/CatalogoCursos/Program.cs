var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "API do catálogo de cursos no ar.");

app.Run();
