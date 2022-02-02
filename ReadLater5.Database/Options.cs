using IdentityServer4.EntityFramework.Options;
using Microsoft.Extensions.Options;

namespace ReadLater5.Database
{
    public class Options : IOptions<OperationalStoreOptions>
    {
        public OperationalStoreOptions Value => new OperationalStoreOptions();
    }
}
