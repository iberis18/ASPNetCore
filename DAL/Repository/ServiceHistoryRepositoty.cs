using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для истории услуг 
    class ServiceHistoryRepository : IRepository<ServiceHistory>
    {
        private MobileOperatorContext db;

        public ServiceHistoryRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        //получение всей истории услуг
        public List<ServiceHistory> GetList()
        {
            return db.ServiceHistory.ToList();
        }

        //получение истории услуг по ID
        public ServiceHistory GetItem(int id)
        {
            return db.ServiceHistory.Find(id);
        }

        //получение истории услуг  по номеру
        public ServiceHistory GetCurrentItem(string number)
        {
            return db.ServiceHistory.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        //созданеи истории услуг 
        public void Create(ServiceHistory item)
        {
            db.ServiceHistory.Add(item);
        }

        //обновление истории услуг 
        public void Update(ServiceHistory item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        //удаление истории услуг 
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
