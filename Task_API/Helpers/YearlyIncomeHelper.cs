using System.Linq;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class YearlyIncomeHelper
    {
        public static YearlyIncomeModel GetRevenueByYear(int year, AppContext context)
        {
            var factory = new ModelFactory();
            var model = new YearlyIncomeModel();
            var invoiceRepository = new Repository<InvoiceItem>(context);
            double total = 0;
            var list = invoiceRepository.context.InvoiceItems.Where(i => i.Invoice.Date.Year == year).ToList();
            foreach (var item in list)
            {
                if (item.Invoice.Status != Status.Paid) continue;
                total += item.Price * item.Quantity;
                var iModel = factory.Create(item.Item);
                iModel.Quantity = item.Quantity;
                iModel.UnitPrice = item.Price;
                model.Items.Add(iModel);
            }
            model.Total = total;
            model.year = year;
            return model;
        }
    }
}