/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zso/model/models",
        "sap/ui/model/odata/v2/ODataModel"
    ],
    function (UIComponent, Device, models, ODataModel) {
        "use strict";

        return UIComponent.extend("zso.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // Create and set the OData model with useBatch disabled
                var oModel = new ODataModel("/sap/opu/odata/sap/ZHMPV_SALES_ORDERS_SRV", {
                   // useBatch: false
                });
                this.setModel(oModel);                
            }
        });
    }
);