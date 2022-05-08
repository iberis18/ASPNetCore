using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DAL.Entity
{
    public class MobileOperatorContext : IdentityDbContext<User>
    {
        public MobileOperatorContext(DbContextOptions<MobileOperatorContext> options) : base(options) { }
        public MobileOperatorContext() { }
        public virtual DbSet<Call> Call { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<PayHistory> PayHistory { get; set; }
        public virtual DbSet<Rate> Rate { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<ServiceHistory> ServiceHistory { get; set; }
        public virtual DbSet<SMS> SMS { get; set; }
        public virtual DbSet<Type> Type { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=MobileOperatorDB;Trusted_Connection=True;ConnectRetryCount=0");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>()
                .HasMany(e => e.Call)
                .WithOne(e => e.Client)
                .HasForeignKey(e => e.CalledId);

            modelBuilder.Entity<Client>()
                .HasMany(e => e.Call1)
                .WithOne(e => e.Client1)
                .HasForeignKey(e => e.CallerId);

            modelBuilder.Entity<Client>()
                .HasMany(e => e.SMS)
                .WithOne(e => e.Client)
                .HasForeignKey(e => e.SendedId);

            modelBuilder.Entity<Client>()
                .HasMany(e => e.SMS1)
                .WithOne(e => e.Client1)
                .HasForeignKey(e => e.SenderId);
        }
    }
}
