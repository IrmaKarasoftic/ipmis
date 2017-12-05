using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb.DataAccess
{
    public class CustomerUnit:Repository<Customer>
    {
        public CustomerUnit(AppContext context) : base(context) { }

        public override void Insert(Customer entity)
        {
            context.Customers.Add(entity);
            context.Entry(entity.Company).State = EntityState.Unchanged;
            context.SaveChanges();
        }

        public override void Update(Customer entity, int id)
        {
            Customer oldCustomer = Get(id);
            if (oldCustomer != null)
            {
                context.Entry(oldCustomer).CurrentValues.SetValues(entity);
                oldCustomer.Company = entity.Company;
                context.SaveChanges();
            }
        }
    }
}
