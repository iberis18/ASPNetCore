using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    public class Call
    {
        public int Id { get; set; }

        public int? CallerId { get; set; }

        public int? CallerNumber { get; set; }

        public int? CalledId { get; set; }

        public int? CalledNumber { get; set; }

        public DateTime? DateTime { get; set; }

        public DateTime? Duration { get; set; }

        public int? TypeId { get; set; }

        public double? Cost { get; set; }

        public virtual Client Client { get; set; }

        public virtual Client Client1 { get; set; }

        public virtual Type Type { get; set; }
    }
}
