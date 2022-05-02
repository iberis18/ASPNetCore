using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class TypeRepository : IRepository<DAL.Entity.Type>
    {
        private MobileOperatorContext db;

        public TypeRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        public List<DAL.Entity.Type> GetList()
        {
            return db.Type.ToList();
        }

        public DAL.Entity.Type GetItem(int id)
        {
            return db.Type.Find(id);
        }

        public void Create(DAL.Entity.Type item)
        {
            db.Type.Add(item);
        }

        public void Update(DAL.Entity.Type item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            DAL.Entity.Type item = db.Type.Find(id);
            if (item != null)
                db.Type.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
