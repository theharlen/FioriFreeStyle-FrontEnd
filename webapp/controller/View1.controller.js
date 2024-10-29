sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onShowTotalValue: function(){
            //debugger;
            var that     = this;
            var sOrderId = this.getView().byId("OrderId").getValue();
            var oModel   = this.getOwnerComponent().getModel();
            
            oModel.read("/SoHeaderSet('"+sOrderId+"')",{
                success: function(oData2, oResponse){
                    var sMensagem = that.mountMessage(oData2);
                    alert(sMensagem);
                },
                error: function(oError){
                }
            });
        },

        mountMessage: function(oOrder){
            var sMensagem = "";

            sMensagem += "The total value: ";
            sMensagem += oOrder.NetValue;
            
            return sMensagem;
        }
    });
});