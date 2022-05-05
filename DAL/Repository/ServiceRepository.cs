using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class ServiceRepository : IRepository<Service>
    {
        private MobileOperatorContext db;

        public ServiceRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<Service> GetList()
        {
            return db.Service.ToList();
        }

        public Service GetItem(int id)
        {
            return db.Service.Find(id);
        }

        public Service GetCurrentItem(string name)
        {
            return db.Service.Where(c => c.Name == name).FirstOrDefault();
        }

        public void Create(Service item)
        {
            db.Service.Add(item);
        }

        public void Update(Service item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Service item = db.Service.Find(id);
            if (item != null)
                db.Service.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
