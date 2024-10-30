sap.ui.define([
     //inherits methods from the BaseController that inherites methods from the framework core
    "zso/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,UIComponent) {
        "use strict";

        return Controller.extend("zso.controller.View1", {

            onInit: function(){
            },

            onForm: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteOrdemForm");
            }
        });
    });