using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class YearlyIncomeModel
    {
        public YearlyIncomeModel()
        {
            Items = new List<ItemModel>();
        }
        public List<ItemModel> Items { get; set; }
        public double Total { get; set; }
        public int year { get; set; }
    }
}