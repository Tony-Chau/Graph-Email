using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphMailAPI.Models
{
    public class Email
    {
        public long id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string subject { get; set; }
        public string message { get; set; }
        public string image { get; set; }
    }
}
