using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly DataContext _contexto;
        public ValuesController(DataContext ctx) {
            _contexto = ctx;
        }

        // GET api/Values
        [HttpGet]
        public  async Task<IActionResult> GetValues()
        {
            var values = await _contexto.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/Values/5
        [HttpGet("{id}")]
        public  async Task<IActionResult> GetValue(int id)
        {
            var value = await _contexto.Values.FirstOrDefaultAsync(x=> x.Id == id);
            return Ok(value);
        }
// 
        
    }
}
