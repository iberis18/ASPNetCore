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
    public class ArchiveRateOperation
    {
        IDbRepos db;
        public ArchiveRateOperation(IDbRepos repos)
        {
            db = repos;
        }

        public List<Rate> GetAll()
        {
            List<Rate> list = new List<Rate>();
            List<Rate> listBuf = new List<Rate>();
            listBuf = db.Rates.GetList().Select(i => new Rate(i)).ToList();
            foreach (Rate r in listBuf)
            {
                if (r.Status == false)
                    list.Add(r);
            }
            return list;
        }
        public bool Save()
        {
            return db.Save();
        }
    }
}
