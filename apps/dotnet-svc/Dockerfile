FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["dotnet-svc.csproj", "./"]
RUN dotnet restore "./dotnet-svc.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "dotnet-svc.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "dotnet-svc.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "dotnet-svc.dll"]
