sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onOpenDialogInfo() {
            var oController  = this;
            //saving view fragment name
            var sName = "zso.view.DialogInfo";
            
            if(!this.oDialog){
                /*
                this.loadFragment({
                    //view fragment
                    name: sName
                }).then(function(oDialog2) {
                    oController.oDialog = oDialog2;
                    oController.oDialog.open();
                }.bind(this));
                */

                this.oDialog = this.byId("DialogInfo");
                oController.oDialog.open();
            }else{
                this.oDialog.open();
            }
        },
        
        onCloseDialogInfo: function(){
            //this.byId("DialogInfo").close();
            this.oDialog.close();
        }
    });
});