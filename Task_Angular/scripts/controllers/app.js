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
                .when("/customers", {
                    templateUrl: "views/customers.html",
                    controller: "customersController"
                })
                .when("/login", {
                    templateUrl: "views/login.html",
                    controller: "loginController"
                })
                .when("/companies", {
                    templateUrl: "views/companies.html",
                    controller: "companiesController"
                })
                .otherwise({ redirectTo: "/home" });
        })
    
}());