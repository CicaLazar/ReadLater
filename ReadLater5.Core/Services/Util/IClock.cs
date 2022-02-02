using System;

namespace ReadLater5.Core.Services.Util
{
    public interface IClock
    {
        DateTime Now { get; }

        DateTime NowUtc { get; }

        DateTime? ParseEventLabel(string eventLabel);
    }
}
