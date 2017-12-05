using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;
using TaskDb.DataAccess;

namespace Task_API.Controllers
{
    public class CustomersController : HomeController<Customer>
    {
        public CustomersController(Repository<Customer> repo) : base(repo) { }


        public IHttpActionResult Get()
        {
            try
            {
                List<CustomerModel> customers = Helpers.CustomerHelper.GetAllCustomers(Repository.HomeContext()).Where(x => x.IsDeleted == false).ToList();
                if (customers != null) return Ok(customers);
                return NotFound();
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
                var customer = Repository.Get(id);
                if (customer != null) return Ok(customer);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(CustomerModel customer)
        {
            if (customer != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(customer, Repository.HomeContext()));
                    return Ok(customer);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(CustomerModel customer, int id)
        {
            if (customer != null)
            {
                try
                {
                    int companyId = customer.Company;
                    Company comp = new Repository<Company>(Repository.HomeContext()).Get(companyId);
                    Customer co = Repository.Get(id);
                    Customer cost = Parser.Create(customer, Repository.HomeContext());
                    if (co != null)
                    {
                        new CustomerUnit(Repository.HomeContext()).Update(cost, id);
                        return Ok(Factory.Create(cost));
                    }
                    return NotFound();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Customer customer = Repository.Get(id);
                if (customer != null)
                {
                    Repository.Delete(id);
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
