using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entity;

namespace BLL
{
    //модель сущности история платежей
    public class PayHistory
    {
        DAL.Entity.PayHistory pay = new DAL.Entity.PayHistory();
        public int Id { get; set; }

        public int? ClientId { get; set; }

        public DateTime? Date { get; set; }

        public double? Cost { get; set; }

        public virtual Client Client { get; set; }

        public PayHistory() { }
        public PayHistory(int id)
        {
            Id = id;
        }
        public PayHistory(DAL.Entity.PayHistory r)
        {
            if (r != null)
            {
                Id = r.Id;
                ClientId = r.ClientId;
                Date = r.Date;
                Cost = r.Cost;
                Client = new Client(r.Client);
            }
        }
    }
}
