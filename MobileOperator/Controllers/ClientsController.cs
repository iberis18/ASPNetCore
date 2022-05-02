using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entity;
using DAL.Repository;
using BLL.Interfaces;
using BLL.Util;
using BLL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ASPNetCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        DBDataOperation DB;
        public ClientsController(MobileOperatorContext context)
        {
            DB = new DBDataOperation(new DBRepository(context));
            //db = new DAL.Repository.DBRepository();

            //DBDataOperation db = new DBDataOperation();
            //if (_context.Client.Count() == 0)
            //{
            //    _context.Client.Add(new Client { Name = "Вася Пупкин", RateId = 1 });
            //    _context.Client.Add(new Client { Name = "Маша Крючкина", RateId = 2 });
            //    _context.SaveChanges();
            //}
        }

        [HttpGet]
        public IEnumerable<BLL.Client> GetAll()
        {
            //return _context.Client;
            //return db.Clients.GetList();
            return DB.GetAllClients();
            
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var client = await _context.Client.SingleOrDefaultAsync(c => c.Id == id);
            var client = DB.GetClient(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BLL.Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DB.CreateClient(client);
            //_context.Client.Add(client);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = client.Id }, client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] BLL.Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.UpdateClient(client, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.DeleteClient(id);
            return NoContent();
        }
    }
}
