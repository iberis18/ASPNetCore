using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entity;

namespace BLL
{
    public class Rate
    {
        DAL.Entity.Rate rate = new DAL.Entity.Rate();
        public int Id { get; set; }
        public bool? Status { get; set; }
        public string Name { get; set; }
        public double? CityCost { get; set; }
        public double? IntercityCost { get; set; }
        public double? InternationalCost { get; set; }
        public int? GB { get; set; }
        public int? SMS { get; set; }
        public int? Minutes { get; set; }
        public double? GBCost { get; set; }
        public double? MinuteCost { get; set; }
        public double? SMSCost { get; set; }
        public double? Cost { get; set; }

        public Rate() { }
        public Rate(int id)
        {
            Id = id;
        }
        public Rate(DAL.Entity.Rate r)
        {
            Id = r.Id;
            Status = r.Status;
            Name = r.Name;
            CityCost = r.CityCost;
            IntercityCost = r.IntercityCost;
            InternationalCost = r.InternationalCost;
            GB = r.GB;
            SMS = r.SMS;
            Minutes = r.Minutes;
            GBCost = r.GBCost;
            MinuteCost = r.MinuteCost;
            SMSCost = r.SMSCost;
            Cost = r.Cost;
        }
    }
}
