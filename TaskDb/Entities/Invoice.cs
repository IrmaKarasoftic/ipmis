using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static TaskDb.Enumerators;

namespace TaskDb
{
    public class Invoice
    {
        public Invoice()
        {
            Items = new Collection<InvoiceItem>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<InvoiceItem> Items { get; set; }
        public Status Status { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Customer BillTo { get; set; }
        public virtual Customer ShipTo { get; set; }
        public virtual Customer Customer { get; set; }

    }
}
