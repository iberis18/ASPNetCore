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
    //[Produces("application/json")]
    [ApiController]
    public class GetPayHistoryController : ControllerBase
    {
        PayHistoryOperation DB;
        public GetPayHistoryController(MobileOperatorContext context)
        {
            DB = new PayHistoryOperation(new DBRepository(context));
        }

        [Authorize(Roles = "user")]

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurrentClient([FromRoute] int id)
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
