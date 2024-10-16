sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zso.controller.CustomerFormView", {
        onInit: function () {
            //Getting route object ref
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            //Linking the route with the controller method onRouteMatchedNew
            oRouter.getRoute("RouteCustomerNew").attachMatched(this._onRouteMatchedNew,this);
            oRouter.getRoute("RouteCustomerEdit").attachMatched(this._onRouteMatchedEdit,this);
        },

        onView1: function(){
            var r = sap.ui.core.UIComponent.getRouterFor(this);
            r.navTo("RouteView1");
        },

        onNavBack: function(){
            const oHistory = sap.ui.core.routing.History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var r = sap.ui.core.UIComponent.getRouterFor(this);
                r.navTo("RouteView1");
            }
        },

        _onRouteMatchedNew: function(oEvent){
            alert("Client creation mode");
        },

        _onRouteMatchedEdit: function(oEvent){
            var that        = this;
            //getting parameters
            var oArgs       = oEvent.getParameter("arguments");
            //CustomerId is the argument
            var sCustomerId = oArgs.CustomerId;
            
            alert("Client change mode "+sCustomerId);
        }
    });
}
);