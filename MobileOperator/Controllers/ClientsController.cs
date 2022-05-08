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
using Microsoft.AspNetCore.Authorization;
using BLL.Operations;
using BLL.Models;


namespace ASPNetCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        DBDataOperation DB;
        public ClientsController()
        {
            DB = new DBDataOperation();

            //db = new DAL.Repository.DBRepository();

            //DBDataOperation db = new DBDataOperation();
            //if (_context.Client.Count() == 0)
            //{
            //    _context.Client.Add(new Client { Name = "Вася Пупкин", RateId = 1 });
            //    _context.Client.Add(new Client { Name = "Маша Крючкина", RateId = 2 });
            //    _context.SaveChanges();
            //}
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public IEnumerable<BLL.Client> GetAll()
        {
            //return _context.Client;
            //return db.Clients.GetList();
            return DB.GetAllClients();
            
        }

        //[Authorize(Roles = "admin")]
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetClient([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    //var client = await _context.Client.SingleOrDefaultAsync(c => c.Id == id);
        //    var client = DB.GetClient(id);

        //    if (client == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(client);
        //}

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

        [Authorize(Roles = "admin")]
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


        //[Authorize(Roles = "user")]
        //// GET api/clients/rateId/clientId
        //[HttpGet]
        //[Route("{rateId:int}/{clientId:int}")]
        ////[HttpGet("{rateId}/{clientId}")]
        //public async Task<IActionResult> ChangeRate([FromRoute] int rateId, [FromBody] int clientId)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    ChangeRateOperation changeRate = new ChangeRateOperation(repos);


        //    string error = changeRate.ChangeRate(clientId, rateId);
        //    if (error == "")
        //        return NoContent();
        //    else
        //    {
        //        var msg = new { message = error };
        //        return Ok(msg);
        //    }

        //}


        [Authorize(Roles = "admin")]
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
