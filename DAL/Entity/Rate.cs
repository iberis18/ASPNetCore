using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    //сущность тариф
    public class Rate
    {
        public Rate()
        {
            Client = new HashSet<Client>();
        }

        public int Id { get; set; }

        public bool? Status { get; set; }
        public string Name { get; set; }

        public double? CityCost { get; set; }

        public double? IntercityCost { get; set; }

        public double? InternationalCost { get; set; }

        public int? GB { get; set; }

        public int? SMS { get; set; }

        public int? Minutes { get; set; }

        public double? GBCost { get; set; }

        public double? MinuteCost { get; set; }

        public double? SMSCost { get; set; }

        public double? Cost { get; set; }

        public virtual ICollection<Client> Client { get; set; }
    }
}
