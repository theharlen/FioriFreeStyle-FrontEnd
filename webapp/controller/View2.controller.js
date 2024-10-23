sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "zso/model/models"    
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View2", {
        onInit: function () {
            var oView   = this.getView();
            var oFModel = new sap.ui.model.json.JSONModel();

            oFModel.setData({
                "OrderId": "",
                "CreatedOn": "",
                "CreatedBy": "",
                "ClientId": "",
                "NetValue": "",
                "DocCategory": "",
                "SortFields": "OrderId",
                "SortType": "ASC",
                "Limit": 5,
                "Offset": 0                
            });
            oView.setModel(oFModel,"filter");

            var oTModel = new sap.ui.model.json.JSONModel();
            oTModel.setData([]);
            oView.setModel(oTModel,"table2");

            this.onFilterSearch();
        },

        onFilterReset: function(){
        },

        onUpdateStatus: function(sDocCategory){
            var oTable = this.getView().byId("table2");
            var oModel = this.getOwnerComponent().getModel();
            var aIndex = oTable.getSelectedIndices();
            var oController = this;

            if (aIndex.length == 0) {
                MessageToast.show("Select one row");
                return;
            }

            if (aIndex.length > 1) {
                MessageToast.show("Select only one row");
                return;
            }

            var oItem = oTable.getContextByIndex(aIndex[0]);
            var oOrderId = oItem.getProperty("OrderId");

            this.getView().setBusy(true);
            oModel.callFunction( "/ZSALES_ORDER_UPDATE_STATUS",
                {
                    method: "GET",
                    urlParameters: {
                        OrderId: oOrderId,
                        DocCategory: sDocCategory
                    },
                    success: function(oData2, oResponse){
                        oController.getView().setBusy(false);
                        
                        MessageToast.show("Status successfully updated");
                        //setting data to main table
                        oController.onFilterSearch();
                    },
                    error: function(oError){
                        oController.getView().setBusy(false);
                        MessageToast.show("Error");
                    }
                });

        },        

        onFilterSearch: function(oEvent){
            //Getting view reference
            var oView   = this.getView();
            //Getting oData mode referecen v 2.0
            var oModel  = this.getOwnerComponent().getModel();
            //Getting filter data
            var oFModel = oView.getModel("filter");
            //Getting table data
            var oTModel = oView.getModel("table2");
            //Extracting filter data
            var oFData  = oFModel.getData();
            var oFilter = null;
            var aParams = [];
            var that    = this;

            // aplicando filtros
            var aSorter  = [];
            var aFilters = [];
            
            if(oFData.OrderId != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'OrderId',
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oFData.OrderId
                });
                aFilters.push(oFilter);
            }

            if(oFData.CreatedOn != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'CreatedOn',
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oFData.CreatedOn
                });
                aFilters.push(oFilter);
            }

            if(oFData.ClientId != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'ClientId',
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oFData.ClientId
                });
                aFilters.push(oFilter);
            }

            var bDescending = false;
            if(oFData.SortType == "DESC"){
                bDescending = true;
            }
            var oSort = new sap.ui.model.Sorter(oFData.SortFields,bDescending);
            aSorter.push(oSort);

            // Limit, offset
            //mounting URL parameters
            aParams.push("$top="+oFData.Limit);
            aParams.push("$skip="+oFData.Offset);

            var oUrlParams = {
                "$top": oFData.Limit,
                "$skip": oFData.Offset
            };            
          
            // executando filtro
            this.getView().setBusy(true);

            console.log("Limit:", oFData.Limit);
            console.log("Offset:", oFData.Offset);

                //passing URL parameters
                //urlParameters: aParams,            
            oModel.read("/SoHeaderSet",{
                sorters: aSorter,
                filters: aFilters,
                urlParameters: aParams,

                success: function(oData2, oResponse){
                    that.getView().setBusy(false);
                    
                    console.log(oData2.results);
                    //setting data to main table
                    oTModel.setData(oData2.results);
                },
                error: function(oError){
                    that.getView().setBusy(false);
                    MessageToast.show("Error");
                }
            });

            var oModel = this.getOwnerComponent().getModel();
            console.log("Odata model:", oModel);
            console.log("Model type:", oModel instanceof sap.ui.model.odata.v2.ODataModel);            
        }
    });
});