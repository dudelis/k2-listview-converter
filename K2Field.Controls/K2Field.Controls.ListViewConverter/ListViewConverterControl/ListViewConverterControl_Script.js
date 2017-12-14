//NOTE: alert() statements are available for debugging purposes. You can uncomment the statements to show dialogs when each method is hit.
(function ($) {
    //TODO: if necessary, add additional statements to initialize each part of the namespace before your ListViewConverterControl is called. 
    if (typeof K2Field.Controls.ListViewConverter === "undefined" || K2Field.Controls.ListViewConverter == null) K2Field.Controls.ListViewConverter = {};

    K2Field.Controls.ListViewConverter.ListViewConverterControl = {

        //internal method used to get a handle on the control instance
        _getInstance: function (id) {
            //alert("_getInstance(" + id + ")");
            var control = jQuery('#' + id);
            if (control.length == 0) {
                throw 'ListViewConverterControl \'' + id + '\' not found';
            } else {
                return control[0];
            }
        },

        getValue: function (objInfo) {
            //alert("getValue() for control " + objInfo.CurrentControlId);
            var instance = K2Field.Controls.ListViewConverter.ListViewConverterControl._getInstance(objInfo.CurrentControlId);
            return instance.value;
        },

        getDefaultValue: function (objInfo) {
            //alert("getDefaultValue() for control " + objInfo.CurrentControlId);
            getValue(objInfo);
        },

        setValue: function (objInfo) {
            //alert("setValue() for control " + objInfo.CurrentControlId);
            var instance = K2Field.Controls.ListViewConverter.ListViewConverterControl._getInstance(objInfo.CurrentControlId);
            var oldValue = instance.value;
            //only change the value if it has actually changed, and then raise the OnChange event
            if (oldValue != objInfo.Value) {
                instance.value = objInfo.Value;
                raiseEvent(objInfo.CurrentControlId, 'Control', 'OnChange');
            }
        },

        //retrieve a property for the control
        getProperty: function (objInfo) {
            //alert("getProperty(" + objInfo.property + ") for control " + objInfo.CurrentControlId);
            if (objInfo.property.toLowerCase() == "value") {
                return K2Field.Controls.ListViewConverter.ListViewConverterControl.getValue(objInfo);
            }
            else {
                return $('#' + objInfo.CurrentControlId).data(objInfo.property);
            }
        },

        //set a property for the control. note case statement to call helper methods
        setProperty: function (objInfo) {
            switch (objInfo.property.toLowerCase()) {
                case "style":
                    K2Field.Controls.ListViewConverter.ListViewConverterControl.setStyles(null, objInfo.Value, $('#' + objInfo.CurrentControlId));
                    break;
                case "value":
                    K2Field.Controls.ListViewConverter.ListViewConverterControl.setValue(objInfo);
                    break;
                case "isvisible":
                    K2Field.Controls.ListViewConverter.ListViewConverterControl.setIsVisible(objInfo);
                    break;
                case "isenabled":
                    K2Field.Controls.ListViewConverter.ListViewConverterControl.setIsEnabled(objInfo);
                    break;
                default:
                    $('#' + objInfo.CurrentControlId).data(objInfo.property).value = objInfo.Value;
            }
        },

        validate: function (objInfo) {
            //alert("validate for control " + objInfo.CurrentControlId);
        },

        //helper method to set visibility
        setIsVisible: function (objInfo) {
            //alert("set_isVisible: " + objInfo.Value);
            value = (objInfo.Value === true || objInfo.Value == 'true');
            this._isVisible = value;
            var displayValue = (value === false) ? "none" : "block";
            var instance = K2Field.Controls.ListViewConverter.ListViewConverterControl._getInstance(objInfo.CurrentControlId);
            instance.style.display = displayValue;
        },

        //helper method to set control "enabled" state
        setIsEnabled: function (objInfo) {
            //alert("set_isEnabled: " + objInfo.Value);
            value = (objInfo.Value === true || objInfo.Value == 'true');
            this._isEnabled = value;
            var instance = K2Field.Controls.ListViewConverter.ListViewConverterControl._getInstance(objInfo.CurrentControlId);
            instance.readOnly = !value;
        },

        setStyles: function (wrapper, styles, target) {
            var isRuntime = (wrapper == null);
            var options = {};
            var element = isRuntime ? jQuery(target) : wrapper.find('.K2Field.Controls.ListViewConverter.ListViewConverterControl');

            jQuery.extend(options, {
                "border": element,
                "background": element,
                "margin": element,
                "padding": element,
                "font": element,
                "horizontalAlign": element
            });

            StyleHelper.setStyles(options, styles);
        }
    };
})(jQuery);

$(document).ready(function () {

    //add a delegate event handler for user-driven clicks 
    //TODO: add events for other user-driven events. 
    //(Note that custom controls created with the SDK have .SFC as the class)
    //you could also use event binding, if preferred 

    $(document).delegate('.SFC.K2Field.Controls.ListViewConverter-ListViewConverterControl-Control', 'click.Control', function (e) {
        //alert("control " + this.id + " clicked");
        raiseEvent(this.id, 'Control', 'OnClick');
    });

    $(document).delegate(".SFC.K2Field.Controls.ListViewConverter-ListViewConverterControl-Control", "change.Control", function (e) {
        //alert("control " + this.id + " changed");
        raiseEvent(this.id, 'Control', 'OnChange');
    });
});