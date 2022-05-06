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
    public class ChangeRateController : ControllerBase
    {
        DBDataOperation DB;
        DBRepository repos;
        public ChangeRateController(MobileOperatorContext context)
        {
            repos = new DBRepository(context);
            DB = new DBDataOperation(repos);

            //db = new DAL.Repository.DBRepository();

            //DBDataOperation db = new DBDataOperation();
            //if (_context.Client.Count() == 0)
            //{
            //    _context.Client.Add(new Client { Name = "Вася Пупкин", RateId = 1 });
            //    _context.Client.Add(new Client { Name = "Маша Крючкина", RateId = 2 });
            //    _context.SaveChanges();
            //}
        }

        [HttpPost]
        public async Task<IActionResult> ChangeRate([FromBody] ChangeRateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ChangeRateOperation changeRate = new ChangeRateOperation(repos);


            string error = changeRate.ChangeRate(model.ClientId, model.RateId);
            if (error == "")
                return NoContent();
            else
            {
                var msg = new { message = error };
                return Ok(msg);
            }
        }
    }
}
