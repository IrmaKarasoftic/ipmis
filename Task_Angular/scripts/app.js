(function(){
    var taskAngular = angular.module('taskAngular', ['ngRoute']);

        taskAngular.config(function ($routeProvider) {

            $routeProvider
                .when("/home", {
                    templateUrl: "views/home.html",
                    controller: "homeController"
                })
                .when("/invoices", {
                    templateUrl: "views/invoices.html",
                    controller: "invoicesController"
                })
                .when("/newinvoice", {
                    templateUrl: "views/newInvoice.html",
                    controller: "newInvoiceController"
                })
                .when("/items", {
                    templateUrl: "views/items.html",
                    controller: "itemsController"
                })
                .when("/customers", {
                    templateUrl: "views/customers.html",
                    controller: "customersController"
                })
                .when("/companies", {
                    templateUrl: "views/companies.html",
                    controller: "companiesController"
                })
                .when("/newCompany", {
                    templateUrl: "views/newCompany.html",
                    controller: "companiesController"
                })
                .otherwise({ redirectTo: "/home" });
        })
    /*
    .run(function ($rootScope, $location) {
            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                if (!authenticated) {
                    if (next.templateUrl != "views/login.html")
                        $location.path("/login");
                }
            })
        });
   */
    
}());