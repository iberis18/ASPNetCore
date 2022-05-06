using BLL.Interfaces;
using DAL;
using DAL.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BLL
{
    public class DBDataOperation : IDbCrud
    {
        IDbRepos db;
        public DBDataOperation(IDbRepos repos)
        {
            db = repos;
        }

        ///////////клиент
        public List<Client> GetAllClients()
        {
            return db.Clients.GetList().Select(i => new Client(i)).ToList();
        }
        public Client GetClient(int Id)
        {
            return new Client(db.Clients.GetItem(Id));
        }
        public Client GetCurrentClient(string number)
        {
            Client c = new Client(db.Clients.GetCurrentItem(number));
            return c;
        }
        public void DeleteClient(int id)
        {
            if (db.Clients.GetItem(id) != null)
            {
                db.Clients.Delete(id);
                Save();
            }
        }

        public void CreateClient(Client c)
        {
            db.Clients.Create(new DAL.Entity.Client() { 
                RateId = c.RateId,
                Number = c.Number,
                Balance = c.Balance,
                Name = c.Name,
                MinutesRest = c.MinutesRest,
                Pasport = c.Pasport,
                SMSRest = c.SMSRest,
                GBRest = c.GBRest
            });
            Save();
        }

        public void UpdateClient(Client c, int id)
        {
            DAL.Entity.Client cl = db.Clients.GetItem(id);
            cl.RateId = c.RateId;
            cl.Number = c.Number;
            cl.Balance = c.Balance;
            cl.Name = c.Name;
            cl.MinutesRest = c.MinutesRest;
            cl.Pasport = c.Pasport;
            cl.SMSRest = c.SMSRest;
            cl.GBRest = c.GBRest;
            db.Clients.Update(cl);
            Save();
        } 

        ///////////тариф
        public List<Rate> GetAllRates()
        {
            List<Rate> list = new List<Rate>();
            List<Rate> listBuf = new List<Rate>();
            listBuf = db.Rates.GetList().Select(i => new Rate(i)).ToList();
            foreach (Rate r in listBuf)
            {
                if (r.Status == true)
                    list.Add(r);
            }
            return list;
        }
        public Rate GetRate(int Id)
        {
            return new Rate(db.Rates.GetItem(Id));
        }

        public void DeleteRate(int id)
        {
            if (db.Rates.GetItem(id) != null)
            {
                db.Rates.Delete(id);
                Save();
            }
        }

        public void CreateRate(Rate r)
        {
            db.Rates.Create(new DAL.Entity.Rate() {
                Id = r.Id,
                Status = r.Status,
                Name = r.Name,
                CityCost = r.CityCost,
                IntercityCost = r.IntercityCost,
                InternationalCost = r.InternationalCost,
                GB = r.GB,
                SMS = r.SMS,
                Minutes = r.Minutes,
                GBCost = r.GBCost,
                MinuteCost = r.MinuteCost,
                SMSCost = r.SMSCost,
                Cost = r.Cost
            });
            Save();
        }

        public void UpdateRate(Rate r, int id)
        {
            DAL.Entity.Rate rate = db.Rates.GetItem(id);
            rate.Id = r.Id;
            rate.Status = r.Status;
            rate.Name = r.Name;
            rate.CityCost = r.CityCost;
            rate.IntercityCost = r.IntercityCost;
            rate.InternationalCost = r.InternationalCost;
            rate.GB = r.GB;
            rate.SMS = r.SMS;
            rate.Minutes = r.Minutes;
            rate.GBCost = r.GBCost;
            rate.MinuteCost = r.MinuteCost;
            rate.SMSCost = r.SMSCost;
            rate.Cost = r.Cost;
            Save();
        }


        public bool Save()
        {
            return db.Save();
        }
    }
}

