sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
            /*
            // model padrão da view
            var oView  = this.getView();
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({"users": {"name": "Tyrion Lanister"}});
            oView.setModel(oModel);
            */
            
            // model com o name "data"
            var oView  = this.getView();
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({"users": {"name": "Twin Lanister"}});
            oView.setModel(oModel,"data");

            var oDataModel = this.getOwnerComponent().getModel();
            oDataModel.read("/SoHeaderSet", {
                success: function(oData) {
                  var oFirstItem = oData.results[0]; // Get the first register
                  this.getView().byId("FirstOrder").setText(oFirstItem.OrderId + " - " + oFirstItem.CreatedBy);
                }.bind(this),
                error: function(oError) {
                  console.error(oError);
                }
              });            
        },

        onTestModels: function(){
            // model i18n
            var oI18n = this.getView().getModel("i18n").getResourceBundle();
            var sText = oI18n.getText("appTitle");

            console.log("Key title text 'title'");
            console.log(sText);

            console.log("------------------------------------------");

            // model de usuários
            var oModel = this.getOwnerComponent().getModel("users");
            var oData = oModel.getData();
            console.log("User's model")
            console.log(oData);

            console.log("------------------------------------------");

            // model do serviço
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/SoHeaderSet",{
                success: function(oData, oResponse){
                    console.log("Data returned from the service")
                    console.log(oData);
                    console.log(oResponse);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
        }
    });
});