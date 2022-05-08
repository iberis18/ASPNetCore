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
    public class PayHistoryOperation
    {
        IDbRepos db;
        public PayHistoryOperation(IDbRepos repos)
        {
            db = repos;
        }
        public PayHistoryOperation()
        {
            db = new DBRepository(); ;
        }
        public List<PayHistory> GetPayHistory(int clientId)
        {

            Client client = new Client(db.Clients.GetItem(clientId));
            List<PayHistory> list = new List<PayHistory>();
            list = db.PayHistorys.GetList().Select(i => new PayHistory(i)).ToList();
            foreach(PayHistory i in list)
            {
                if (i.ClientId != clientId)
                    list.Remove(i);
            }
            return list;
        }

        public bool Save()
        {
            return db.Save();
        }
    }
}
