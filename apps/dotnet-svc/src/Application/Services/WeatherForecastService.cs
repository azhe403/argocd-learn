using Application.DTOs;
using Domain.Entities;
using Domain.Interfaces;
using Domain.ValueObjects;

namespace Application.Services;

public class WeatherForecastService : IWeatherForecastService
{
    public async Task<IEnumerable<WeatherForecast>> GetForecastAsync(int days)
    {
        await Task.Delay(1); // Simulate async operation
        
        var forecast = Enumerable.Range(1, days).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                TemperatureSummary.GetRandomSummary()
            ))
            .ToArray();

        return forecast;
    }
}
