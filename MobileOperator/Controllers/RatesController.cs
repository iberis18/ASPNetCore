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
    public class RatesController : ControllerBase
    {
        DBDataOperation DB;
        public RatesController(MobileOperatorContext context)
        {
            DB = new DBDataOperation(new DBRepository(context));
        }

        [HttpGet]
        public IEnumerable<BLL.Rate> GetAll()
        {
            return DB.GetAllRates();
        }

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

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] BLL.Client client)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    DB.CreateClient(client);
        //    //_context.Client.Add(client);
        //    //await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetClient", new { id = client.Id }, client);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update([FromRoute] int id, [FromBody] BLL.Client client)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    DB.UpdateClient(client, id);

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var item = _context.Client.Find(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.Client.Remove(item);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}
    }
}
