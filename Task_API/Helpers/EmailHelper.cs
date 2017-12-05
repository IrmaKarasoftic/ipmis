using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using TaskDb;
using System.Net;
using Task_API.Models;

namespace Task_API.Helpers
{
    public class EmailHelper
    {
        public static void SendInvoiceEmail(EmailModel invoiceToSend)
        {
            SmtpClient SmtpServer = EmailHelper.SetSmtp();
            String Username = System.Configuration.ConfigurationManager.AppSettings["emailUsername"];

            MailAddress from = new MailAddress(Username);
            string subject = "Invoice: ";

            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.From = from;
            mail.Subject = subject;

            double subtotal = 0;
            double taxRate = 0.17;
            double tax = 0;
            double total = 0;
            string bodyHtml = "";

            bodyHtml = "<h2 style='font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;'>INVOICE #"+invoiceToSend.Id+ " " + invoiceToSend.Status + "</h2><h1 style='font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;'>XYZ<br/><small>Makes billing easy</small></h1><hr><h4>Date:" + invoiceToSend.Date + "</h4><h5>Invoice ID:" + invoiceToSend.Id + "</h5><h5>Customer ID:" + invoiceToSend.Customer + "</h5><hr><div style='width:20vw; display:inline-block; border: #008cba solid;margin:10px; padding:5px':> <strong>From:</strong></h3> <div class='panel-body'> <p>2854 Granville Lane</p><p>Newark, 07104</p><p>973-482-1872</p><p> </p><p> </p><p> </p><p> </p></div></div><div style='width:20vw; display:inline-block; border: #008cba solid;margin:10px; padding:5px':> <strong>Bill To:</strong></h3> <div class='panel-body'> <p>Customer Name" + invoiceToSend.BillTo.Name + "</p><p>Company Name:" + invoiceToSend.BillTo.CompanyName + "</p><p>Street Address:" + invoiceToSend.BillTo.StreetAddress + "</p><p>City, Zip:" + invoiceToSend.BillTo.City + ", " + invoiceToSend.BillTo.ZipCode + "</p><p>Phone/Fax:" + invoiceToSend.BillTo.PhoneNumber + "</p></div></div><div style='width:20vw; display:inline-block; border: #008cba solid;margin:10px; padding:5px':> <strong>Ship To:</strong> <div class='panel-body'> <p>Customer Name:" + invoiceToSend.ShipTo.Name + "</p><p>Company Name:" + invoiceToSend.ShipTo.CompanyName + "</p><p>Street Address:" + invoiceToSend.ShipTo.StreetAddress + "</p><p>City, Zip:" + invoiceToSend.ShipTo.City + "," + invoiceToSend.ShipTo.ZipCode + "</p><p>Phone/Fax:" + invoiceToSend.ShipTo.PhoneNumber + "</p></div></div><div> <div style='width:13vw; display:inline-block;'><h4>ID</h4></div><div style='width:13vw; display:inline-block;'><h4>Description</h4></div><div style='width:13vw; display:inline-block;'><h4>Amount</h4></div><div style='width:13vw; display:inline-block;'><h4>Quantity</h4></div><div style='width:13vw; display:inline-block;'><h4>Total</h4></div></div><hr>";
            foreach (InvoiceItemModel i in invoiceToSend.Items)
            {
                bodyHtml += "<div style='width:13vw; display:inline-block;'>" + i.Id + "</div><div style='width:13vw; display:inline-block;'>" + i.Description + "</div><div style='width:13vw; display:inline-block;'>" + i.Price + "</div><div style='width:13vw; display:inline-block;'>" + i.Quantity + "</div><div style='width:13vw; display:inline-block;'>" + i.Quantity * i.Price + "</div>";
                subtotal += i.Quantity * i.Price;
            }
            tax = subtotal * taxRate;
            total = subtotal + tax;

            bodyHtml+= "<hr><hr><div><p><strong>Subtotal:" + Math.Round(subtotal,2) + "</strong></p><p><strong>Tax Rate:"+ Math.Round(taxRate,2) + "</strong></p><p><strong>Tax:" + tax + "</strong></p><p><strong>Other: </strong></p><h3><strong>TOTAL:" + Math.Round(total,2) + "</strong></h3></div>";

            
            mail.Body = bodyHtml;
            mail.To.Add(new MailAddress(invoiceToSend.MailTo));
            SmtpServer.Send(mail);
        }

        private static SmtpClient SetSmtp()
        {
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com",587);
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            string emailUserame = System.Configuration.ConfigurationManager.AppSettings["emailUsername"];
            string emailPassword = System.Configuration.ConfigurationManager.AppSettings["emailPassword"];
            SmtpServer.Credentials = new NetworkCredential(emailUserame,emailPassword);
            SmtpServer.EnableSsl = true;
            return SmtpServer;
        }
    }
}