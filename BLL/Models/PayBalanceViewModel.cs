using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace BLL.Models
{
    public class PayBalanceViewModel
    {
        [Required]
        [Display(Name = "Sum")]
        public double Sum { get; set; }

        [Required]
        [Display(Name = "ClientId")]
        public int ClientId { get; set; }

    }
}
