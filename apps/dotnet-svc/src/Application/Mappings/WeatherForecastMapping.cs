using Application.DTOs;
using Domain.Entities;

namespace Application.Mappings;

public static class WeatherForecastMapping
{
    public static WeatherForecastDto ToDto(this WeatherForecast forecast)
    {
        return new WeatherForecastDto
        {
            Date = forecast.Date,
            TemperatureC = forecast.TemperatureC,
            Summary = forecast.Summary,
            TemperatureF = forecast.TemperatureF
        };
    }

    public static IEnumerable<WeatherForecastDto> ToDto(this IEnumerable<WeatherForecast> forecasts)
    {
        return forecasts.Select(ToDto);
    }
}
