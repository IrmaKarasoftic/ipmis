using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class InvoiceItemModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int InvoiceId { get; set; }
        public int ItemId { get; set; }
        public double Price { get; set; }


    }
}