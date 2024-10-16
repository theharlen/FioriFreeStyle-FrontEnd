sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onNewCustomer: function(){
            var r = sap.ui.core.UIComponent.getRouterFor(this);
            r.navTo("RouteCustomerNew");
        },

        onEditCustomer1: function(){
            var r = sap.ui.core.UIComponent.getRouterFor(this);
            r.navTo("RouteCustomerEdit",{CustomerId:1});
        }
    });
});