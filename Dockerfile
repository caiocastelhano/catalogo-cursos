# Etapa 1: compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY backend/CatalogoCursos/CatalogoCursos.csproj backend/CatalogoCursos/
RUN dotnet restore backend/CatalogoCursos/CatalogoCursos.csproj

COPY backend/CatalogoCursos/ backend/CatalogoCursos/
RUN dotnet publish backend/CatalogoCursos/CatalogoCursos.csproj -c Release -o /app/publish --no-restore

# Etapa 2: executar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "CatalogoCursos.dll"]