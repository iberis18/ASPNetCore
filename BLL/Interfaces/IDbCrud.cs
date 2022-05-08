﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IDbCrud
    {
        List<Client> GetAllClients();
        Client GetClient(int ClientId);
        Client GetCurrentClient(string ClientNumber);
        void CreateClient(Client c);
        void UpdateClient(Client c, int id);
        void DeleteClient(int id);
        void CreatePayHistory(PayHistory r);


        List<Rate> GetAllRates();
        Rate GetRate(int Id);
        void DeleteRate(int id);
        void CreateRate(Rate r);
    }
}
