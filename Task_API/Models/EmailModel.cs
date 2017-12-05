using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class EmailModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<InvoiceItemModel> Items { get; set; }
        public string Status { get; set; }
        public int Customer { get; set; }
        public string CustomerName { get; set; }
        public CustomerModel BillTo { get; set; }
        public CustomerModel ShipTo { get; set; }
        public bool IsDeleted { get; set; }
        public string MailTo { get; set; }
    }
}