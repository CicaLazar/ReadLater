using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater5.Core.Services
{
    public interface IEmailService
    {
        Task SendMailAsync(string email, string subject, string templateName, Dictionary<string, string> properties);
    }
}
