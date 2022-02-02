using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using ReadLater5.Core.Services;
using ReadLater5.Core.Services.Util;
using ReadLater5.Database;
using ReadLater5.Domain.ConfigSections;
using ReadLater5.Domain.Constants;
using ReadLater5.Domain.Entities;
using ReadLater5.Infrastructure.Services;
using ReadLater5.Infrastructure.Services.Util;
using System;
using System.Text;

namespace ReadLater5
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<DataContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString(ConfigurationConstants.DefaultConnection)));

            services.AddDefaultIdentity<User>()
                .AddEntityFrameworkStores<DataContext>();

            services.AddIdentityServer()
                 .AddApiAuthorization<User, DataContext>();

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/src";
            });
            services.Configure<EmailSettings>(Configuration.GetSection(ConfigurationConstants.EmailSettings));
            var authenticationSettings = Configuration.GetSection(ConfigurationConstants.AuthenticationSettings).Get<AuthenticationSettings>();
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.Key));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = true,
                    ValidAudience = authenticationSettings.Audience,
                    ValidateIssuer = true,
                    ValidIssuer = authenticationSettings.Issuer,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
                config.Events = new JwtBearerEvents
                {
                };
            });

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.User.RequireUniqueEmail = true;
            });

            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    var googleSettings = Configuration.GetSection(ConfigurationConstants.GoogleSettings).Get<GoogleSettings>();
                    options.ClientId = googleSettings.ClientId;
                    options.ClientSecret = googleSettings.ClientSecret;
                });

            services.AddMvc(option => option.EnableEndpointRouting = false);

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBookmarkService, BookmarkService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IClock, Clock>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            context.Database.Migrate();
        }
    }
}
