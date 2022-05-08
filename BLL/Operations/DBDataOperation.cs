using BLL.Interfaces;
using DAL.Interfaces;
using System.Collections.Generic;
using System.Linq;
using DAL.Repository;
using Microsoft.Extensions.Logging;


namespace BLL
{
    public class DBDataOperation : IDbCrud
    {
        IDbRepos db;
        ILogger logger; // логгер

        public DBDataOperation(IDbRepos repos)
        {
            db = repos;
        }
        public DBDataOperation()
        {
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            logger = loggerFactory.CreateLogger<DBDataOperation>();
            try
            {
                db = new DBRepository();
            }
            catch
            {
                logger.LogError("Ошибка подключения к базе данных");
            }            
        }

        ///////////клиент
        public List<Client> GetAllClients()
        {
            try
            {
                return db.Clients.GetList().Select(i => new Client(i)).ToList();
            }
            catch
            {
                logger.LogError("Get all clients error");
                return null;
            }
        }
        public Client GetClient(int Id)
        {
            try
            {
                return new Client(db.Clients.GetItem(Id));
            }
            catch
            {
                logger.LogError("Get client error: client  № " + Id);
                return null;
            }
        }
        public Client GetCurrentClient(string number)
        {
            try
            {
                return new Client(db.Clients.GetCurrentItem(number));
            }
            catch
            {
                logger.LogError("Get client error: client's number " + number);
                return null;
            }
        }
        public void DeleteClient(int id)
        {
            try
            {
                if (db.Clients.GetItem(id) != null)
                {
                    db.Clients.Delete(id);
                    Save();
                }
            }
            catch
            {
                logger.LogError("Delete error: client № " + id);
            }
        }

        public void CreateClient(Client c)
        {
            try
            {
                db.Clients.Create(new DAL.Entity.Client()
                {
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
            catch
            {
                logger.LogError("Create client error: client's number " + c.Number);
            }
        }

        public void UpdateClient(Client c, int id)
        {
            try
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
            catch
            {
                logger.LogError("Update client error: client's number " + c.Number);
            }
        } 

        ///////////тариф
        public List<Rate> GetAllRates()
        {
            try
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
            catch
            {
                logger.LogError("Get rates error");
                return null;
            }
        }
        public Rate GetRate(int Id)
        {
            try
            {
                return new Rate(db.Rates.GetItem(Id));
            }
            catch
            {
                logger.LogError("Get rate error: rate № " + Id);
                return null;
            }
        }

        public void DeleteRate(int id)
        {
            try
            {
                if (db.Rates.GetItem(id) != null)
                {
                    db.Rates.Delete(id);
                    Save();
                }
            }
            catch
            {
                logger.LogError("Delete rate error: rate № " + id);
            }
        }

        public void CreateRate(Rate r)
        {
            try
            {
                db.Rates.Create(new DAL.Entity.Rate()
                {
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
            catch
            {
                logger.LogError("Create rate error: rate's name: " + r.Name);
            }
        }

        public void UpdateRate(Rate r, int id)
        {
            try
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
            catch
            {
                logger.LogError("Create rate error: rate's name: " + r.Name);
            }
        }

        public void CreatePayHistory(PayHistory r)
        {
            try
            {
                db.PayHistorys.Create(new DAL.Entity.PayHistory()
                {
                    Id = r.Id,
                    ClientId = r.ClientId,
                    Date = r.Date,
                    Cost = r.Cost
                });
                Save();
            }
            catch
            {
                logger.LogError("Create pay history error: client's №: " + r.ClientId);
            }
        }

        public bool Save()
        {
            try
            {
                return db.Save();
            }
            catch
            {
                logger.LogError("Save error");
                return false;
            }
        }
    }
}

