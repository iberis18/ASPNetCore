using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DAL.Entity
{

    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MobileOperatorContext>
    {
        public MobileOperatorContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new
           ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
            var builder = new
           DbContextOptionsBuilder<MobileOperatorContext>();
            var connectionString =
           configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new MobileOperatorContext(builder.Options);
        }
    }

}
