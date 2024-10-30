sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,UIComponent) {
        "use strict";

        return Controller.extend("zso.controller.BaseController", {
            onProcess: function(){
                // implementation...
                alert("Successfully processed (BaseController)");
            }
        });
    });