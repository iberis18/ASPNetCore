using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    public class SMS
    {
        public int Id { get; set; }

        public int? SenderId { get; set; }

        public string SenderNumber { get; set; }

        public int? SendedId { get; set; }

        public string SendedNumber { get; set; }

        public DateTime? DateTime { get; set; }

        public int? TypeId { get; set; }

        public double? Cost { get; set; }

        public virtual Client Client { get; set; }

        public virtual Client Client1 { get; set; }

        public virtual Type Type { get; set; }
    }
}
