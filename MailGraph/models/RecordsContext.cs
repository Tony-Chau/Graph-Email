using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MailGraph.models
{
    public class RecordsContext:DbContext
    {
        public RecordsContext(DbContextOptions options) : base(options) { }

    }
}
