namespace WeddingInvitation.Models;

public sealed class WeddingInfo
{
    public string GroomName { get; init; } = "Mahmoud";
    public string BrideName { get; init; } = "Mayar";
    public DateTime WeddingDate { get; init; } = new(2026, 10, 2, 20, 0, 0, DateTimeKind.Local);
    public string CeremonyTime { get; init; } = "08:00 PM";
    public string ReceptionTime { get; init; } = "08:00 PM";
    public string VenueName { get; init; } = "Le Palace";
    public string VenueAddress { get; init; } = "Behind Mansoura Bus Station, Beside El Malaky Stadium — Zagazig";
    public string GoogleMapsUrl { get; init; } = "https://maps.app.goo.gl/hBKkWsT6GLr5tcyw6";
    public string WhatsAppNumber { get; init; } = "01212749053";
    // Add a licensed track at wwwroot/music/wedding.mp3.
    public string MusicPath { get; init; } = "/music/wedding.mp3";
    public string HeroImage { get; init; } = "/images/hero.svg";
    public IReadOnlyList<string> GalleryImages { get; init; } =
        new[] 
        {
            "/images/1.jpeg",
            "/images/2.jpeg",
            "/images/3.jpeg", 
            "/images/4.jpeg",
            "/images/5.jpeg",
            "/images/6.jpeg" ,

        "/images/7.jpeg",
        "/images/8.jpeg",
        "/images/9.jpeg",
        "/images/10.jpeg",
        "/images/11.jpeg",
        "/images/12.jpeg"};

    public IReadOnlyList<StoryMoment> StoryItems { get; init; } = new List<StoryMoment>
    {
        new("How We Met", "A chance hello became the beginning of a thousand beautiful conversations."),
        new("Our First Date", "One unforgettable evening, filled with laughter and the feeling that time stood still."),
        new("The Proposal", "A promise beneath the stars — forever began with a very happy yes."),
        new("Our Big Day", "Now, with our hearts full, we cannot wait to celebrate this new chapter with you.")
    };
}

public sealed record StoryMoment(string Title, string Description);
