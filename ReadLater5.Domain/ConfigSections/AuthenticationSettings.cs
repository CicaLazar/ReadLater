namespace ReadLater5.Domain.ConfigSections
{
    public class AuthenticationSettings
    {
        public string Key { get; set; }
        public int Lifetime { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
