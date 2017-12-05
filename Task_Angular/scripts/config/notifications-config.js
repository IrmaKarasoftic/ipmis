var notificationsConfig = new function () {

    toastr.options.positionClass = "toast-bottom-right";

    this.showInfo = function (message, timeOut) {
        if (timeOut) {
            toastr.options.timeOut = timeOut;
        }
        else {
            toastr.options.timeOut = 21000;
        }
        toastr.info(message);
    };

    this.showInfoSticky = function (message) {
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.info(message);
    };

    this.success = function (message, timeOut) {
        if (timeOut) {
            toastr.options.timeOut = timeOut;
        }
        else {
            toastr.options.timeOut = 5000;
        }
        toastr.success(message);
    };

    this.error = function (message, timeOut) {
        if (timeOut) {
            toastr.options.timeOut = timeOut;
        }
        else {
            toastr.options.timeOut = 20000;
        }
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error(message);
    };

    this.clear = function (message) {
        toastr.clear();
    };

    this.clearShowInfo = function (message) {
        var elementTmp = "div.toast-info:contains('" + message + "')";
        var element = $(elementTmp);

        if (element.length > 0) {
            toastr.clear(element);
        }
    };

};