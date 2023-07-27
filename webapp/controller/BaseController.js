sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(Controller) {
      "use strict";
  
      return Controller.extend("InnovationCamp.myfirstproject.controller.BaseController", {
        getRouter: function(){
            return this.getOwnerComponent().getRouter();
        },
        navigateTo: function(str){
            this.getRouter().navTo(str);
        }
      });
    }
  );
  