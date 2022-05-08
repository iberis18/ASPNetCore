using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entity;

namespace BLL
{
    public class Service
    {
        DAL.Entity.Service service = new DAL.Entity.Service();

        public int Id { get; set; }

        public string Name { get; set; }

        public double? Cost { get; set; }

        public string Condition { get; set; }
        public Service() { }
        //public List<int> ClientIds { get; set; }

        public Service(int id)
        {
            Id = id;
        }
        public Service(DAL.Entity.Service c)
        {
            if (c != null)
            {
                Id = c.Id;
                Name = c.Name;
                Cost = c.Cost;
                Condition = c.Condition;
            }
        }

    }
}
