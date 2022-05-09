using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для тарифа
    class RateRepository : IRepository<Rate>
    {
        private MobileOperatorContext db;

        public RateRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        //получение всех тарифов
        public List<Rate> GetList()
        {
            return db.Rate.ToList();
        }

        //получение тарифов по ID
        public Rate GetItem(int id)
        {
            return db.Rate.Find(id);
        }

        //получение тарифа по имени 
        public Rate GetCurrentItem(string name)
        {
            return db.Rate.Where(c => c.Name == name).FirstOrDefault();
        }

        //создание тарифа
        public void Create(Rate item)
        {
            db.Rate.Add(item);
        }

        //обновление тарифа
        public void Update(Rate item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        //удаление тарифа
        public void Delete(int id)
        {
            Rate item = db.Rate.Find(id);
            if (item != null)
                db.Rate.Remove(item);
        }

        //сохрание тарифа
        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
