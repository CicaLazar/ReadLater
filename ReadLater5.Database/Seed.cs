using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ReadLater5.Domain.Entities;

namespace ReadLater5.Database
{
    public static class Seed
    {
        public static void Initialize(ModelBuilder builder)
        {
            SeedUsers(builder);
        }

        private static void SeedUsers(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<User>(
                new OptionsWrapper<PasswordHasherOptions>(
                    new PasswordHasherOptions()
                    {
                        CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2
                    })
            );

            builder
                .Entity<User>()
                .HasData(
                    new User
                    {
                        Id = "71ca03d1-c9e5-404f-854b-883b9b3f460c",
                        UserName = "admin@admin.com",
                        NormalizedUserName = "ADMIN@ADMIN.COM",
                        Email = "admin@admin.com",
                        NormalizedEmail = "ADMIN@ADMIN.COM",
                        EmailConfirmed = true,
                        PasswordHash = hasher.HashPassword(null, "12345"),
                        SecurityStamp = "EJPCADZMWS6CZAB45NRUVSLP7XQBBQ2X",
                        ConcurrencyStamp = "272909d4-cd44-4318-bc24-8c728bb64f1b",
                    }
                );
        }
    }
}
