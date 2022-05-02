using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;


namespace DAL.Repository
{
    class CallRepository : IRepository<Call>
    {
        private MobileOperatorContext db;

        public CallRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<Call> GetList()
        {
            return db.Call.ToList();
        }

        public Call GetItem(int id)
        {
            return db.Call.Find(id);
        }

        public void Create(Call item)
        {
            db.Call.Add(item);
        }

        public void Update(Call item)
        {
            db.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

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