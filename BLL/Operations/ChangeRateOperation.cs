using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repository;
using DAL.Interfaces;
using Microsoft.Extensions.Logging;

namespace BLL.Operations
{
    //операции с балансом
    public class ChangeRateOperation
    {
        IDbRepos db; //репозиторий
        ILogger logger; // логгер

        public ChangeRateOperation(IDbRepos repos)
        {
            db = repos;
        }
        public ChangeRateOperation()
        {
            //логгирование
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole(); 
            });

            logger = loggerFactory.CreateLogger<DBDataOperation>();
            try
            {
                //создание репозитория бд
                db = new DBRepository();
            }
            catch
            {
                logger.LogError("Ошибка подключения к базе данных");
            }
        }

        //смена тарифа
        public string ChangeRate(int clientId, int rateId)
        {
            try
            {
                //получаем клиента и выбранный тариф по Id
                Client client = new Client(db.Clients.GetItem(clientId));
                Rate newRate = new Rate(db.Rates.GetItem(rateId));

                string message = "";
                if (client != null)
                    if (newRate != null)
                    {
                        //проверяем достаточноть средств на счету абонента
                        if (client.Balance < newRate.Cost)
                            message = "Недостаточно средств на счету! Стоимость подключения тарифа " + newRate.Cost.ToString() + " руб. Пожалуйста пополните баланс";
                        else
                        {
                            //переподключаем клиента к новому тарифу
                            DAL.Entity.Client cl = db.Clients.GetItem(clientId);
                            cl.RateId = newRate.Id;
                            cl.Balance -= newRate.Cost;

                            //осуществляем обновление по пакетам минут, смс и гб
                            cl.MinutesRest = newRate.Minutes;
                            cl.SMSRest = newRate.SMS;
                            cl.GBRest = newRate.GB;
                            db.Clients.Update(cl);

                            //создаем запись о списании средств со счета
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
            catch
            {
                logger.LogError("Change rate error: client's id: " + clientId);
                return "";
            }
        }


        // операция пополнения баланса
        public string PayBalance(double sum, int clientId)
        {
            try
            {
                Client client = new Client(db.Clients.GetItem(clientId));
                string message = "";
                if (client != null)
                {
                    //находим клиента по Id
                    DAL.Entity.Client cl = db.Clients.GetItem(clientId);
                    //пополняем баланс
                    cl.Balance += sum; 
                    db.Clients.Update(cl);

                    //создаем запись о пополнении баланса
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
            catch
            {
                logger.LogError("Pay error: client's id: " + clientId);
                return "";
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
