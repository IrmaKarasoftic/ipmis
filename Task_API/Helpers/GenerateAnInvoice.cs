using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class GenerateAnInvoice
    {

        public static void Create(InvoiceModel model, AppContext context)
        {
            EntityParser parser = new EntityParser();
            ModelFactory factory = new ModelFactory();
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Repository<Item> itemRepository = new Repository<Item>(context);

            Invoice invoice = new Invoice();
            invoice.Id = model.Id;
            invoice.Date = model.Date;
            invoice.Customer = context.Customers.Find(model.Customer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), model.Status);

            //a way to avoid a front-end problem when BillTo and Ship to are the same person - one of them is always null
            if (model.BillTo == null)
            {
                invoice.BillTo = context.Customers.Find(model.ShipTo.Id);
            }
            else if (model.ShipTo == null)
            {
                invoice.BillTo = context.Customers.Find(model.BillTo.Id);
            }
            else
            {
                invoice.BillTo = context.Customers.Find(model.BillTo.Id);
                invoice.ShipTo = context.Customers.Find(model.ShipTo.Id);
            }
            invoiceRepository.Insert(invoice);
        }
        public static List<InvoiceModel> GetAllInvoices(AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            return new Repository<Invoice>(context).Get().ToList().Select(x => factory.Create(x)).ToList();
        }

        public static void UpdateInvoice(InvoiceModel model, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = new Invoice();
            EntityParser parser = new EntityParser();
            invoice = parser.Create(model, context);
            invoiceRepository.Update(invoice, model.Id);
        }

        public static void DeleteInvoice(InvoiceModel model, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = invoiceRepository.Get(model.Id);
            invoiceRepository.Delete(model.Id);
        }
    }
}