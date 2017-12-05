using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class ShippingDetailsModel
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String CompanyName { get; set; }
        public String StreetAddress { get; set; }
        public String City { get; set; }

        public int ZipCode { get; set; }
        public String PhoneNumber { get; set; }
    }
}