import "./blob";
import "./fileSaver";
import "xlsx"
import {autoinject, noView} from 'aurelia-framework';

@noView
@autoinject
export class ExportToExcel {

	static export(tableData, headers: Array<String>) {
		/* original data */
		var ws_name = "SheetJS";
		var wb = new Workbook(), ws = this.createSheet(tableData, headers);

		/* add worksheet to workbook */
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
		var wbout = XLSX.write(wb, { cellStyles: true, bookType: 'xlsx', bookSST: true, type: 'binary' });
		saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), "grid.xlsx");
	}
	
	static createSheet(data, columns) {
		var ws = {};
		ws['!cols'] = [];
		for (var C = 0; C < columns.length; ++C) {
			ws['!cols'][C] =  { wch : 30 };
			
			var cell = { v: columns[C], c: null, t: 's', z: null, s: null };
			if (cell.v == null) continue;
			cell.s = { fill: { fgColor: { rgb: '84B2E6' } } };
			
			var cell_ref = XLSX.utils.encode_cell({ c: C, r: 0 });
			ws[cell_ref] = cell;
			
		}

		for (var R = 1; R != data.length; ++R) {
			var C = 0;
			for (var property in data[R]) {
				if (data[R].hasOwnProperty(property)) {
					var cell = { v: data[R][property], c: null, t: 's', z: null, s: null };
					if (cell.v == null) continue;
					var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
					ws[cell_ref] = cell;
					C = C + 1;
				}
			}
		}
		ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length, c: C - 1 } });
		return ws;
	}

	static s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
}

export class Workbook {
	SheetNames: any = [];
	Sheets: any = {};
}