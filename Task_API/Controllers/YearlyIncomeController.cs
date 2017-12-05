using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class YearlyIncomeController : HomeController<InvoiceItem>
    {
        public YearlyIncomeController(Repository<InvoiceItem> repo) : base(repo) { }
        public IHttpActionResult GetByYear(int id)
        {
            try
            {
                YearlyIncomeModel yearlyIncome = Helpers.YearlyIncomeHelper.GetRevenueByYear(id, Repository.HomeContext());
                if (yearlyIncome != null) return Ok(yearlyIncome);
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
