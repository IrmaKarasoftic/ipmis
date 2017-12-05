using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;

namespace Task_API.Helpers
{
    public class CompaniesHelper
    {
        public static void UpdateCompany(CompanyModel model, AppContext context)
        {
            Repository<Company> companyRepository = new Repository<Company>(context);
            Company company = new Company();
            EntityParser parser = new EntityParser();
            company = parser.Create(model, context);
            companyRepository.Update(company, model.Id);
        }
    }
}