using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;

namespace Task_API.Controllers
{
    public class EmailsController : ApiController
    {
        public IHttpActionResult Post(EmailModel email)
        {
            if (email != null)
            {
                try
                {
                    Helpers.EmailHelper.SendInvoiceEmail(email);
                    return Ok(email);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
        }
    }
}
