using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;

namespace Task_API.Models
{
    public class InvoiceModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<InvoiceItemModel> Items { get; set; }
        public string Status { get; set; }
        public int Customer { get; set; }
        public string Name { get; set; }
        public ShippingDetailsModel BillTo { get; set; }
        public ShippingDetailsModel ShipTo { get; set; }
        public bool IsDeleted { get; set; }
    }
}