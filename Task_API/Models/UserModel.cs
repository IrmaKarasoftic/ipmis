using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using TaskDb;
using TaskDb.Entities;

namespace Task_API.Models
{
    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}