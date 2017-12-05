(function () {
    var taskAngular = angular.module('taskAngular');

    taskAngular.controller('invoicesController', function ($scope, dataService) {

        $scope.items;
        $scope.customers;
        $scope.invoices;

        $scope.hidden = true;
        $scope.subTotal = 0;
        $scope.total = 0;
        $scope.taxRate = 0.17;
        $scope.tax = 0;

        $scope.requestedInvoice;
        $scope.editOnId;
        $scope.removeOnId;

        $scope.statusTypes = [
            { name: "Draft", value: 0 },
            { name: "Issued", value: 1 },
            { name: "Paid", value: 2 },
            { name: "Cancelled", value: 3 }
        ]

        //
        $scope.loadInvoicesInfo = function () {
            dataService.list("invoices", function (data) {
                if (data) {
                    $scope.invoices = data;
                } else {
                    notificationsConfig.success("error");
                }
            });
        };

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

        $scope.removeInvoice = function () {
            $scope.requestedInvoice.isDeleted = true;
            dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                if (data) {
                    notificationsConfig.success("Invoice removed");
                    $scope.loadInvoicesInfo();
                }
                else notificationsConfig.error("Error");
            })
        }

        $scope.updateInvoice = function () {
            dataService.update("invoices", $scope.requestedInvoice.id, $scope.requestedInvoice, function (data) {
                if (data) {
                    notificationsConfig.success("Invoice updated");
                }
                else
                    notificationsConfig.error("Error");
                $scope.editOff();
            })
        }

        



        $scope.calculateValues = function (invoice) {
            $scope.subTotal = 0;
            $scope.total = 0;
            $scope.tax = 0;
            for (var i = 0; i < invoice.items.length; i++) {
                $scope.subTotal = $scope.subTotal + invoice.items[i].quantity * invoice.items[i].price;
            }
            $scope.tax = $scope.subTotal * $scope.taxRate;
            $scope.total = $scope.subTotal + $scope.tax;
        }

        //for view invoice modal
        $scope.invoiceTransfer = function (invoice) {
            $scope.requestedInvoice = invoice;
            $scope.calculateValues($scope.requestedInvoice);
        };

        

        $scope.editOn = function (invoice) {
            $scope.removeOff();
            $scope.editOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }


        $scope.editOff = function () {
            $scope.editOnId = null;
            $scope.requestedInvoice = null;
            $scope.loadInvoicesInfo();
        }

        $scope.checkEdit = function (invoice) {
            return $scope.editOnId === invoice.id;
        }

        $scope.removeOn = function (invoice) {
            $scope.editOnId = null;
            $scope.removeOnId = invoice.id;
            $scope.requestedInvoice = invoice;
        }
        $scope.removeOff = function () {
            $scope.removeOnId = null;
            $scope.requestedInvoice = null;
        }
        $scope.checkRemove = function (invoice) {
            return $scope.removeOnId === invoice.id;
        }

        $scope.checkActions = function (invoice) {
            return $scope.checkEdit(invoice) || $scope.checkRemove(invoice);
        }

        $scope.checkDraft = function (invoice) {
            return invoice.status === "Draft";
        }

        

        $scope.emailTransfer = function (email) {
            $scope.email = email;
        };
        $scope.email = {
            "id": 0,
            "date": "",
            "items": [],
            "status": 1,
            "customer": 0,
            "customerName": "",
            "billTo": {},
            "shipTo": {},
            "isDeleted": false,
            "mailTo": ""
        }
        $scope.email.date = new Date();
        $scope.email.date.toJSON();

        $scope.sendEmail = function () {
            dataService.create("emails", $scope.email, function (data) {
                if (data) {
                    notificationsConfig.success("Email sent");
                    $('#typeInEmailModal').modal('toggle');
                }
                else notificationsConfig.error("Sending Email failed!");
            })
        }
        $scope.printDiv = function (divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'width=1000,height=1000');
            popupWin.document.open();
            popupWin.document.write('<!DOCTYPE html><html><head><link rel="stylesheet" href="css/bootstrap.min.css"><link rel="stylesheet" href="css/bootstrapYeti.css"><link rel="stylesheet" href="css/font-awesome.min.css"><link rel="stylesheet" href="css/style.css"></head><body onload="window.print()"><div class="reward-body">' + printContents + '</div></body></html>');
            popupWin.document.close();
        }


        ////////////////////////
        // Object instantiated for validation purposes
        $scope.newInvoice;
        $scope.initializeNewInvoice = function () {
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
        }

        // Instantiating date for new invoice
        $scope.startNewInvoice = function () {
            $scope.initializeNewInvoice();
            $scope.newInvoice.date = new Date();
            $scope.newInvoice.date.toJSON();
            $scope.calculateFinal();
        }

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
        $scope.guestCustomer;
        $scope.billTo = false; // select customer button
        $scope.shipTo = false; // select customer button
        $scope.billToCustomer;
        $scope.shipToCustomer;

        //Customer ID for new invoice
        $scope.newSetCustomerID = function (customer) {
            $scope.newInvoice.customer = customer.id;
        }
        //Customer ID for existing invoice
        $scope.editSetCustomerID = function (customer) {
            $scope.requestedInvoice.customer = customer.id;
        }

        $scope.newSetBillTo = function (customer) {
            $scope.newInvoice.billTo = customer;
            $scope.billToCustomer = null;
        };

        $scope.newSetShipTo = function (customer) {
            $scope.newInvoice.shipTo = customer;
            $scope.shipToCustomer = null;
        };

        //filter quantity 0
        $scope.notZero = function (quantity) {
            return quantity !== 0;
        };



        //Add item button
        $scope.pushToItemList = function (item) {
            $scope.selectedItem = item;
            if ($scope.selectedItem === null) return;
            if ($scope.selectedItem.quantity === 0) {
                alert("Quantity of this item reached 0.");
                return;
            }
            if (!$scope.listExists)
                $scope.listExists = true;
            // if item is in list increase its quantity
            for (var i = 0; i < $scope.itemList.length; i += 1)
                if ($scope.selectedItem.description === $scope.itemList[i].description) {
                    $scope.isInList = true;
                    if ($scope.itemList[i].quantity - $scope.purchasedQuantity[i] >= 0)
                    $scope.purchasedQuantity[i] += 1;
                    }
            if (!$scope.isInList) {
                $scope.itemList.push({
                    id: null,
                    itemId: $scope.selectedItem.id,
                    description: $scope.selectedItem.description,
                    quantity: $scope.selectedItem.quantity,
                    unitPrice: $scope.selectedItem.unitPrice
                });
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

        //initialize draft to newInvoice
        $scope.editDraftInvoice = function (invoice) {
            $scope.newInvoice = invoice;
            $scope.newInvoice.date = new Date();
            $scope.newInvoice.date.toJSON();
            $scope.calculateValues($scope.newInvoice);
            for (var i = 0; i < $scope.newInvoice.items.length; i += 1) {
                for (var j = 0; j < $scope.items.length; j += 1)
                    if ($scope.newInvoice.items[i].description === $scope.items[j].description)
                    {
                        $scope.itemList.push({
                            id:             $scope.newInvoice.items[i].id,
                            description:    $scope.newInvoice.items[i].description,
                            quantity:       $scope.items[j].quantity,
                            invoiceId:      $scope.newInvoice.id,
                            itemId:         $scope.items[j].id,
                            unitPrice:          $scope.items[j].unitPrice
                        });
                        $scope.purchasedQuantity.push($scope.newInvoice.items[i].quantity);
                    }
            }
            $scope.listExists = true;
        };



        // Separate function to be used in createNewInvoice
        $scope.pushItemToNewInvoice = function (i) { // i from loop
            $scope.newInvoice.items.push({
                description: $scope.itemList[i].description,
                quantity: $scope.purchasedQuantity[i],
                invoiceId: $scope.newInvoice.id,
                itemId: $scope.itemList[i].itemId,
                price: $scope.itemList[i].unitPrice
            })
        }

        $scope.pushItemToDraftInvoice = function (i) { // i from loop
            $scope.newInvoice.items.push({
                id : $scope.itemList[i].id,
                description: $scope.itemList[i].description,
                quantity: $scope.purchasedQuantity[i],
                invoiceId: $scope.newInvoice.id,
                itemId: $scope.itemList[i].itemId,
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
                            $scope.pushItemToNewInvoice(i);
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
                            dataService.update("items", $scope.itemList[i].itemId, {
                                id: $scope.itemList[i].itemId,
                                description: $scope.itemList[i].description,
                                quantity: $scope.itemList[i].quantity,
                                unitPrice: $scope.itemList[i].unitPrice,
                                isDeleted: false
                            }, function (data) {
                                if (data) { }
                                else notificationsConfig.error("error while updating item quantity");
                            })
                        }
                        notificationsConfig.success("Invoice created!");
                    }
                    else
                        notificationsConfig.error("Error in invoice!");
                    //window.location = "#/invoices"; // If invoice is created send the user to invoices view
                    $scope.cancelNewInvoice();
                    $scope.loadInvoicesInfo();
                })
            }
            else {
                notificationsConfig.error("All fields must be filled in.");
            }
        }

        $scope.updateDraftInvoice = function () {
            $scope.newInvoice.items = [];
            //Push all items from itemList to newInvoice
            for (var i = 0; i < $scope.itemList.length; i += 1)
                $scope.pushItemToDraftInvoice(i);
            console.log($scope.newInvoice);
            dataService.update("invoices", $scope.newInvoice.id, $scope.newInvoice, function (data) {
                if (data) {
                    for (var i = 0; i < $scope.newInvoice.items.length; i += 1) {
                        console.log($scope.newInvoice.items[i].id);
                        if ($scope.newInvoice.items[i].id !== null)
                        dataService.update("invoiceitems", $scope.newInvoice.items[i].itemId, $scope.newInvoice.items[i], function (data) {
                            if (data) {
                            }
                            else
                                notificationsConfig.error("error while updating invoice items");
                        })
                        else
                            dataService.create("invoiceitems", $scope.newInvoice.items[i], function (data) {
                                if (data) {
                                }
                                else
                                    notificationsConfig.error("error while generating invoice items");
                            })
                    }
                    //Update all store quantities for corresponding items in DraftInvoice
                    for (var i = 0; i < $scope.newInvoice.items.length; i += 1) {
                        $scope.itemList[i].quantity = $scope.itemList[i].quantity - $scope.newInvoice.items[i].quantity;
                        dataService.update("items", $scope.itemList[i].itemId, {
                            id: $scope.itemList[i].itemId,
                            description: $scope.itemList[i].description,
                            quantity: $scope.itemList[i].quantity,
                            unitPrice: $scope.itemList[i].unitPrice,
                            isDeleted: false
                        }, function (data) {
                            if (data) { }
                            else notificationsConfig.error("error while updating item quantity");
                        })
                    }
                    notificationsConfig.success("Invoice updated");
                } else
                    notificationsConfig.error("Error");
                $scope.cancelEditDraftInvoice();
                $scope.loadInvoicesInfo();
            });
        }

        $scope.cancelNewInvoice = function () {
            $scope.initializeNewInvoice();
            $scope.guestCustomer = null;
            $scope.itemList = [];
            $scope.listExists = false;
            $scope.selectedItem = null;
            $scope.calculateFinal();
            $('#newInvoiceModal').modal('toggle');
            $scope.loadInvoicesInfo();
        }

        $scope.cancelEditDraftInvoice = function () {
            $scope.initializeNewInvoice();
            $scope.guestCustomer = null;
            $scope.itemList = [];
            $scope.listExists = false;
            $scope.selectedItem = null;
            $scope.calculateFinal();
            $('#editInvoiceModal').modal('toggle');
            $scope.loadInvoicesInfo();
        }

        $scope.loadInvoicesInfo();
        $scope.loadItemsInfo();
        $scope.loadCustomersInfo();
    });
}());