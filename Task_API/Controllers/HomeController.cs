using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class HomeController<E> : ApiController where E:class
    {
        private Repository<E> repository;
        private ModelFactory modelFactory;
        private EntityParser entityParser;

        public HomeController(Repository<E> _repo)
        {
            repository = _repo;
        }
        protected Repository<E> Repository
        {
            get { return repository; }
        }


        protected ModelFactory Factory
        {
            get
            {
                if (modelFactory == null) modelFactory = new ModelFactory();
                return modelFactory;
            }
        }

        protected EntityParser Parser
        {
            get
            {
                if (entityParser == null) entityParser = new EntityParser();
                return entityParser;
            }
        }
    }
}
