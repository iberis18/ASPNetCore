using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using DAL.Entity;

namespace DAL.Repository
{
    //реализация репозитория для БД
    public class DBRepository : IDbRepos
    {
        private MobileOperatorContext db;
        private CallRepository callRepository;
        private SMSRepository SMSRepository;
        private ClientRepository clientRepository;
        private RateRepository rateRepository;
        private ServiceHistoryRepository serviceHistoryRepository;
        private ServiceRepository serviceRepository;
        private TypeRepository typeRepository;
        private PayHistoryRepository payHistoryRepository;

        public DBRepository()
        {
            db = new MobileOperatorContext();
        }
        public DBRepository(MobileOperatorContext db)
        {
            this.db = db;
        }

        public IRepository<Call> Calls
        {
            get
            {
                if (callRepository == null)
                    callRepository = new CallRepository(db);
                return callRepository;
            }
        }

        public IRepository<Client> Clients
        {
            get
            {
                if (clientRepository == null)
                    clientRepository = new ClientRepository(db);
                return clientRepository;
            }
        }

        public IRepository<Rate> Rates
        {
            get
            {
                if (rateRepository == null)
                    rateRepository = new RateRepository(db);
                return rateRepository;
            }
        }

        public IRepository<PayHistory> PayHistorys
        {
            get
            {
                if (payHistoryRepository == null)
                    payHistoryRepository = new PayHistoryRepository(db);
                return payHistoryRepository;
            }
        }


        public IRepository<Service> Services
        {
            get
            {
                if (serviceRepository == null)
                    serviceRepository = new ServiceRepository(db);
                return serviceRepository;
            }
        }

        public IRepository<ServiceHistory> ServiceHistorys
        {
            get
            {
                if (serviceHistoryRepository == null)
                    serviceHistoryRepository = new ServiceHistoryRepository(db);
                return serviceHistoryRepository;
            }
        }

        public IRepository<SMS> SMSs
        {
            get
            {
                if (SMSRepository == null)
                    SMSRepository = new SMSRepository(db);
                return SMSRepository;
            }
        }

        public IRepository<DAL.Entity.Type> Types
        {
            get
            {
                if (typeRepository == null)
                    typeRepository = new TypeRepository(db);
                return typeRepository;
            }
        }

        public bool Save()
        {
            if (db.SaveChanges() > 0)
                return true;
            else return false;
        }
    }
}
