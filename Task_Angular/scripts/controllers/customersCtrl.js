(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('customersController', function ($scope, dataService) {
        $scope.removeOnId;

        $scope.loadCustomersInfo = function () {
            $scope.waitCustomers = true;
            dataService.list("customers", function (data) {
                if (data) {
                    $scope.customers = data;
                    $scope.waitCustomers = false;
                }
                else {
                    notificationsConfig.error("Error!");
                }
            })
            dataService.list("companies", function (data) {
                if (data) {
                    $scope.companies = data;
                }
                else {
                    notificationsConfig.error("Error!");
                }
            })
        };

        $scope.customerTransfer = function (customer) {
            $scope.requestedCustomer = customer;
            $scope.editCustomer = $.extend(true, {}, customer);
        };

        $scope.newCustomer = {
            id: null,
            name: "",
            company: null
        }
        $scope.charsAndNumbers = "^[a-zA-Z0-9]*$";

        $scope.cancelCustomer = function () {
            $scope.newCustomer = {
                id: null,
                name: "",
                company: null
            }
        }

        $scope.createNewCustomer = function () {
            if ($scope.newCustomer.name === "" ||
                $scope.newCustomer.company === null) {
                notificationsConfig.error("All fields must be filled in!");
                return;
            }
            dataService.create("customers", $scope.newCustomer, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    notificationsConfig.success("Customer added");
                }
                else notificationsConfig.error("Adding customers failed!");
            })
            $scope.cancelCustomer();
        }


        $scope.updateCustomer = function () {
            if ($scope.newCustomer.name === "" ||
    $scope.newCustomer.company === null) {
                notificationsConfig.error("All fields must be filled in!");
                return;
            }
            dataService.update("customers", $scope.editCustomer.id, $scope.editCustomer, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    notificationsConfig.success("Customer updated");
                }
                else {
                    notificationsConfig.success("Customer update failed");
                }

            })
        }

        $scope.removeCustomer = function () {
            $scope.newCustomer.isDeleted = true;
            dataService.update("customers", $scope.newCustomer.id, $scope.newCustomer, function (data) {
                $scope.loadCustomersInfo();
                if (data) {
                    notificationsConfig.success("Customer deleted");
                }
                else {
                    notificationsConfig.success("Customer delete failed");
                }
            })
        }


        $scope.CustomerRemoveOn = function (customer) {
            $scope.removeOnId = customer.id;
            $scope.newCustomer = customer;
        }
        $scope.CustomerRemoveOff = function () {
            $scope.removeOnId = null;
            $scope.newCustomer = null;
        }
        $scope.CustomerCheckRemove = function (customer) {
            return $scope.removeOnId === customer.id;
        }

        $scope.loadCustomersInfo();


    });
}());
