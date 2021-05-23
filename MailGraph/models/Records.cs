using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailGraph.models
{
    public class Records
    {
        public long Id { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public DateTime date_sent { get; set; }
        public string Graph { get; set; }

    }
}
