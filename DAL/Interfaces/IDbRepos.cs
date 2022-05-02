using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Entity;

namespace DAL.Interfaces
{
    public interface IDbRepos // интерфейс для взаимодействия с репозиториями
    {
        IRepository<Call> Calls { get; }
        IRepository<Client> Clients { get; }
        IRepository<PayHistory> PayHistorys { get; }
        IRepository<Rate> Rates { get; }
        IRepository<Service> Services { get; }
        IRepository<ServiceHistory> ServiceHistorys { get; }
        IRepository<SMS> SMSs { get; }
        IRepository<DAL.Entity.Type> Types { get; }
        bool Save();
    }
}
