(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newCustomerController', function ($scope, dataService) {

        $scope.newCustomer = {
            name: "",
            company: 0,
            companyName: "",
            streetAddress: "",
            city: "",
            zipCode: 0,
            phoneNumber:""
        }

        $scope.loadCustomersInfo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    $scope.customers = data;
                }
                else {
                    alert("error");
                }
            })
        };

        $scope.createNewCustomer = function () {
            if ($scope.newCustomer)
                dataService.create("customers", $scope.newCustomer, function (data) {
                    if (data) {
                        alert("customer created");
                    }
                    else
                        alert("error");
                })
        }
        $scope.loadCustomersInfo();

    });
}());