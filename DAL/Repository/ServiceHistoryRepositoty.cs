using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class ServiceHistoryRepository : IRepository<ServiceHistory>
    {
        private MobileOperatorContext db;

        public ServiceHistoryRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<ServiceHistory> GetList()
        {
            return db.ServiceHistory.ToList();
        }

        public ServiceHistory GetItem(int id)
        {
            return db.ServiceHistory.Find(id);
        }

        public ServiceHistory GetCurrentItem(string number)
        {
            return db.ServiceHistory.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        public void Create(ServiceHistory item)
        {
            db.ServiceHistory.Add(item);
        }

        public void Update(ServiceHistory item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            ServiceHistory item = db.ServiceHistory.Find(id);
            if (item != null)
                db.ServiceHistory.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
