System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GridColumn;
    return {
        setters:[],
        execute: function() {
            GridColumn = (function () {
                function GridColumn(config, template) {
                    //indicates if we are going to export this column to excel file
                    this.export = true;
                    this.specialColumns = ["heading", "nosort"];
                    this.showColNameIf = "";
                    this.hideColNameIf = "";
                    this.class = "";
                    this.template = template;
                    this.field = config.field;
                    if (!this.field)
                        throw new Error("field is required");
                    this.heading = config.heading || config.field;
                    this.nosort = config.nosort || false;
                    this.filterValue = "";
                    this.showFilter = config["show-filter"] === "false" ? false : true;
                    this.hiddenCol = config["hidden-col"] === "true" ? true : false;
                    this.showColNameIf = config["show-col-name-if"];
                    this.hideColNameIf = config["hide-col-name-if"];
                    this.class = config.class;
                    // Set attributes
                    for (var prop in config) {
                        if (config.hasOwnProperty(prop) && this.specialColumns.indexOf(prop) < 0) {
                            this[prop] = config[prop];
                        }
                    }
                }
                return GridColumn;
            }());
            exports_1("GridColumn", GridColumn);
        }
    }
});
