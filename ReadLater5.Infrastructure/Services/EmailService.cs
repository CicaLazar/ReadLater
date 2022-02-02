using ReadLater5.Core.Exceptions;
using ReadLater5.Core.Services;
using ReadLater5.Domain.ConfigSections;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Threading.Tasks;

namespace ReadLater5.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private const string EmailFrom = "ReadLater";

        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings?.Value ?? throw new ArgumentNullException(nameof(emailSettings));
        }

        public async Task SendMailAsync(string email, string subject, string templateName, Dictionary<string, string> properties)
        {
            try
            {
                var body = GetEmailBody(templateName, properties);

                var credentials = new NetworkCredential(_emailSettings.MailFrom, _emailSettings.Password);

                var mail = new MailMessage
                {
                    From = new MailAddress(_emailSettings.MailFrom, EmailFrom),
                    Subject = subject,
                    Body = body
                };
                mail.IsBodyHtml = true;
                mail.To.Add(new MailAddress(email));

                var client = new SmtpClient
                {
                    Port = _emailSettings.Port,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Host = _emailSettings.Host,
                    EnableSsl = true,
                    Credentials = credentials
                };
                await client
                    .SendMailAsync(mail);
            }
            catch
            {
                throw new SendEmailException();
            }
        }

        private static string GetEmailBody(object templateName, Dictionary<string, string> properties)
        {
            var path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), $"EmailTemplates\\{templateName}.html");
            var body = File.ReadAllText(path);

            foreach (var property in properties)
            {
                body = body.Replace($"[[{property.Key}]]", property.Value);
            }

            return body;
        }
    }
}
