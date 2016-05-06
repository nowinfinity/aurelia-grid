System.register(["./blob", "./fileSaver", "xlsx", 'aurelia-framework'], function(exports_1, context_1) {
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
    var ExportToExcel, Workbook;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            ExportToExcel = (function () {
                function ExportToExcel() {
                }
                ExportToExcel.export = function (tableData, headers) {
                    /* original data */
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = this.createSheet(tableData, headers);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { cellStyles: true, bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), "grid.xlsx");
                };
                ExportToExcel.createSheet = function (data, columns) {
                    var ws = {};
                    ws['!cols'] = [];
                    for (var C = 0; C < columns.length; ++C) {
                        ws['!cols'][C] = { wch: 30 };
                        var cell = { v: columns[C], c: null, t: 's', z: null, s: null };
                        if (cell.v == null)
                            continue;
                        cell.s = { fill: { fgColor: { rgb: '84B2E6' } } };
                        var cell_ref = XLSX.utils.encode_cell({ c: C, r: 0 });
                        ws[cell_ref] = cell;
                    }
                    for (var R = 1; R != data.length; ++R) {
                        var C = 0;
                        for (var property in data[R]) {
                            if (data[R].hasOwnProperty(property)) {
                                var cell = { v: data[R][property], c: null, t: 's', z: null, s: null };
                                if (cell.v == null)
                                    continue;
                                var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                                ws[cell_ref] = cell;
                                C = C + 1;
                            }
                        }
                    }
                    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length, c: C - 1 } });
                    return ws;
                };
                ExportToExcel.s2ab = function (s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i)
                        view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                };
                ExportToExcel = __decorate([
                    aurelia_framework_1.noView,
                    aurelia_framework_1.autoinject, 
                    __metadata('design:paramtypes', [])
                ], ExportToExcel);
                return ExportToExcel;
            }());
            exports_1("ExportToExcel", ExportToExcel);
            Workbook = (function () {
                function Workbook() {
                    this.SheetNames = [];
                    this.Sheets = {};
                }
                return Workbook;
            }());
            exports_1("Workbook", Workbook);
        }
    }
});
