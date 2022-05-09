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
        //звонки
        IRepository<Call> Calls { get; }
        //клиенты
        IRepository<Client> Clients { get; }
        //история списаний и пополнеий
        IRepository<PayHistory> PayHistorys { get; }
        //звонки
        IRepository<Rate> Rates { get; }
        //услуги
        IRepository<Service> Services { get; }
        //история подлкючения услуг
        IRepository<ServiceHistory> ServiceHistorys { get; }
        //смс
        IRepository<SMS> SMSs { get; }
        //тип звонка
        IRepository<DAL.Entity.Type> Types { get; }
        bool Save();
    }
}
