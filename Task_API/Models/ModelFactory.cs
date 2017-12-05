using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;

namespace Task_API.Models
{
    public class ModelFactory
    {
        public InvoiceModel Create(Invoice invoice)
        {
            List<InvoiceItemModel> items = new List<InvoiceItemModel>();
            foreach (var i in invoice.Items)
            {
                var itModel = new InvoiceItemModel();
                itModel.Id = i.Id;
                itModel.Description = i.Item.Description;
                itModel.Quantity = i.Quantity;
                itModel.Price = i.Price;
                items.Add(itModel);
            }

            ShippingDetailsModel bill = new ShippingDetailsModel()
            {
                CompanyName = invoice.BillTo.Company.Name,
                StreetAddress = invoice.BillTo.Company.StreetAddress,
                Name = invoice.BillTo.Name,
                PhoneNumber = invoice.BillTo.Company.phoneNumber,
                City = invoice.BillTo.Company.city,
                ZipCode = invoice.BillTo.Company.zipCode,
            };
            ShippingDetailsModel ship = new ShippingDetailsModel()
            {
                CompanyName = invoice.ShipTo.Company.Name,
                StreetAddress = invoice.ShipTo.Company.StreetAddress,
                Name = invoice.ShipTo.Name,
                PhoneNumber = invoice.ShipTo.Company.phoneNumber,
                City = invoice.ShipTo.Company.city,
                ZipCode = invoice.ShipTo.Company.zipCode
            };
            return new InvoiceModel()
            {
                Id = invoice.Id,
                Date = invoice.Date,
                Items = items,
                Status = invoice.Status.ToString(),
                Customer = invoice.Customer.Id,
                Name = invoice.Customer.Name,
                BillTo = bill,
                ShipTo = ship,
                IsDeleted = invoice.IsDeleted,
            };
        }

        public ItemModel Create(Item item)
        {
            return new ItemModel()
            {
                Id = item.Id,
                Description = item.Description,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                IsDeleted = item.IsDeleted,
            };
        }

        public CompanyModel Create(Company company)
        {
            return new CompanyModel()
            {
                Id = company.Id,
                StreetAddress = company.StreetAddress,
                City = company.city,
                Name = company.Name,
                PhoneNumber = company.phoneNumber,
                ZipCode = company.zipCode,
                IsDeleted = company.IsDeleted,
            };
        }

        public CustomerModel Create(Customer customer)
        {
            return new CustomerModel()
            {
                Id = customer.Id,
                Name = customer.Name,
                Company = customer.Company.Id,
                CompanyName = customer.Company.Name,
                City = customer.Company.city,
                ZipCode = customer.Company.zipCode,
                PhoneNumber = customer.Company.phoneNumber,
                StreetAddress = customer.Company.StreetAddress,
                IsDeleted = customer.IsDeleted,
            };
        }

        public InvoiceItemModel Create(InvoiceItem invoiceItem)
        {
            return new InvoiceItemModel()
            {
                Id = invoiceItem.Id,
                InvoiceId = invoiceItem.Invoice.Id,
                ItemId = invoiceItem.Item.Id,
                Quantity = invoiceItem.Quantity,
                Description = invoiceItem.Item.Description,
                Price = invoiceItem.Price
            };
        }
    }
}