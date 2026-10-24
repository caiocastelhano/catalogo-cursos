# Etapa 1: compila o front-end (React + Vite)
FROM node:20-alpine AS front
WORKDIR /front
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Etapa 2: compila e publica o back-end (.NET 8), incluindo o front em wwwroot
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/CatalogoCursos/CatalogoCursos.csproj backend/CatalogoCursos/
RUN dotnet restore backend/CatalogoCursos/CatalogoCursos.csproj
COPY backend/CatalogoCursos/ backend/CatalogoCursos/
COPY --from=front /front/dist/ backend/CatalogoCursos/wwwroot/
RUN dotnet publish backend/CatalogoCursos/CatalogoCursos.csproj -c Release -o /app/publish --no-restore

# Etapa 3: imagem final, só com o runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "CatalogoCursos.dll"]