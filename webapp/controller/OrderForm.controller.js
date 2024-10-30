sap.ui.define([
    //inherits methods from the BaseController that inherites methods from the framework core
    "zso/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
function (Controller,History,UIComponent) {
    "use strict";

    return Controller.extend("zso.controller.View1", {
        onInit: function () {
        },

        onPageBack: function(){
            var oHistory      = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                UIComponent.getRouterFor(this).navTo("RouteView1");
            }
        }
    });
});