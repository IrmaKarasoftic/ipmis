using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class ChangeStatusHelper
    {
        public static void ChangeStatus(InvoiceModel model, string status, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            EntityParser parser = new EntityParser();
            Invoice invoice = new Invoice();
            invoice = parser.Create(model, context);
            
            invoiceRepository.Update(invoice, model.Id);
        }
    }
}
