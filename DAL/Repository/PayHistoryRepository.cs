using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для истории платежей 
    public class PayHistoryRepository : IRepository<PayHistory>
    {
        private MobileOperatorContext db;

        public PayHistoryRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        //получение всей историии пополнений и списаний
        public List<PayHistory> GetList()
        {
            return db.PayHistory.ToList();
        }

        //получение истории платежей по ID
        public PayHistory GetItem(int id)
        {
            return db.PayHistory.Find(id);
        }
        // получение иисториии пополнений и списаний по номеру 
        public PayHistory GetCurrentItem(string number)
        {
            return db.PayHistory.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        //создание историии пополнений и списаний
        public void Create(PayHistory item)
        {
            db.PayHistory.Add(item);
        }

        //обновление историии пополнений и списаний
        public void Update(PayHistory item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        //удаление историии пополнений и списаний
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
