using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphMailAPI.Models
{
    public class Mail
    {
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverEmail { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
