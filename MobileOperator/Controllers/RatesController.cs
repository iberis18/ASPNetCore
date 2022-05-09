using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using Microsoft.AspNetCore.Mvc;
using BLL.Operations;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;


namespace ASPNetCoreWebAPI.Controllers
{

    //контроллер тарифов 
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        ArchiveRateOperation archiveRateOperation;
        DBDataOperation DB;
        ILogger logger; // логгер


        public RatesController()
        {
            DB = new DBDataOperation();
            archiveRateOperation = new ArchiveRateOperation();
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });
            logger = loggerFactory.CreateLogger<RatesController>();
        }


        //получение списка всех тарифов 
        [HttpGet]
        public IEnumerable<BLL.Rate> GetAll()
        {
            return DB.GetAllRates();
        }


        //получение тарифа по ID 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRate([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rate = DB.GetRate(id);

            if (rate == null)
            {
                return NotFound();
            }

            return Ok(rate);
        }


        //создание тарифа 
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BLL.Rate rate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DB.CreateRate(rate);
            logger.LogInformation("New rate " + rate.Name + " added by admin");
            return CreatedAtAction("GetRate", new { id = rate.Id }, rate);
        }


        //получение архивных тарифов 
        [Authorize(Roles = "admin")]
        [HttpGet("archive")]
        public IEnumerable<BLL.Rate> GetAllArchive()
        {
            return archiveRateOperation.GetAll();
        }


        //обновление тарифа
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] BLL.Rate rate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.UpdateRate(rate, id);
            logger.LogInformation("Rate №" + id +" " + rate.Name + " edited by admin");

            return NoContent();
        }
    }
}
