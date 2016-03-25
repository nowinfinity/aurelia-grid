System.register(["eligrey/blob.js", "eligrey/FileSaver.js", "xlsx", 'aurelia-framework'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1;
    var ExportToCsv;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            ExportToCsv = (function () {
                function ExportToCsv() {
                }
                ExportToCsv.export = function (tableData, headers) {
                    var file = headers.join(',') + "\n" +
                        tableData.map(function (cols) { return cols.join(","); }).join("\n");
                    saveAs(new Blob([file], { type: "Content-type: text/csv" }), "grid.csv");
                };
                ExportToCsv = __decorate([
                    aurelia_framework_1.noView,
                    aurelia_framework_1.autoinject, 
                    __metadata('design:paramtypes', [])
                ], ExportToCsv);
                return ExportToCsv;
            }());
            exports_1("ExportToCsv", ExportToCsv);
        }
    }
});
