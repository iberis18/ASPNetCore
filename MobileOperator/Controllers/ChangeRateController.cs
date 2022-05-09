using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BLL.Operations;
using BLL.Models;
using Microsoft.Extensions.Logging;


namespace ASPNetCoreWebAPI.Controllers
{
    [Produces("application/json")]
    [ApiController]

    //контроллер смены тарифа 
    public class ChangeRateController : ControllerBase
    {
        DBDataOperation DB;
        ILogger logger; // логгер

        public ChangeRateController()
        {
            DB = new DBDataOperation();

            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });
            logger = loggerFactory.CreateLogger<ChangeRateController>();
        }


        //смена тарифа 
        [Authorize(Roles = "user")]
        [HttpPost]
        [Route("api/BL/ChangeRate")]
        public async Task<IActionResult> ChangeRate([FromBody] ChangeRateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ChangeRateOperation changeRate = new ChangeRateOperation();


            string error = changeRate.ChangeRate(model.ClientId, model.RateId);
            if (error == "")
            {
                logger.LogInformation("User № " + model.ClientId + "switched to rate № " + model.RateId);
                return NoContent();
            }
            else
            {
                var msg = new { message = error };
                return Ok(msg);
            }
        }


        //пополение баланса 
        [Authorize(Roles = "user")]
        [HttpPost]
        [Route("api/BL/PayBalance")]
        public async Task<IActionResult> Pay([FromBody] PayBalanceViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ChangeRateOperation changeRate = new ChangeRateOperation();


            string error = changeRate.PayBalance(model.Sum, model.ClientId);
            if (error == "")
            {
                logger.LogInformation("User № " + model.ClientId + "topped up the balance by " + model.Sum + " rubles");
                return NoContent();
            }
            else
            {
                var msg = new { message = error };
                return Ok(msg);
            }
        }
    }
}
