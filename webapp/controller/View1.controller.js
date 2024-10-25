sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onTestCallback() {
            console.log("[Process 1] Start");
            this.onGetOrder(1,function(oData,oResponse){
                console.log("[Process 2] call finished");
                console.log(oData);
                console.log(oResponse);
            });
            console.log("[Process 1] End");
        },

        onGetOrder: function(iId,callback){
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);

            oModel.read("/SoHeaderSet('"+iId+"')",{
                success: function(oData2, oResponse){
                    callback(oData2,oResponse);
                },
                error: function(oError){
                }
            });
        },

        onTestPromise1() {
            console.log("[Process 1] Start");
            var oPromise1 = this.onGetOrder2(1);
            oPromise1.then(function(oData,oResponse){
                console.log("[Process 2] Finished");
                console.log(oData);
                console.log(oResponse);
            });
            console.log("[Process 1] End");
        },

        onTestPromise2() {
            console.log("[Process 1] Start");

            var oPromise1 = this.onGetOrder2(1);
            oPromise1.then(function(oData,oResponse){
                console.log("[Process 2] Finished");
                //console.log(oData);
                //console.log(oResponse);
            });

            var oPromise2 = this.onGetOrder2(2);
            oPromise2.then(function(oData,oResponse){
                console.log("[Process 3] Finished");
                //console.log(oData);
                //console.log(oResponse);
            });
            
            Promise.all([oPromise1,oPromise2]).then(function(aRetorno){
                console.log("[Process 4] Promise.all Finished");
                console.log(aRetorno);
            });

            console.log("[Process 1] End");
        },

        onGetOrder2: function(iId){
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);

            return new Promise(function(resolve,reject){
                oModel.read("/SoHeaderSet('"+iId+"')",{
                    success: function(oData2, oResponse){
                        resolve({oData: oData2, oResponse: oResponse});
                    },
                    error: function(oError){
                        reject({oError:oError});
                    }
                });
            });
        }
    });
});