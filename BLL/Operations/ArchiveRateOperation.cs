using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Repository;
using DAL.Interfaces;
using Microsoft.Extensions.Logging;

namespace BLL.Operations
{
    public class ArchiveRateOperation
    {
        IDbRepos db;
        ILogger logger; // логгер

        public ArchiveRateOperation(IDbRepos repos)
        {
            db = repos;
        }

        public ArchiveRateOperation()
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

        public List<Rate> GetAll()
        {
            try
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
            catch
            {
                logger.LogError("Get archive rates error");
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
