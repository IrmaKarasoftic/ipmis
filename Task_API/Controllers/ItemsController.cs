using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Controllers;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class ItemsController : HomeController<Item>
    {
        public ItemsController(Repository<Item> repo) : base(repo) { }

        public IHttpActionResult Get()
        {
            try
            {
                var items = Repository.Get().ToList().Select(x => Factory.Create(x)).ToList().Where(x => x.IsDeleted == false).ToList();
                if (items != null) return Ok(items);
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
                var item = Repository.Get(id);
                if (item != null) return Ok(item);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(ItemModel item)
        {
            if (item != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(item, Repository.HomeContext()));
                    return Ok(item);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(ItemModel item, int id)
        {
            if (item != null)
            {
                try
                {
                    Item ite = Repository.Get(id);
                    Item it = Parser.Create(item, Repository.HomeContext());
                    if (ite != null)
                    {
                        Repository.Update(it, id);
                        return Ok(Factory.Create(it));
                    }
                    return NotFound();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return NotFound();
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Item item = Repository.Get(id);
                if (item != null)
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
