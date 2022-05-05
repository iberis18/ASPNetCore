using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class SMSRepository : IRepository<SMS>
    {
        private MobileOperatorContext db;

        public SMSRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<SMS> GetList()
        {
            return db.SMS.ToList();
        }

        public SMS GetItem(int id)
        {
            return db.SMS.Find(id);
        }

        public SMS GetCurrentItem(string number)
        {
            return db.SMS.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        public void Create(SMS item)
        {
            db.SMS.Add(item);
        }

        public void Update(SMS item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            SMS item = db.SMS.Find(id);
            if (item != null)
                db.SMS.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
