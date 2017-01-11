System.register(["./rasterizeHTML", "./jsPDF", 'aurelia-framework'], function(exports_1, context_1) {
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
    var ExportToPdf;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            ExportToPdf = (function () {
                function ExportToPdf() {
                }
                ExportToPdf.export = function (tableData, headers, name) {
                    console.info(headers);
                    var htmlHeaders = "<tr>" + headers.map(function (cols) { return "<td style='text-align:center; font-weight: bold; min-width: 100px;'>" + cols + "</td>"; }).join("") + "</tr>";
                    var htmlString = tableData.map(function (cols) { return cols.map(function (col) { return "<td>" + col + "</td>"; }).join(""); }).map(function (row) { return "<tr style='text-align:center;'>" + row + "</tr>"; }).join("");
                    htmlString = "<html><style>body{font-family:'Times New Roman', Times, serif;font-style:normal;font-size:12px;font-variant: small-caps;text-decoration:none;}table{border-collapse:collapse;}table,th,td{border:1px solid black;}</style><body><div style='width:596px;'><table border='1'>" + htmlHeaders + htmlString + "</table></div></body></html>";
                    var iframe = document.createElement('iframe');
                    iframe.style.width = "596px";
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    iframe = iframe.contentWindow ?
                        iframe.contentWindow :
                        (iframe.contentDocument.document ?
                            iframe.contentDocument.document :
                            iframe.contentDocument);
                    iframe.document.open();
                    iframe.document.write(htmlString);
                    iframe.document.close();
                    var pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'in',
                        format: 'a4'
                    });
                    pdf.setFont('times');
                    pdf.setFontSize(14);
                    pdf.addHTML(iframe.document, { pagesplit: true, quality: 5 }, function () {
                        pdf.save(name + '.pdf');
                        document.body.removeChild(iframe);
                    });
                    //	saveAs(new Blob([file], { type: "Content-type: text/csv" }), "grid.pdf");
                };
                ExportToPdf = __decorate([
                    aurelia_framework_1.noView,
                    aurelia_framework_1.autoinject, 
                    __metadata('design:paramtypes', [])
                ], ExportToPdf);
                return ExportToPdf;
            }());
            exports_1("ExportToPdf", ExportToPdf);
        }
    }
});
