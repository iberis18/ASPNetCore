using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    public class PayHistory
    {
            public int Id { get; set; }

            public int? ClientId { get; set; }

            public DateTime? Date { get; set; }

            public double? Cost { get; set; }

            public virtual Client Client { get; set; }
    }
}
