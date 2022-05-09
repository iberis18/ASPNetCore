using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;


namespace DAL.Repository
{
    //реализация репозитория для вызовов 
    class CallRepository : IRepository<Call>
    {
        private MobileOperatorContext db;

        public CallRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        //получить все звонки
        public List<Call> GetList()
        {
            return db.Call.ToList();
        }

        //получить звонок по ID
        public Call GetItem(int id)
        {
            return db.Call.Find(id);
        }
        //получить звонок по номеру
        public Call GetCurrentItem(string number)
        {
            return db.Call.Where(c => c.Client.Number == number).FirstOrDefault();
        }

        //создать звонок
        public void Create(Call item)
        {
            db.Call.Add(item);
        }

        //обновить звонок 
        public void Update(Call item)
        {
            db.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        //удалить звонок 
        public void Delete(int id)
        {
            Call item = db.Call.Find(id);
            if (item != null)
                db.Call.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}