using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    public class PayHistoryRepository : IRepository<PayHistory>
    {
        private MobileOperatorContext db;

        public PayHistoryRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<PayHistory> GetList()
        {
            return db.PayHistory.ToList();
        }

        public PayHistory GetItem(int id)
        {
            return db.PayHistory.Find(id);
        }
        public PayHistory GetCurrentItem(string number)
        {
            return db.PayHistory.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        public void Create(PayHistory item)
        {
            db.PayHistory.Add(item);
        }

        public void Update(PayHistory item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            PayHistory item = db.PayHistory.Find(id);
            if (item != null)
                db.PayHistory.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
