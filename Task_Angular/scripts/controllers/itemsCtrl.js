(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('itemsController', function ($scope, dataService) {

        $scope.newItemRow = false;
        $scope.editOnId;
        $scope.removeOnId;

        $scope.newItem = {
            id: null,
            description: "",
            quantity: null,
            unitPrice: null,
            isDeleted: false
        }

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    $scope.items = data;
                }
                else {
                    notificationsConfig.error("error");
                }
            })
        };

        $scope.incorrect= false;
        $scope.validation = function () {
            if ($scope.newItem === null ||
                $scope.newItem.description === "" ||
                $scope.newItem.quantity === 0 ||
                $scope.newItem.unitPrice === 0 ||
                typeof $scope.newItem.quantity !== "number" ||
                typeof $scope.newItem.unitPrice !== "number") {
                alert("Incorrect input");
                $scope.incorrect = true;
                return;
            }
        }

        $scope.createNewItem = function () {
            $scope.validation();
            if ($scope.incorrect) {
                $scope.incorrect = false;
                return;
            }
            dataService.create("items", $scope.newItem, function (data) {
                if (data)
                {
                    notificationsConfig.success("Item created");
                }
                else
                    notificationsConfig.error("Error");
                $scope.hideNewItemRow();
                $scope.loadItemsInfo();
            })
        }

        $scope.updateItem = function () {
            $scope.validation();
            if ($scope.incorrect) {
                $scope.incorrect = false;
                return;
            }
            dataService.update("items", $scope.newItem.id, $scope.newItem, function (data) {
                if (data) {
                    notificationsConfig.success("Item updated");
                }
                else {
                    notificationsConfig.error("error");
                }
                $scope.editOff();
            })
        }

        $scope.removeItem = function () {
            $scope.newItem.isDeleted = true;
            dataService.update("items", $scope.newItem.id,$scope.newItem, function (data) {
                if (data) {
                    notificationsConfig.success("Item removed");
                }
                else {
                    notificationsConfig.error("error");
                    $scope.removeOff();
                }
                $scope.removeOff();
                $scope.loadItemsInfo();
            })
        }

        $scope.showNewItemRow = function (){
            $scope.newItemRow = true;
            $scope.editOff();
            $scope.removeOff();
        }

        $scope.hideNewItemRow = function () {
            $scope.newItemRow = false;
            $scope.newItem = null;
        }

        $scope.editOn = function (item) {
            $scope.removeOff();
            $scope.hideNewItemRow();
            $scope.editOnId = item.id;
            $scope.newItem = item;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.newItem = null;
            $scope.loadItemsInfo();
        }

        $scope.checkEdit = function (item) {
            return $scope.editOnId === item.id;
        }

        $scope.removeOn = function (item) {
            $scope.hideNewItemRow();
            $scope.editOff();
            $scope.removeOnId = item.id;
            $scope.newItem = item;
        }
        $scope.removeOff = function () {
            $scope.removeOnId = null;
            $scope.newItem = null;
        }
        $scope.checkRemove = function (item) {
            return $scope.removeOnId === item.id;
        }

        $scope.checkActions = function (item) {
            return $scope.checkEdit(item) || $scope.checkRemove(item);
        }


        $scope.loadItemsInfo();

    });
}());