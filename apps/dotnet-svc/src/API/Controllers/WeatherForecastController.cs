using Application.DTOs;
using Application.Mappings;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IWeatherForecastService _weatherForecastService;

    public WeatherForecastController(IWeatherForecastService weatherForecastService)
    {
        _weatherForecastService = weatherForecastService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeatherForecastDto>>> Get([FromQuery] int days = 5)
    {
        if (days <= 0 || days > 14)
        {
            return BadRequest("Days must be between 1 and 14");
        }

        var forecasts = await _weatherForecastService.GetForecastAsync(days);
        var result = forecasts.ToDto();
        
        return Ok(result);
    }
}
