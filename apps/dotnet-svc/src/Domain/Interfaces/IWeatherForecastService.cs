namespace Domain.Interfaces;

public interface IWeatherForecastService
{
    Task<IEnumerable<Entities.WeatherForecast>> GetForecastAsync(int days);
}
