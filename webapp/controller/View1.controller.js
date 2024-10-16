sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
            var oView   = this.getView();
            var oFModel = new sap.ui.model.json.JSONModel();

            //Starting Json model
            oFModel.setData({
                "OrderId": "",
                "CreatedOn": "",
                "CreatedBy": "",
                "ClientId": "",
                "NetValue": "",
                "DocCategory": "",
                "SortFields": "OrderId",
                "SortType": "ASC"
            });
            oView.setModel(oFModel,"filter");

            this.onFilterSearch();
        },

        onFilterReset: function(){

        },

        onFilterSearch: function(oEvent){
            var oView   = this.getView();
            var oTable  = oView.byId("soHeaderTable");
            //retrieving the filter set previously on method onInit
            var oFModel = oView.getModel("filter");
            var oFData  = oFModel.getData();
            var oFilter = null;
            var aParams = [];

            // aplicando filtros
            var aSorter  = [];
            var aFilters = [];
            
            if(oFData.OrderId != ''){
                oFilter = new sap.ui.model.Filter({
                    path: 'OrderId',
                    //class for Filter
                    operator: sap.ui.model.FilterOperator.EQ,
                    //filter field "OrderId"
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
            //Order class
            var oSort = new sap.ui.model.Sorter(oFData.SortFields,bDescending);
            aSorter.push(oSort);

            // executing filter (it receives a json)
            oTable.bindRows({
                path: '/SoHeaderSet',
                sorter: aSorter,
                filters: aFilters
            });
        }
    });
});