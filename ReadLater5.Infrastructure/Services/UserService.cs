using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReadLater5.Core.Exceptions;
using ReadLater5.Core.Services;
using ReadLater5.Core.Services.Util;
using ReadLater5.Database;
using ReadLater5.Domain.ConfigSections;
using ReadLater5.Domain.Constants;
using ReadLater5.Domain.Entities;
using ReadLater5.Domain.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace ReadLater5.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IClock _clock;

        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;

        public UserService(
            IConfiguration configuration,
            IClock clock,
            IEmailService emailService,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            DataContext dataContext)
        {
            _configuration = configuration;
            _clock = clock;

            _emailService = emailService;
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }

        public async Task<string> GetTokenByUser(string email)
        {

            var user = await _userManager.FindByEmailAsync(email);

            return GetToken(user);
        }

        public async Task<bool> IsUserLoggedIn(LoginModel model)
        {
            var result = await _signInManager
                    .PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: true);

            return result.Succeeded;
        }

        public async Task ForgotPasswordAsync(ForgotPasswordModel forgotPassword)
        {
            var user = await _userManager
                .FindByEmailAsync(forgotPassword.Email);

            if (user is null)
            {
                throw new EntityNotFoundException(string.Format("User with email: {0} does not exists", forgotPassword.Email));
            }

            var token = await _userManager
                .GeneratePasswordResetTokenAsync(user);

            var url = $"{forgotPassword.Host}/resetpassword?id={user.Id}&token={HttpUtility.UrlEncode(token)}";

            var properties = new Dictionary<string, string>
                {
                    { TemplatePropertiesConstants.User, user.UserName },
                    { TemplatePropertiesConstants.Url, url }
                };

            await _emailService
                .SendMailAsync(forgotPassword.Email, EmailSubjectConstants.ResetPassword, TemplateNameConstants.ResetPasswordEmailTemplate, properties);
        }

        public async Task<IdentityResult> ResetPasswordAsync(ResetPasswordModel resetPassword)
        {
            var user = await _userManager
                .FindByIdAsync(resetPassword.UserId);

            if (user is null)
            {
                throw new EntityNotFoundException(string.Format("User with id: {0} does not exists.", resetPassword.UserId));
            }

            if (!await _userManager.VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, PurposeConstants.ResetPassword, resetPassword.Token))
            {
                throw new Exception("Invalid token.");
            }

            return await _userManager
                 .ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
        }

        public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel changePassword)
        {
            var user = await _userManager
                .FindByIdAsync(changePassword.UserId);

            if (user is null)
            {
                throw new EntityNotFoundException($"There is no user with userId {changePassword.UserId}");
            }

            if (!await _userManager.CheckPasswordAsync(user, changePassword.CurrentPassword))
            {
                throw new Exception("Your current password is not correct, please try again.");
            }

            return await _userManager
                 .ChangePasswordAsync(user, changePassword.CurrentPassword, changePassword.NewPassword);
        }

        public async Task<User> EnsureUser(Payload payload)
        {
            var user = await _dataContext
                .Users
                .FirstOrDefaultAsync(w => w.NormalizedEmail == payload.Email.ToUpper());

            if (user == null)
            {
                user = new User
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    NormalizedUserName = payload.Email.ToUpper(),
                    NormalizedEmail = payload.Email.ToUpper()
                };

                _dataContext.Users.Add(user);
                _dataContext
                .SaveChanges();
            }

            return user;
        }

        public async Task<IdentityResult> CreateUserWithPassword(RegisterModel registerModel)
        {
            var user = new User
            {
                Email = registerModel.Email,
                UserName = registerModel.Email,
                NormalizedUserName = registerModel.Email.ToUpper(),
                NormalizedEmail = registerModel.Email.ToUpper(),
            };

            return await _userManager
                .CreateAsync(user, registerModel.Password);
        }

        private string GetToken(User user)
        {
            var _authenticationSettings = _configuration
                .GetSection(ConfigurationConstants.AuthenticationSettings).Get<AuthenticationSettings>();

            var claims = new List<Claim>()
            {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, _clock.NowUtc.ToString())
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.Key));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                notBefore: _clock.NowUtc,
                expires: _clock.NowUtc.AddSeconds(_authenticationSettings.Lifetime),
                audience: _authenticationSettings.Audience,
                issuer: _authenticationSettings.Issuer
            );

            return new JwtSecurityTokenHandler()
                .WriteToken(jwt);
        }
    }
}
