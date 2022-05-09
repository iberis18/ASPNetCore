using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    //сущность история подключения услуг 
    public class ServiceHistory
    {
        public int Id { get; set; }

        public int? ServiceId { get; set; }

        public int? ClientId { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? TillDate { get; set; }

        public virtual Client Client { get; set; }

        public virtual Service Service { get; set; }
    }
}
