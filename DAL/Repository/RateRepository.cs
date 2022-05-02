using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class RateRepository : IRepository<Rate>
    {
        private MobileOperatorContext db;

        public RateRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<Rate> GetList()
        {
            return db.Rate.ToList();
        }

        public Rate GetItem(int id)
        {
            return db.Rate.Find(id);
        }

        public void Create(Rate item)
        {
            db.Rate.Add(item);
        }

        public void Update(Rate item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Rate item = db.Rate.Find(id);
            if (item != null)
                db.Rate.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
