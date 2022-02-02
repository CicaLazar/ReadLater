using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using ReadLater5.Domain.Entities;

namespace ReadLater5.Database
{
    public class DataContext : ApiAuthorizationDbContext<User>
    {
        public DataContext(
            DbContextOptions options) : base(options, new Options())
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            Seed.Initialize(builder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
