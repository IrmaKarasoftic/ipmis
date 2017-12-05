using Database;
using System.Web.Http;
using Task_API.Controllers;
using WebApi.Filters;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Controllers
{
    [SchoolAuthorize]
    public class DashboardController : HomeController
    {
        UserModel ident = new UserModel();

        public DashboardController(Repository<User> depo) : base(depo)
        { }
        
        public IHttpActionResult Get(int id = 0)
        {
            User user;
            if (id == 0)
            {
                user = ident.currentUser;
            }
            else
                user = Repository.Get(id);

            return Ok(Dashboard.Create(user));
        }
    }
}
