using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb
{
    public class InvoiceItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public virtual Invoice Invoice { get; set; }
        public virtual Item Item { get; set; }
        public double Price { get; set; }
    }
}
