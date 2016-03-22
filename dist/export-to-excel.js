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
                function ExportToExcel(viewCompiler, viewSlot, container, resources, columns) {
                    this.viewCompiler = viewCompiler;
                    this.viewSlot = viewSlot;
                    this.container = container;
                    this.resources = resources;
                    this.columns = columns;
                }
                ExportToExcel.prototype.export = function (data) {
                    var _this = this;
                    var test = data.map(function (d) {
                        return _this.columns.map(function (c) {
                            var view = _this.viewCompiler.compile("<template>" + c.template.replace('${ $', '${').replace('${$', '${') + "</template>", _this.resources).create(_this.container);
                            view.bind({ item: d });
                            return view.fragment.childNodes[1].textContent;
                        });
                    });
                    /* original data */
                    var ws_name = "SheetJS";
                    var wb = new Workbook(), ws = this.sheet_from_array_of_arrays(test);
                    /* add worksheet to workbook */
                    wb.SheetNames.push(ws_name);
                    wb.Sheets[ws_name] = ws;
                    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
                    saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), "test.xlsx");
                };
                ExportToExcel.prototype.datenum = function (v, date1904) {
                    if (date1904)
                        v += 1462;
                    var epoch = Date.parse(v);
                    return (epoch - new Date(Date.UTC(1899, 11, 30)).valueOf()) / (24 * 60 * 60 * 1000);
                };
                ExportToExcel.prototype.sheet_from_array_of_arrays = function (data) {
                    var ws = {};
                    var C = 0;
                    for (var R = 0; R != data.length; ++R) {
                        C = 0;
                        for (var property in data[R]) {
                            if (data[R].hasOwnProperty(property)) {
                                var cell = { v: data[R][property], c: null, t: null, z: null };
                                if (cell.v == null)
                                    continue;
                                var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
                                if (typeof cell.v === 'number')
                                    cell.t = 'n';
                                else if (typeof cell.v === 'boolean')
                                    cell.t = 'b';
                                else if (cell.v instanceof Date) {
                                    cell.t = 'n';
                                    cell.z = XLSX.SSF._table[14];
                                    cell.v = this.datenum(cell.v, false);
                                }
                                else
                                    cell.t = 's';
                                ws[cell_ref] = cell;
                                C = C + 1;
                            }
                        }
                    }
                    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length, c: C - 1 } });
                    return ws;
                };
                ExportToExcel.prototype.s2ab = function (s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i)
                        view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                };
                ExportToExcel = __decorate([
                    aurelia_framework_1.noView,
                    aurelia_framework_1.autoinject, 
                    __metadata('design:paramtypes', [aurelia_framework_1.ViewCompiler, aurelia_framework_1.ViewSlot, aurelia_framework_1.Container, aurelia_framework_1.ViewResources, Array])
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
