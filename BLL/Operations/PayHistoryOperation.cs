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
    //оперции связанные с историей пополнений
    public class PayHistoryOperation
    {
        IDbRepos db; //репозиторий
        ILogger logger; // логгер

        public PayHistoryOperation(IDbRepos repos)
        {
            db = repos;
        }
        public PayHistoryOperation()
        {
            //логгирование
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });

            logger = loggerFactory.CreateLogger<DBDataOperation>();
            try
            {
                db = new DBRepository(); //создание репозитория
            }
            catch
            {
                logger.LogError("Ошибка подключения к базе данных");
            }
        }

        //получение истории пополнеий и списаний для клиента 
        public List<PayHistory> GetPayHistory(int clientId)
        {
            try
            {
                //получение клиента по ID
                Client client = new Client(db.Clients.GetItem(clientId));
                //создание списка пополнений и списаний
                List<PayHistory> list = new List<PayHistory>();
                list = db.PayHistorys.GetList().Select(i => new PayHistory(i)).ToList();
                List<PayHistory> list2 = new List<PayHistory>();

                for (int i = 0; i < list.Count; i++)
                    if (list[i].ClientId == clientId)
                        list2.Add(list[i]);
                //переворот списка для того, чтобы последние записи оказались вначале 
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
