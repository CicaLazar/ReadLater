using ReadLater5.Core.Services.Util;
using System;

namespace ReadLater5.Infrastructure.Services.Util
{
    public class Clock : IClock
    {
        public DateTime Now => TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"));

        public DateTime NowUtc => DateTime.Now.ToUniversalTime();

        public DateTime? ParseEventLabel(string eventLabel)
        {
            DateTime result;
            if (DateTime.TryParseExact(eventLabel, "d-M-yyyy", null, System.Globalization.DateTimeStyles.None, out result))
                return result;
            if (DateTime.TryParseExact(eventLabel, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out result))
                return result;
            if (DateTime.TryParseExact(eventLabel, "M/d/yyyy", null, System.Globalization.DateTimeStyles.None, out result))
                return result;

            return null;
        }
    }
}
