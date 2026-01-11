namespace Domain.ValueObjects;

public static class TemperatureSummary
{
    private static readonly string[] Summaries = 
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", 
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public static string GetRandomSummary()
    {
        return Summaries[Random.Shared.Next(Summaries.Length)];
    }
}
