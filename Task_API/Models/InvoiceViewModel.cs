using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class InvoiceViewModel
    {
        public CustomerModel Customer { get; set; }
        public CompanyModel Company { get; set; }
        public InvoiceModel Invoice { get; set; }
        public ShippingDetailsModel BillTo { get; set; }
        public ShippingDetailsModel ShipTo { get; set; }
    }
}