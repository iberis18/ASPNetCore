using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL;
using BLL.Interfaces;
using DAL;
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
                        Save();

                    }
                }
                else message = "Данный тариф не найден";
            else message = "Данный клиент не найден";

            return message;
        }
        public bool Save()
        {
            return db.Save();
        }
    }
}
