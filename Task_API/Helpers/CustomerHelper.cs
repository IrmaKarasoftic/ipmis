using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;

namespace Task_API.Helpers
{
    public class CustomerHelper
    {
        public static List<CustomerModel> GetAllCustomers(AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            return new Repository<Customer>(context).Get().ToList().Select(x => factory.Create(x)).ToList();
        }
    }
}