using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class CompanyModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public bool IsDeleted { get; set; }

        public int ZipCode { get; set; }
        public string PhoneNumber { get; set; }
    }
}