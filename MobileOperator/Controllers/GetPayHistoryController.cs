using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BLL.Operations;
using Microsoft.Extensions.Logging;

namespace ASPNetCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //получение истории платежей 
    public class GetPayHistoryController : ControllerBase
    {
        PayHistoryOperation DB;
        ILogger logger; // логгер

        public GetPayHistoryController()
        {
            DB = new PayHistoryOperation();
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });
            logger = loggerFactory.CreateLogger<GetPayHistoryController>();
        }


        //полученеие истории пополнений и списаний  
        [Authorize(Roles = "user")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayHistory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var client = DB.GetPayHistory(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

    }
}
