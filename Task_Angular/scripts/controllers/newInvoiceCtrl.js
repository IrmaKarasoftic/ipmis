(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('newInvoiceController', function ($scope, dataService) {

        // Object instantiated for validation purposes
        $scope.newInvoice = {
            "id": 0,
            "date": "",
            "items": [],
            "status": "Issued",
            "customer": null,
            "customerName": "",
            "billTo": null,
            "shipTo": null,
            "isDeleted": false
        }

        // Instantiating date for new invoice
        $scope.newInvoice.date = new Date();
        $scope.newInvoice.date.toJSON();

        // Object hard coded (unnecessary at the moment)
        $scope.from = {
            "companyName": "XYZ",
            "streetAddress": "Somewhere",
            "city": "OfSomewhere",
            "zipCode": 79209,
            "phoneNumber": "5555-555-555-555"
        }

       
        $scope.selectedItem = null; // adding new items to list

        $scope.listExists = false; // show hide table
        $scope.isInList = false; // increase quantity if in list
        $scope.itemList = []; // list of items to be in invoice
        $scope.purchasedQuantity = []; // invoice item quantity, different from quantity in store

        $scope.billTo = false; // select customer button
        $scope.shipTo = false; // select customer button

        $scope.loadItemsInfo = function () {
            dataService.list("items", function (data) {
                if (data) {
                    $scope.items = data;
                }
                else {
                    notificationsConfig.error("Error!");
                }
            })
        };

        $scope.loadCustomersInfo = function () {
            dataService.list("customers", function (data) {
                if (data) {
                    $scope.customers = data;
                }
                else {
                    notificationsConfig.error("Error!");
                }
            })
        }

        //Customer ID for new invoice
        $scope.getCustomerID = function (customer) {
            $scope.newInvoice.customer = customer.id;
        }

        // Select customer button Bill To section
        $scope.switchBillTo = function () {
            $scope.billTo = true;
            $scope.shipTo = false;
        };

        // Select customer button Ship To section
        $scope.switchShipTo = function () {
            $scope.billTo = false;
            $scope.shipTo = true;
        };

        //Selection in modal
        $scope.customerTransferBillTo = function (customer) {
            $scope.newInvoice.billTo = $.extend(true, {}, customer);
        };

        //Selection in modal
        $scope.customerTransferShipTo = function (customer) {
            $scope.newInvoice.shipTo = $.extend(true, {}, customer);
        };


        //Add item button
        $scope.pushToItemList = function () {
            if ($scope.selectedItem === null) return;
            if (!$scope.listExists)
                $scope.listExists = true;
            // if item is in list increase its quantity
            for (var i = 0; i < $scope.itemList.length; i += 1)
                if ($scope.selectedItem === $scope.itemList[i]) {
                    $scope.isInList = true;
                    $scope.purchasedQuantity[i] += 1;
                }
            if (!$scope.isInList) {
                 $scope.itemList.push($scope.selectedItem);
                 $scope.purchasedQuantity.push(1);
            }
            // Reset variables needed in this function and calculate totals
            $scope.isInList = false;
            $scope.selectedItem = null;
            $scope.calculateFinal();
        }

        //Remove item buton
        $scope.removeFromItemList = function (item) {
            for (var i = 0; i < $scope.itemList.length; i += 1)
                if (item === $scope.itemList[i]) {
                    $scope.itemList.splice(i, 1);
                    $scope.purchasedQuantity.splice(i, 1);
                }
            //When there are no items, hide table
            if ($scope.itemList.length === 0)
                $scope.listExists = false;
            $scope.calculateFinal();
        }

        //Calculate totals
        $scope.calculateFinal = function () {
            $scope.subTotal = 0;
            $scope.total = 0;
            $scope.taxRate = 0.17;
            $scope.tax = 0;
            for (var i = 0; i < $scope.itemList.length; i += 1)
                $scope.subTotal = $scope.subTotal + $scope.purchasedQuantity[i] * $scope.itemList[i].unitPrice;
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }



        // Separate function to be used in createNewInvoice
        $scope.pushItemToInvoice = function (i) { // i from loop
            $scope.newInvoice.items.push({
                description: $scope.itemList[i].description,
                quantity: $scope.purchasedQuantity[i],
                invoiceId: $scope.newInvoice.id,
                itemId: $scope.itemList[i].id,
                price: $scope.itemList[i].unitPrice
            })
        }

        $scope.createNewInvoice = function () {
            // Validation
            if ($scope.newInvoice.billTo !== null &&
                $scope.newInvoice.shipTo !== null &&
                $scope.newInvoice.customer !== null &&
                $scope.itemList.length >= 1) {
                //Generate invoice
                dataService.create("invoices", $scope.newInvoice, function (data) {
                    //get invoice ID
                    if (data) {
                        $scope.newInvoice.id = data;
                        //Push all items from itemList to newInvoice
                        for (var i = 0; i < $scope.itemList.length; i += 1)
                            $scope.pushItemToInvoice(i);
                        //Generate all items from newInvoice as invoiceItem models respectively
                        for (var i = 0; i < $scope.newInvoice.items.length; i += 1) {
                            dataService.create("invoiceitems", $scope.newInvoice.items[i], function (data) {
                                if (data) {
                                }
                                else
                                    notificationsConfig.error("error while generating invoice items");
                            })
                        }
                        //Update all store quantities for corresponding items in newInvoice
                        for (var i = 0; i < $scope.newInvoice.items.length; i += 1) {
                            $scope.itemList[i].quantity = $scope.itemList[i].quantity - $scope.newInvoice.items[i].quantity
                            dataService.update("items", $scope.itemList[i].id, $scope.itemList[i], function (data) {
                                if (data) { }
                                else notificationsConfig.error("error while updating item quantity");
                            })
                        }
                        notificationsConfig.success("Invoice created!");
                    }
                    else
                        notificationsConfig.error("Error in invoice!");
                    window.location = "#/invoices"; // If invoice is created send the user to invoices view
                })
            }
            else {
                notificationsConfig.error("All fields must be filled in.");
            }
        }

        $scope.loadItemsInfo();
        $scope.loadCustomersInfo();
    });
}());