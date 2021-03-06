using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;


namespace ASPNetCoreWebAPI.Controllers
{

    //контроллер клиентов 
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        DBDataOperation DB;
        ILogger logger; // логгер

        public ClientsController()
        {
            DB = new DBDataOperation();
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });
            logger = loggerFactory.CreateLogger<ClientsController>();
        }


        //получение всех клиентов 
        [HttpGet]
        public IEnumerable<BLL.Client> GetAll()
        {
            return DB.GetAllClients(); 
        }


        //получение клиента по номеру 
        [HttpGet("{number}")]
        public async Task<IActionResult> GetCurrentClient([FromRoute] string number)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var client = DB.GetCurrentClient(number);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [Authorize(Roles = "admin")]
        //создание клиента 
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BLL.Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DB.CreateClient(client);
            logger.LogInformation("New user " + client.Number + " added by admin");

            return CreatedAtAction("GetClient", new { id = client.Id }, client);
        }


        [Authorize(Roles = "admin")]
        //обновление клиента 
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] BLL.Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.UpdateClient(client, id);
            logger.LogInformation("User " + client.Number + " edited by admin");

            return NoContent();
        }


        [Authorize(Roles = "admin")]
        //удаление клиента 
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.DeleteClient(id);
            logger.LogInformation("User " + id + " deleted by admin");
            return NoContent();
        }
    }
}
