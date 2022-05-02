using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    class ClientRepository : IRepository<Client>
    {
        private MobileOperatorContext db;

        public ClientRepository(MobileOperatorContext dbcontext)
        {
            this.db = dbcontext;
        }
        public ClientRepository()
        {
            db = new MobileOperatorContext();
        }

        public List<Client> GetList()
        {
            return db.Client.ToList();
        }

        public Client GetItem(int id)
        {
            return db.Client.Find(id);
        }

        public void Create(Client item)
        {
            db.Client.Add(item);
        }

        public void Update(Client item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Client item = db.Client.Find(id);
            if (item != null)
                db.Client.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
