sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onCreateSOHeader: function(){
            var oData = {
                ClientId: "1",
                CreatedOn: '20241016',
                CreatedTime: '094100',
                CreatedBy: 'Harlen',
                NetValue: "110.55",
                DocCategory: 'N'
            };
            this.create(oData);
        },

        onCreateDeepSOHeader: function(){
            var oData = {
                ClientId: "1",
                CreatedOn: '20241016',
                CreatedTime: '094100',
                CreatedBy: 'Harlen',
                NetValue: "110.10",
                DocCategory: 'N'
          , 
                toSoItems: [
                    {
                      "OrdemItem": "10",
                      "Material": "100",
                      "MaterialDesc": "Mouse",
                      "Quantity": "1",
                      "NetWeight": "1.00",
                      "NetPrice": "1.00"
                    },
                    {
                        "OrdemItem": "20",
                        "Material": "200",
                        "MaterialDesc": "Keyboard",
                        "Quantity": "2",
                        "NetWeight": "10.00",
                        "NetPrice": "20.00"
                      }
                ]
                
            };
            this.create(oData);
        },

        create: function(oData){
            var controllerRef   = this;
            var oModel = this.getOwnerComponent().getModel();        

            //Blocking view for viewing purpose
            this.getView().setBusy(true);
            oModel.create("/SoHeaderSet",oData,{
                
                success: function(oData2, oResponse){
                    controllerRef.getView().setBusy(false);
                    
                    console.log(oData2);
                    console.log(oResponse);
                    
                    
                    if(oResponse.statusCode == 201){
                        //store the SO ID in oData2
                        
                        controllerRef.getView().byId("lastOrderId").setValue(oData2.OrderId);
                        //Putting the SO ID json data into textArea1
                        
                        controllerRef.getView().byId("textArea1").setValue(JSON.stringify(oData2));

                        MessageToast.show("Successfully created");
                        
                    }else{
                        MessageToast.show("Creation error");    
                    }
                },
                error: function(oError){
                    controllerRef.getView().setBusy(false);
                    
                    console.log(oError);
                    var oObj = JSON.parse(oError.responseText);
                    MessageToast.show(oObj.error.message.value);
                }}
            );
        },

        onReadSOHeader: function(){
            var iOrdemId = this.getView().byId("lastOrderId").getValue();
            if(iOrdemId == 0){
                MessageToast.show("Create SO header first");
                return;
            }

            this.read(iOrdemId);
        },

        onReadEntitySet: function(){
            var iOrdemId = this.getView().byId("lastOrderId").getValue();
            if(iOrdemId == 0){
                MessageToast.show("No Sales Order ID informed");
                return;
            }

            this.read(iOrdemId);
        },        
        
        read: function(iOrdemId){
   
            var controllerRef   = this;
            var oModel = this.getOwnerComponent().getModel();

            this.getView().setBusy(true);
            //single quotes is mandatory for request
            oModel.read("/SoHeaderSet('"+iOrdemId+"')",{
                success: function(oData2, oResponse){
                    controllerRef.getView().setBusy(false);

                    controllerRef.getView().byId("textArea1").setValue(JSON.stringify(oData2));

                    console.log(oData2);
                    console.log(oResponse);
                    MessageToast.show("Read success");
                },
                error: function(oError){
                    controllerRef.getView().setBusy(false);

                    console.log(oError);
                    var oObj = JSON.parse(oError.responseText);
                    MessageToast.show(oObj.error.message.value);
                }
            });
        },

        onUpdateSOHeader: function(){
            var iOrdemId = this.getView().byId("lastOrderId").getValue();
            if(iOrdemId == 0){
                MessageToast.show("Create a Sales Order Header first");
                return;
            }

            var oData = {
                ClientId: "2",
                CreatedOn: '20241016',
                CreatedBy: 'Harlen',
                NetValue: '120.00',
                DocCategory: 'C'
            };
            this.update(iOrdemId,oData);
        },
        
        update: function(iOrdemId,oData){
            var controllerRef   = this;
            var oModel = this.getOwnerComponent().getModel();

            this.getView().setBusy(true);
            oModel.update("/SoHeaderSet('"+iOrdemId+"')",oData,{
                success: function(oData2, oResponse){
                    controllerRef.getView().setBusy(false);
                    console.log(oData2);
                    console.log(oResponse);
                    if(oResponse.statusCode == 204){
                        MessageToast.show("Successfully updated");
                    }else{
                        MessageToast.show("Update error");
                    }
                },
                error: function(oError){
                    controllerRef.getView().setBusy(false);

                    console.log(oError);
                    var oObj = JSON.parse(oError.responseText);
                    MessageToast.show(oObj.error.message.value);
                }}
            );
        },

        onDeleteSOHeader: function(){
            var iOrdemId = this.getView().byId("lastOrderId").getValue();
            this.delete(iOrdemId);
        },
        
        delete: function(iOrdemId){
            var controllerRef   = this;
            var oModel = this.getOwnerComponent().getModel();

            this.getView().setBusy(true);
            oModel.remove("/SoHeaderSet('"+iOrdemId+"')",{
                success: function(oData2, oResponse){
                    controllerRef.getView().setBusy(false);

                    console.log(oData2);
                    console.log(oResponse);
                    if(oResponse.statusCode == 204){
                        MessageToast.show("Successfully deleted");
                    }else{
                        MessageToast.show("Delete error");
                    }
                },
                error: function(oError){
                    controllerRef.getView().setBusy(false);
                    console.log(oError);

                    var oObj = JSON.parse(oError.responseText);
                    MessageToast.show(oObj.error.message.value);
                }}
            );
        }
    });
});