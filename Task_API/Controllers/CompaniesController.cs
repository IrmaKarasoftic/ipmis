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
    public class CompaniesController : HomeController<Company>
    {
        public CompaniesController(Repository<Company> repo) : base(repo) { }

        public IHttpActionResult Get()
        {
            try
            {
                //Get all companies that aren't deleted
                var companies = Repository.Get().ToList().Select(x => Factory.Create(x)).ToList().Where(x => x.IsDeleted == false).ToList();
                return Ok(companies);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                Company company = Repository.Get(id);
                if (company != null) return Ok(company);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(CompanyModel company)
        {
            if (company != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(company, Repository.HomeContext()));
                    return Ok(company);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(CompanyModel model, int id)
        {
            if (model != null)
            {

                Company comp = Repository.Get(id);
                Company company = Parser.Create(model, Repository.HomeContext());
                if (comp != null)
                {
                    Repository.Update(company, id);
                    return Ok(Factory.Create(company));
                }
                return NotFound();
            }
            return NotFound();
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Company company = Repository.Get(id);
                if (company != null)
                {
                    Repository.Delete(id);
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
