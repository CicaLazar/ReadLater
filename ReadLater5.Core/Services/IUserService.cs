using Microsoft.AspNetCore.Identity;
using ReadLater5.Domain.Entities;
using ReadLater5.Domain.Models;
using System.Threading.Tasks;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace ReadLater5.Core.Services
{
    public interface IUserService
    {
        Task<bool> IsUserLoggedIn(LoginModel model);
        Task<string> GetTokenByUser(string email);
        Task ForgotPasswordAsync(ForgotPasswordModel forgotPassword);
        Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel changePassword);
        Task<IdentityResult> ResetPasswordAsync(ResetPasswordModel resetPassword);
        Task<User> EnsureUser(Payload payload);
        Task<IdentityResult> CreateUserWithPassword(RegisterModel resetPassword);
    }
}
