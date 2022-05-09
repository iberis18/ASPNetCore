using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    //сущность клиент
    public class Client
    {
        public Client()
        {
            Call = new HashSet<Call>();
            Call1 = new HashSet<Call>();
            PayHistory = new HashSet<PayHistory>();
            ServiceHistory = new HashSet<ServiceHistory>();
            SMS = new HashSet<SMS>();
            SMS1 = new HashSet<SMS>();
        }

        public int Id { get; set; }
        public int? RateId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string Pasport { get; set; }

        public double? Balance { get; set; }

        public int? MinutesRest { get; set; }

        public double? GBRest { get; set; }

        public int? SMSRest { get; set; }

        public virtual ICollection<Call> Call { get; set; }

        public virtual ICollection<Call> Call1 { get; set; }

        public virtual Rate Rate { get; set; }

        public virtual ICollection<PayHistory> PayHistory { get; set; }

        public virtual ICollection<ServiceHistory> ServiceHistory { get; set; }

        public virtual ICollection<SMS> SMS { get; set; }

        public virtual ICollection<SMS> SMS1 { get; set; }
    }
}
