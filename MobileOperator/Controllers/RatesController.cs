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
using BLL.Operations;


namespace ASPNetCoreWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        ArchiveRateOperation archiveRateOperation;
        DBDataOperation DB;

        public RatesController()
        {
            DB = new DBDataOperation();
            archiveRateOperation = new ArchiveRateOperation();
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BLL.Rate rate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DB.CreateRate(rate);
            //_context.Client.Add(client);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetRate", new { id = rate.Id }, rate);
        }

        [HttpGet("archive")]
        public IEnumerable<BLL.Rate> GetAllArchive()
        {
            return archiveRateOperation.GetAll();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] BLL.Rate rate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.UpdateRate(rate, id);

            return NoContent();
        }


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
