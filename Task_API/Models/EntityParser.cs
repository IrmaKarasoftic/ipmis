using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Models
{
    public class EntityParser
    {
        public Invoice Create(InvoiceModel model, AppContext context)
        {
            return new Invoice()
            {
                Id = model.Id,
                Date = model.Date,
                Customer = context.Customers.Find(model.Customer),
                Status = (Status)Enum.Parse(typeof(Status), model.Status),
                IsDeleted = model.IsDeleted,
            };
        }
        public Item Create(ItemModel model, AppContext context)
        {
            return new Item()
            {
                Id = model.Id,
                Description = model.Description,
                Quantity = model.Quantity,
                UnitPrice = model.UnitPrice,
                IsDeleted = model.IsDeleted,
            };
        }
        public InvoiceItem Create(InvoiceItemModel model, AppContext context)
        {
            return new InvoiceItem()
            {
                Id = model.Id,
                Invoice = context.Invoices.Find(model.InvoiceId),
                Item = context.Items.Find(model.ItemId),
                Quantity = model.Quantity,
                Price = model.Price
            };
        }
        public Company Create(CompanyModel model, AppContext context)
        {
            return new Company
            {
                Id = model.Id,
                Name = model.Name,
                city = model.City,
                phoneNumber = model.PhoneNumber,
                StreetAddress = model.StreetAddress,
                zipCode = model.ZipCode,
                IsDeleted = model.IsDeleted,
            };
        }

        public Customer Create(CustomerModel model, AppContext context)
        {
            return new Customer()
            {
                Id = model.Id,
                Name = model.Name,
                Company = context.Companies.Find(model.Company),
                IsDeleted = model.IsDeleted,
            };
        }
    }
}