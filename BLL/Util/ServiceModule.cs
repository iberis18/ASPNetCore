﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;
using DAL.Repository;
using Ninject.Modules;

namespace BLL.Util
{
    public class ServiceModule : NinjectModule
    {
        public ServiceModule()
        {
        }
        public override void Load()
        {
            Bind<IDbRepos>().To<DBRepository>().InSingletonScope();
        }
    }
}
