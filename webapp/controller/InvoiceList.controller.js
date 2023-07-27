sap.ui.define([
    "InnovationCamp/myfirstproject/controller/BaseController", "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", 'sap/ui/model/Filter', 'sap/ui/model/FilterOperator',
    "InnovationCamp/myfirstproject/model/formatter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Fragment, Filter, FilterOperator, formatter) {
        "use strict";

        return Controller.extend("InnovationCamp.myfirstproject.controller.InvoiceList", {
            formatter: formatter,
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Invoices").attachPatternMatched(this._onObjectMatched, this);

                let oPageModel = new JSONModel()

                this.getView().setModel(oPageModel, "pageModel")
            },

            _onObjectMatched: function (oEvent) {
                console.log("route matched")

                var oList = this.getView().byId("invoiceList")

                var aItems = oList.getBinding("items")

                var oFilter = new Filter({
                    path: 'ExtendedPrice',
                    operator: FilterOperator.GT,
                    value1: 8
                })

                var oFilter2 = new Filter({
                    path: 'Status',
                    operator: FilterOperator.EQ,
                    value1: "A"
                })

                var oFilterFinal = new Filter({
                    filters: [oFilter, oFilter2],
                    and: false
                })

                aItems.filter([oFilterFinal])

            }

            
        });

    });