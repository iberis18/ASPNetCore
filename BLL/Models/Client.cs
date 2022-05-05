using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entity;

namespace BLL
{
    public class Client
    {
        DAL.Entity.Client client = new DAL.Entity.Client();
        public int Id { get; set; }
        public int? RateId { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string Pasport { get; set; }

        public double? Balance { get; set; }

        public int? MinutesRest { get; set; }

        public double? GBRest { get; set; }

        public int? SMSRest { get; set; }

        public Client() { }
        //public List<int> ClientIds { get; set; }

        public Client(int id)
        {
            Id = id;
        }
        public Client(DAL.Entity.Client c)
        {
            if (c != null)
            {
                Id = c.Id;
                Number = c.Number;
                Balance = c.Balance;
                RateId = c.RateId;
                Name = c.Name;
                Pasport = c.Pasport;
                MinutesRest = c.MinutesRest;
                GBRest = c.GBRest;
                SMSRest = c.SMSRest;
            }
        }

    }
}
