using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.Interfaces;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для клиента 
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

        //получения списка всех клиентов
        public List<Client> GetList()
        {
            return db.Client.ToList();
        }
        
        //получение клиента по ID
        public Client GetItem(int id)
        {
            return db.Client.Find(id);
        }

        //получения клиента по номеру 
        public Client GetCurrentItem(string number)
        {
            Client client = db.Client.Where(c => c.Number == number).FirstOrDefault();
            return client;
        }

        //создание клиента 
        public void Create(Client item)
        {
            db.Client.Add(item);
        }

        public void Update(Client item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        //удаление клиента 
        public void Delete(int id)
        {
            Client item = db.Client.Find(id);
            List<PayHistory> p = db.PayHistory.ToList();
            foreach (PayHistory i in p)
                if (i.ClientId == item.Id)
                    db.PayHistory.Remove(i);
            if (item != null)
                db.Client.Remove(item);
        }

        public bool Save()
        {
            return db.SaveChanges() > 0;
        }
    }
}
