using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL;
using BLL.Interfaces;
using DAL.Repository;
using DAL.Interfaces;
using Microsoft.Extensions.Logging;

namespace BLL.Operations
{
    public class PayHistoryOperation
    {
        IDbRepos db;
        ILogger logger; // логгер

        public PayHistoryOperation(IDbRepos repos)
        {
            db = repos;
        }
        public PayHistoryOperation()
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
        public List<PayHistory> GetPayHistory(int clientId)
        {
            try
            {
                Client client = new Client(db.Clients.GetItem(clientId));
                List<PayHistory> list = new List<PayHistory>();
                list = db.PayHistorys.GetList().Select(i => new PayHistory(i)).ToList();
                foreach (PayHistory i in list)
                {
                    if (i.ClientId != clientId)
                        list.Remove(i);
                }
                list.Reverse();
                return list;
            }
            catch
            {
                logger.LogError("Get pay history error: client's id: " + clientId);
                return null;
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
