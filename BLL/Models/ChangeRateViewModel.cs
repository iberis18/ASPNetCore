using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace BLL.Models
{
    //Модель для смены тарифа
    public class ChangeRateViewModel
    {
        [Required]
        [Display(Name = "RateId")]
        public int RateId { get; set; }

        [Required]
        [Display(Name = "ClientId")]
        public int ClientId { get; set; }

    }
}
