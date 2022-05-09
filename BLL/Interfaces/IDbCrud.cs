using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    //интерфейс для CRAD взаимодействия с бд 
    public interface IDbCrud
    {
        //получение всех клиентов
        List<Client> GetAllClients();
        //получение клиента по id
        Client GetClient(int ClientId);
        //получение клиента по имени
        Client GetCurrentClient(string ClientNumber);
        //создание клиента
        void CreateClient(Client c);
        //обновление клиента
        void UpdateClient(Client c, int id);
        //удаление клиента
        void DeleteClient(int id);
        //создание истории пополений и списаний
        void CreatePayHistory(PayHistory r);

        //получение всех тарифов
        List<Rate> GetAllRates();
        //получение тарифа по Id 
        Rate GetRate(int Id);
        //удаление тарифа
        void DeleteRate(int id);
        //создание тарифа
        void CreateRate(Rate r);
    }
}
