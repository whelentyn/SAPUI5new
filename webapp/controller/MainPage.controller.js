sap.ui.define([
    "InnovationCamp/myfirstproject/controller/BaseController", "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("InnovationCamp.myfirstproject.controller.MainPage", {
            onInit: function () {
                // set data model on view
                var oData = {
                recipient : {
                name : "World"
                        }
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteMainPage").attachPatternMatched(this._onObjectMatched, this);

                let oPageModel = new JSONModel()

                this.getView().setModel(oPageModel, "pageModel")
            },

            onShowHello: function(){
                //alert("hello world :####");
                // read msg from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                // show message
               MessageToast.show(sMsg);
            },

            onPressBtn: function(oEvent){
                var btnExpanded = this.getView().getModel().getProperty("/expanded");
                this.getView().getModel().setProperty("/expanded", !btnExpanded);
                this.getView().byId("idPanel").setExpanded(!btnExpanded);
            },

            onOpenDialog : function () {

                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "InnovationCamp.myfirstproject.view.fragments.HelloDialog"
                    });
                } 
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                })
            },
            
		    onCloseDialog : function () {
			    // note: We don't need to chain to the pDialog promise, since this event-handler
			    // is only called from within the loaded dialog itself.
			    this.byId("helloDialog").close();
		    }, 
            onOpenInvoices : function (oEvent) {
			    this.navigateTo("Invoices");
		    },
            _onObjectMatched : async function () {
                this.getView().getModel("catalogModel").read("/AirlineSet('AC')", {
                    success: function (oData) {
                        this.getView().getModel("pageModel").setProperty("/Airline", [oData])
                        this.getView().getModel("pageModel").refresh()
                    }.bind(this),
                    error: function (oError) { }
                });

            }
        });

    });
