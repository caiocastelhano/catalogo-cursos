FROM node:20-alpine AS front
WORKDIR /front
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/CatalogoCursos/CatalogoCursos.csproj backend/CatalogoCursos/
RUN dotnet restore backend/CatalogoCursos/CatalogoCursos.csproj
COPY backend/CatalogoCursos/ backend/CatalogoCursos/
COPY --from=front /front/dist/ backend/CatalogoCursos/wwwroot/
RUN dotnet publish backend/CatalogoCursos/CatalogoCursos.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "CatalogoCursos.dll"]
