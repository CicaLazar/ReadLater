using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReadLater5.Core.Exceptions;
using ReadLater5.Core.Services;
using ReadLater5.Domain.Models;
using ReadLater5.Domain.ResponseModel;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ReadLater5.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel login)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var isUserLoggedIn = await _userService
                        .IsUserLoggedIn(login);

                    if (!isUserLoggedIn)
                    {
                        return Unauthorized(new ResponseObject
                        {
                            Successful = false,
                            Message = "Email or password is incorrect. Please try again."
                        });
                    }

                    return Ok(new
                    {
                        Successful = true,
                        Token = await _userService.GetTokenByUser(login.Email),
                        User = login.Email,
                        Message = "Success"
                    });
                }

                return BadRequest(new ResponseObject
                {
                    Successful = false,
                    Message = "Something went wrong. Please contact your administrator."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseObject
                {
                    Successful = true,
                    Message = ex.Message
                });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel resetPassword)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _userService
                        .CreateUserWithPassword(resetPassword);

                    if (!result.Succeeded)
                    {
                        return BadRequest(new
                        {
                            Successful = false,
                            Message = string.Join(Environment.NewLine, result.Errors.Select(x=> x.Description))
                        });
                    }

                    return Ok(new
                    {
                        Successful = true,
                        Message = "User created succesfully"
                    });
                }

                return BadRequest(new ResponseObject
                {
                    Successful = false,
                    Message = "Something went wrong. Please contact your administrator."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseObject
                {
                    Successful = true,
                    Message = ex.Message
                });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("resetpassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordModel resetPassword)
        {
            try
            {
                if (!string.Equals(resetPassword.Password, resetPassword.ConfirmPassword))
                {
                    throw new Exception("Password and confirm password do not match");
                }

                var result = await _userService
                    .ResetPasswordAsync(resetPassword);

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(x => x.Description)));
                }

                return Ok();
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(new ResponseObject
                {
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseObject
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("forgotpassword")]
        public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPasswordModel forgotPassword)
        {
            if (forgotPassword.Host == null)
            {
                forgotPassword.Host = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            }
            try
            {
                await _userService
                    .ForgotPasswordAsync(forgotPassword);

                return Ok();
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(new ResponseObject
                {
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseObject
                {
                    Message = ex.Message
                });
            }
        }

        [HttpPost]
        [Authorize]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordModel changePassword)
        {
            try
            {
                if (!string.Equals(changePassword.NewPassword, changePassword.ConfirmPassword))
                {
                    throw new Exception("Password and confirm password do not match");
                }

                var result = await _userService
                    .ChangePasswordAsync(changePassword);

                if (!result.Succeeded)
                {
                    throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(x => x.Description)));
                }

                return Ok(new ResponseObject
                {
                    Message = "Password changed successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseObject
                {
                    Message = ex.Message
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("googlelogin")]
        public async Task<IActionResult> Google([FromBody] GoogleLoginModel googleLogin)
        {
            try
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(googleLogin.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;

                var user = await _userService
                    .EnsureUser(payload);

                return Ok(new
                {
                    Successful = true,
                    Token = await _userService.GetTokenByUser(user.Email),
                    User = user.Email,
                    Message = "Success"
                });
            }
            catch (Exception ex)
            {
                BadRequest(ex.Message);
            }
            return BadRequest();
        }
    }
}