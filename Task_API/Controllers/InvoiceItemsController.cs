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
    public class InvoiceItemsController : HomeController<InvoiceItem>
    {
        public InvoiceItemsController(Repository<InvoiceItem> repo) : base(repo) { }
        public IHttpActionResult Get()
        {
            try
            {
                var invoiceItems = Repository.Get().ToList().Select(x => Factory.Create(x)).ToList();
                if (invoiceItems != null) return Ok(invoiceItems);
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
                var invoiceItem = Repository.Get(id);
                if (invoiceItem != null) return Ok(invoiceItem);
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
       
        public IHttpActionResult Post(InvoiceItemModel invoiceItem)
        {
            if (invoiceItem != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(invoiceItem, Repository.HomeContext()));
                    return Ok(invoiceItem);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(InvoiceItemModel model)
        {
            if (model != null)
            {
                try
                {
                    InvoiceItem invoiceItem = Repository.Get(model.Id);
                    InvoiceItem inv = Parser.Create(model, Repository.HomeContext());
                    if (invoiceItem != null)
                    {
                        Repository.Update(inv, model.Id);
                        return Ok(Factory.Create(inv));
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
                InvoiceItem invoiceItem = Repository.Get(id);
                if (invoiceItem != null)
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
