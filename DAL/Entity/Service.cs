using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entity
{
    //сущность услуга
    public class Service
    {
        public Service()
        {
            ServiceHistory = new HashSet<ServiceHistory>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public double? Cost { get; set; }

        public string Condition { get; set; }

        public virtual ICollection<ServiceHistory> ServiceHistory { get; set; }
    }
}
