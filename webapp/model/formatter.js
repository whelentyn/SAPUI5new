sap.ui.define([], function () {
    "use strict";
    return {
        statusText: function (sStatus) {
            switch (sStatus) {
                case "A":
                    return "Received"
                case "B":
                    return "Paid"
                case "C":
                    return "Waiting for Approval"
                default:
                    return sStatus;
            }
        }
    };
});