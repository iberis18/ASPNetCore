using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для типа звонка 
    class TypeRepository : IRepository<DAL.Entity.Type>
    {
        private MobileOperatorContext db;

        public TypeRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }

        //получение всех типов звонков
        public List<DAL.Entity.Type> GetList()
        {
            return db.Type.ToList();
        }

        //получение типа звонка  по ID
        public DAL.Entity.Type GetItem(int id)
        {
            return db.Type.Find(id);
        }
        //получение типа звонка  по имени 
        public DAL.Entity.Type GetCurrentItem(string name)
        {
            return db.Type.Where(c => c.Name == name).FirstOrDefault();
        }

        //создание нового типа звонка 
        public void Create(DAL.Entity.Type item)
        {
            db.Type.Add(item);
        }

        //лбновление типа звонка 
        public void Update(DAL.Entity.Type item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        //удаление типа звонка 
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
