sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zso.controller.View1", {

        onInit: function () {

        },

        onHeader: function(){
            alert("onHeader");
        }
    });
});