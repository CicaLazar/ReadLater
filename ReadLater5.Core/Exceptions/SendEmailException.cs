using System;

namespace ReadLater5.Core.Exceptions
{
    public class SendEmailException : Exception
    {
        public SendEmailException(string message = "Unable to send E-Mail, please try later or contact your administrator.") : base(message) { }
    }
}
