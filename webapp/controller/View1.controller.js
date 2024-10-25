sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onNormalRequest() {
            this.executeRequests(false);
        },

        onBatchRequest() {
            this.executeRequests(true);
        },

        executeRequests(bUseBatch) {
            var oModel = this.getOwnerComponent().getModel();

            //Setting server call (normal or batch)
            oModel.setUseBatch(bUseBatch);
            
            console.log("Executing requests");
            console.log("-------------------------------------------");

            // requisição 1
            oModel.read("/SoHeaderSet('1')",{
                success: function(oData2, oResponse){
                    console.log("Reading key 1: OK");
                },
                error: function(oError){
                    console.log("Reading key 1: Erro");
                    console.log(oError);
                }
            });

            // requisição 2
            oModel.read("/SoHeaderSet('2')",{
                success: function(oData2, oResponse){
                    console.log("Reading key 2: OK");
                },
                error: function(oError){
                    console.log("Reading key 2: Erro");
                }
            });

            // requisição 3
            oModel.remove("/SoHeaderSet('3')",{
                success: function(oData2, oResponse){
                    console.log("Exclusão chave 3: OK");
                },
                error: function(oError){
                    console.log("Exclusão chave 3: Erro");
                }
            });
        }
    });
});