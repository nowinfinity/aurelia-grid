System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GridColumnsExpander;
    return {
        setters:[],
        execute: function() {
            GridColumnsExpander = (function () {
                function GridColumnsExpander(config, template) {
                    this.template = template;
                    this.viewModel = config.template;
                    this.model = config.model;
                }
                return GridColumnsExpander;
            }());
            exports_1("GridColumnsExpander", GridColumnsExpander);
        }
    }
});
