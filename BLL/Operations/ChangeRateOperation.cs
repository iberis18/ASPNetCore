using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL;
using BLL.Interfaces;
using DAL.Repository;
using DAL.Interfaces;

namespace BLL.Operations
{
    public class ChangeRateOperation
    {
        IDbRepos db;
        public ChangeRateOperation(IDbRepos repos)
        {
            db = repos;
        }
        public ChangeRateOperation()
        {
            db = new DBRepository();
        }

        public string ChangeRate(int clientId, int rateId)
        {
            Client client = new Client(db.Clients.GetItem(clientId));
            Rate newRate = new Rate(db.Rates.GetItem(rateId));

            string message = "";
            if (client != null)
                if (newRate != null)
                {
                    if (client.Balance < newRate.Cost)
                        message = "Недостаточно средств на счету! Стоимость подключения тарифа " + newRate.Cost.ToString() + " руб. Пожалуйста пополните баланс";
                    else
                    {
                        DAL.Entity.Client cl = db.Clients.GetItem(clientId);
                        cl.RateId = newRate.Id;
                        cl.Balance -= newRate.Cost;
                        cl.MinutesRest = newRate.Minutes;
                        cl.SMSRest = newRate.SMS;
                        cl.GBRest = newRate.GB;
                        db.Clients.Update(cl);

                        DAL.Entity.PayHistory p = new DAL.Entity.PayHistory();
                        p.Client = cl;
                        p.ClientId = cl.Id;
                        p.Cost = newRate.Cost * (-1);
                        p.Date = DateTime.Today;
                        db.PayHistorys.Create(p);

                        //PayHistory pay = new PayHistory(db.PayHistorys.)
                        Save();

                    }
                }
                else message = "Данный тариф не найден";
            else message = "Данный клиент не найден";

            return message;
        }

        public string PayBalance(double sum, int clientId)
        {
            Client client = new Client(db.Clients.GetItem(clientId));
            
            string message = "";
            if (client != null)
            {
                DAL.Entity.Client cl = db.Clients.GetItem(clientId);
                cl.Balance += sum;
                db.Clients.Update(cl);

                DAL.Entity.PayHistory p = new DAL.Entity.PayHistory();
                p.Client = cl;
                p.ClientId = cl.Id;
                p.Cost = sum;
                p.Date = DateTime.Today;
                db.PayHistorys.Create(p);
                Save();
            }
            else message = "Данный клиент не найден";

            return message;
        }
        public bool Save()
        {
            return db.Save();
        }
    }
}
